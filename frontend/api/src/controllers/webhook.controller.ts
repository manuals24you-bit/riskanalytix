// @ts-nocheck
// backend/src/controllers/webhook.controller.ts
import { Request, Response } from 'express'
import crypto from 'crypto'
import { prisma } from '../utils/prisma'

function verifySignature(payload: string, signature: string, secret: string): boolean {
  const hmac = crypto.createHmac('sha256', secret)
  const digest = hmac.update(payload).digest('hex')
  return crypto.timingSafeEqual(Buffer.from(digest), Buffer.from(signature))
}

export const handleLemonSqueezyWebhook = async (req: Request, res: Response) => {
  try {
    const secret = process.env.LEMONSQUEEZY_WEBHOOK_SECRET
    if (!secret) {
      console.error('LEMONSQUEEZY_WEBHOOK_SECRET not set')
      return res.status(500).json({ error: 'Server misconfigured' })
    }

    // Weryfikacja podpisu
    const signature = req.headers['x-signature'] as string
    if (!signature) {
      return res.status(401).json({ error: 'Missing signature' })
    }

    const rawBody = JSON.stringify(req.body)
    const isValid = verifySignature(rawBody, signature, secret)
    if (!isValid) {
      console.error('Invalid webhook signature')
      return res.status(401).json({ error: 'Invalid signature' })
    }

    const event = req.headers['x-event-name'] as string
    const data = req.body?.data
    const attributes = data?.attributes

    console.log(`LS Webhook: ${event}`, { id: data?.id })

    // Pobierz email użytkownika z webhooka
    const userEmail = attributes?.user_email
    if (!userEmail) {
      console.error('No user email in webhook payload')
      return res.status(200).json({ received: true })
    }

    // Znajdź użytkownika po emailu
    const user = await prisma.user.findUnique({ where: { email: userEmail } })
    if (!user) {
      console.error(`User not found for email: ${userEmail}`)
      return res.status(200).json({ received: true })
    }

    // Ustal plan na podstawie variant_name lub product_name
    const variantName = (attributes?.variant_name || attributes?.product_name || '').toLowerCase()
    const plan = variantName.includes('pro') ? 'PRO' : 'BASIC'

    const status = attributes?.status // 'active', 'cancelled', 'expired', 'paused'
    const expiresAt = attributes?.ends_at
      ? new Date(attributes.ends_at)
      : attributes?.renews_at
        ? new Date(attributes.renews_at)
        : new Date(Date.now() + 31 * 24 * 60 * 60 * 1000) // +31 dni fallback

    const lsSubscriptionId = data?.id ? String(data.id) : null

    if (event === 'subscription_created' || event === 'subscription_updated') {
      // Dezaktywuj poprzednie subskrypcje
      await prisma.subscription.updateMany({
        where: { userId: user.id, status: 'active' },
        data: { status: 'cancelled' },
      })

      // Utwórz nową subskrypcję
      await prisma.subscription.create({
        data: {
          userId: user.id,
          stripeSubscriptionId: lsSubscriptionId,
          plan,
          status: status === 'active' ? 'active' : 'inactive',
          startsAt: new Date(),
          expiresAt,
        },
      })

      console.log(`✅ Subscription ${event}: user=${userEmail}, plan=${plan}, status=${status}`)
    }

    if (event === 'subscription_cancelled' || event === 'subscription_expired') {
      await prisma.subscription.updateMany({
        where: {
          userId: user.id,
          ...(lsSubscriptionId ? { stripeSubscriptionId: lsSubscriptionId } : {}),
        },
        data: { status: 'cancelled' },
      })

      console.log(`❌ Subscription ${event}: user=${userEmail}`)
    }

    res.status(200).json({ received: true })
  } catch (error: any) {
    console.error('Webhook error:', error?.message)
    res.status(500).json({ error: 'Webhook processing failed' })
  }
}