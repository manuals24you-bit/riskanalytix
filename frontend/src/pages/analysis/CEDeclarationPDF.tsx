// @ts-nocheck
// frontend/src/pages/analysis/CEDeclarationPDF.tsx
import { Document, Page, Text, View, StyleSheet, Image, Font } from '@react-pdf/renderer'
import { registerFonts } from './registerFonts'
import { getPdfT } from '../../i18n/pdfTranslations'

registerFonts()

const S = StyleSheet.create({
  page: {
    fontFamily: 'NotoSans', fontSize: 8, color: '#1F2937',
    backgroundColor: '#FFFFFF',
    paddingTop: 28, paddingBottom: 36, paddingLeft: 36, paddingRight: 36,
  },
  dividerBlue: { height: 2, backgroundColor: '#1D4ED8', marginBottom: 3 },
  dividerThin: { height: 1, backgroundColor: '#E5E7EB', marginBottom: 10 },
  docTitleBox: {
    backgroundColor: '#EFF6FF', borderRadius: 3, padding: 7,
    marginBottom: 9, alignItems: 'center',
    borderTopWidth: 1, borderBottomWidth: 1, borderLeftWidth: 1, borderRightWidth: 1,
    borderTopColor: '#BFDBFE', borderBottomColor: '#BFDBFE',
    borderLeftColor: '#BFDBFE', borderRightColor: '#BFDBFE',
  },
  docTitleMain: { fontSize: 12, fontWeight: 'bold', color: '#1E3A8A', marginBottom: 2 },
  docTitleSub:  { fontSize: 7.5, color: '#3B82F6' },
  docTitleDE:   { fontSize: 7.5, color: '#6B7280', marginTop: 1 },
  sectionBox: {
    marginBottom: 7, padding: 7, borderRadius: 3,
    borderTopWidth: 1, borderBottomWidth: 1, borderLeftWidth: 1, borderRightWidth: 1,
    borderTopColor: '#E5E7EB', borderBottomColor: '#E5E7EB',
    borderLeftColor: '#E5E7EB', borderRightColor: '#E5E7EB',
  },
  sectionTitle: {
    fontSize: 7, fontWeight: 'bold', color: '#1D4ED8',
    textTransform: 'uppercase', letterSpacing: 0.8,
    marginBottom: 5, paddingBottom: 3,
    borderBottomWidth: 1, borderBottomColor: '#BFDBFE',
  },
  row: { flexDirection: 'row', marginBottom: 3 },
  label: { width: 110, fontSize: 7.5, color: '#6B7280' },
  value: { flex: 1, fontSize: 7.5, color: '#111827', fontWeight: 'bold' },
  valueNormal: { flex: 1, fontSize: 7.5, color: '#111827' },
  twoCol: { flexDirection: 'row', gap: 8 },
  col: { flex: 1 },
  directiveRow: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 3 },
  bullet: { width: 10, fontSize: 7.5, color: '#1D4ED8', fontWeight: 'bold' },
  directiveText: { flex: 1, fontSize: 7.5, color: '#111827' },
  normBadge: {
    backgroundColor: '#EFF6FF', borderRadius: 2,
    paddingLeft: 4, paddingRight: 4, paddingTop: 1, paddingBottom: 1,
    marginRight: 4, marginBottom: 2,
    borderTopWidth: 1, borderBottomWidth: 1, borderLeftWidth: 1, borderRightWidth: 1,
    borderTopColor: '#BFDBFE', borderBottomColor: '#BFDBFE',
    borderLeftColor: '#BFDBFE', borderRightColor: '#BFDBFE',
  },
  normBadgeText: { fontSize: 7, fontWeight: 'bold', color: '#1D4ED8' },
  disclaimerBox: {
    backgroundColor: '#FFFBEB', borderRadius: 3, padding: 6, marginBottom: 10,
    borderTopWidth: 1, borderBottomWidth: 1, borderLeftWidth: 1, borderRightWidth: 1,
    borderTopColor: '#FDE68A', borderBottomColor: '#FDE68A', borderLeftColor: '#FDE68A', borderRightColor: '#FDE68A',
  },
  disclaimerText: { fontSize: 7, color: '#92400E', lineHeight: 1.5 },
  footerCE: { position: 'absolute', bottom: 14, left: 36, right: 36, borderTopWidth: 1, borderTopColor: '#E5E7EB', paddingTop: 4 },
  footerCEText: { fontSize: 6, color: '#9CA3AF', textAlign: 'center' },
    declarationBox: {
    backgroundColor: '#F0FDF4', borderRadius: 3, padding: 8, marginBottom: 8,
    borderTopWidth: 1, borderBottomWidth: 1, borderLeftWidth: 1, borderRightWidth: 1,
    borderTopColor: '#BBF7D0', borderBottomColor: '#BBF7D0',
    borderLeftColor: '#BBF7D0', borderRightColor: '#BBF7D0',
  },
  declarationText: { fontSize: 7.5, color: '#14532D', lineHeight: 1.6, textAlign: 'justify' },
  signatureSection: { flexDirection: 'row', gap: 10, marginTop: 6 },
  signatureBox: { flex: 1 },
  signatureLine: { borderBottomWidth: 1, borderBottomColor: '#374151', marginBottom: 3, height: 28 },
  signatureLabel: { fontSize: 6.5, color: '#6B7280', textAlign: 'center' },
  noticeBox: {
    backgroundColor: '#FFFBEB', borderRadius: 3, padding: 5, marginTop: 6,
    borderTopWidth: 1, borderBottomWidth: 1, borderLeftWidth: 1, borderRightWidth: 1,
    borderTopColor: '#FDE68A', borderBottomColor: '#FDE68A',
    borderLeftColor: '#FDE68A', borderRightColor: '#FDE68A',
  },
  noticeText: { fontSize: 6.5, color: '#92400E', lineHeight: 1.5 },
  footer: {
    position: 'absolute', bottom: 16, left: 36, right: 36,
    borderTopWidth: 1, borderTopColor: '#E5E7EB',
    paddingTop: 4, flexDirection: 'row', justifyContent: 'space-between',
  },
  footerText: { fontSize: 6, color: '#9CA3AF' },
  logo: { width: 60, height: 20 },
})

interface Props {
  analysis: {
    id?: string
    machineName: string
    machineCategory: string
    serialNo?: string
    manufacturer?: string
    productionYear?: number
    norm?: string
    analystName?: string
    analysisDate?: string
    clientName?: string
    clientCompany?: string
    clientNip?: string
    clientAddress?: string
    language?: string
  }
  user?: {
    name?: string; companyName?: string; nip?: string
    street?: string; city?: string; postalCode?: string; country?: string; logoUrl?: string
  }
  settings?: Record<string, string>
}

export default function CEDeclarationPDF({ analysis, user, settings = {} }: Props) {
  const lang = analysis.language || 'pl'
  const t = getPdfT(lang)

  const locale = lang === 'pl' ? 'pl-PL' : lang === 'de' ? 'de-DE' : lang === 'fr' ? 'fr-FR' :
    lang === 'it' ? 'it-IT' : lang === 'es' ? 'es-ES' : lang === 'cs' ? 'cs-CZ' : 'en-GB'

  const today = new Date().toLocaleDateString(locale)
  const analysisDate = analysis.analysisDate
    ? new Date(analysis.analysisDate).toLocaleDateString(locale)
    : today

  const manufacturerName    = analysis.clientCompany || user?.companyName || settings.company_name || '___________________________'
  const manufacturerAddress = analysis.clientAddress || (user?.street && user?.city
    ? `${user.street}, ${user.postalCode} ${user.city}, ${user.country || ''}`
    : '___________________________')
  const manufacturerNip     = analysis.clientNip || user?.nip || '___________________________'
  const companyLogo         = user?.logoUrl || settings.company_logo || ''

  const docId = analysis.id
    ? `DZ-CE/${analysis.id.slice(0, 8).toUpperCase()}/${new Date().getFullYear()}`
    : `DZ-CE/XXXX/${new Date().getFullYear()}`

  const norms = analysis.norm
    ? analysis.norm.split(',').map((n: string) => n.trim()).filter(Boolean)
    : ['EN ISO 12100:2012']
  if (!norms.some(n => n.includes('12100'))) norms.push('EN ISO 12100:2012')

  // Nazwa kategorii z tłumaczeń
  const machineCategory = (t as any)[analysis.machineCategory] || analysis.machineCategory

  return (
    <Document title={`${t.ceTitle} — ${analysis.machineName}`}>
      <Page size="A4" style={S.page}>
        {/* Watermark for demo */}
        {analysis.id === 'demo-001' && (
          <View fixed style={{ position: 'absolute', top: '40%', left: 0, right: 0, alignItems: 'center', transform: 'rotate(-35deg)', opacity: 0.07, pointerEvents: 'none' }}>
            <Text style={{ fontSize: 72, fontWeight: 'bold', color: '#000000', letterSpacing: 8 }}>PRZYKŁAD</Text>
            <Text style={{ fontSize: 24, color: '#000000', letterSpacing: 4 }}>RiskAnalytix.com</Text>
          </View>
        )}

        {/* Nagłówek: logo lewo | CE środek | numer prawo */}
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
          <View style={{ width: 130 }}>
            {companyLogo
              ? <Image src={companyLogo} style={S.logo} />
              : <>
                  <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#1F2937' }}>
                    RiskAnaly<Text style={{ color: "#1D4ED8" }}>tix</Text>
                  </Text>
                  <Text style={{ fontSize: 7, color: '#6B7280', marginTop: 1 }}>{t.ceSystem}</Text>
                </>
            }
          </View>
          <View style={{ alignItems: 'center' }}>
            <Text style={{ fontSize: 32, fontWeight: 'bold', color: '#1D4ED8', letterSpacing: 2 }}>CE</Text>
          </View>
          <View style={{ width: 130, alignItems: 'flex-end' }}>
            <Text style={{ fontSize: 7.5, color: '#6B7280', textAlign: 'right' }}>{t.ceTitle}</Text>
            <Text style={{ fontSize: 7.5, color: '#6B7280', textAlign: 'right' }}>{lang === 'pl' ? '2006/42/WE' : '2006/42/EC'}</Text>
            <Text style={{ fontSize: 8, fontWeight: 'bold', color: '#1F2937', textAlign: 'right', marginTop: 2 }}>Nr: {docId}</Text>
            <Text style={{ fontSize: 7.5, color: '#6B7280', textAlign: 'right' }}>{t.date}: {today}</Text>
          </View>
        </View>

        <View style={S.dividerBlue} />
        <View style={S.dividerThin} />

        {/* Tytuł */}
        <View style={S.disclaimerBox}>
          <Text style={S.disclaimerText}>{'⚠️ SZABLON – DO WERYFIKACJI I PODPISANIA'}</Text>
          <Text style={[S.disclaimerText, { marginTop: 2 }]}>Dokument wygenerowany przez RiskAnalytix jako szablon pomocniczy. Producent/modernizator ponosi pełną odpowiedzialność za treść, weryfikację danych i podpisanie deklaracji.</Text>
        </View>
        <View style={S.docTitleBox}>
          <Text style={S.docTitleMain}>{t.ceTitle}</Text>
          <Text style={S.docTitleSub}>{t.ceTitleEN}</Text>
          <Text style={S.docTitleDE}>{t.ceTitleDE}</Text>
        </View>

        {/* 1. Producent + 2. Maszyna */}
        <View style={S.twoCol}>
          <View style={[S.sectionBox, S.col]}>
            <Text style={S.sectionTitle}>{t.ceManufacturer}</Text>
            <View style={S.row}>
              <Text style={S.label}>{t.company}:</Text>
              <Text style={S.value}>{manufacturerName}</Text>
            </View>
            <View style={S.row}>
              <Text style={S.label}>{t.address}:</Text>
              <Text style={S.valueNormal}>{manufacturerAddress}</Text>
            </View>
            <View style={S.row}>
              <Text style={S.label}>{t.nip}:</Text>
              <Text style={S.valueNormal}>{manufacturerNip}</Text>
            </View>
          </View>

          <View style={[S.sectionBox, S.col]}>
            <Text style={S.sectionTitle}>{t.ceMachine}</Text>
            <View style={S.row}>
              <Text style={S.label}>{t.name}:</Text>
              <Text style={S.value}>{analysis.machineName}</Text>
            </View>
            <View style={S.row}>
              <Text style={S.label}>{t.category}:</Text>
              <Text style={S.valueNormal}>{machineCategory}</Text>
            </View>
            {analysis.serialNo && (
              <View style={S.row}>
                <Text style={S.label}>{t.serialNo}:</Text>
                <Text style={S.value}>{analysis.serialNo}</Text>
              </View>
            )}
            {analysis.productionYear && (
              <View style={S.row}>
                <Text style={S.label}>{t.year}:</Text>
                <Text style={S.valueNormal}>{analysis.productionYear}</Text>
              </View>
            )}
          </View>
        </View>

        {/* 3. Dyrektywy + 4. Normy */}
        <View style={S.twoCol}>
          <View style={[S.sectionBox, S.col]}>
            <Text style={S.sectionTitle}>{t.ceDirectives}</Text>
            {[
              { code: '2006/42/WE', name: t.ceMachineryDirective },
              { code: '2014/30/UE', name: t.ceEMC },
              { code: '2014/35/UE', name: t.ceLVD },
            ].map((d, i) => (
              <View key={i} style={S.directiveRow}>
                <Text style={S.bullet}>▸</Text>
                <Text style={S.directiveText}>
                  <Text style={{ fontWeight: 'bold' }}>{d.code}</Text> — {d.name}
                </Text>
              </View>
            ))}
          </View>

          <View style={[S.sectionBox, S.col]}>
            <Text style={S.sectionTitle}>{t.ceStandards}</Text>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
              {norms.map((norm, i) => (
                <View key={i} style={S.normBadge}>
                  <Text style={S.normBadgeText}>{norm}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>

        {/* 5. Jednostka notyfikowana */}
        <View style={[S.sectionBox, { marginBottom: 7 }]}>
          <Text style={S.sectionTitle}>{t.ceNotifiedBody}</Text>
          <Text style={{ fontSize: 7, color: '#6B7280', marginBottom: 5, lineHeight: 1.4 }}>
            {t.ceNotifiedBodyNote}
          </Text>
          <View style={S.twoCol}>
            <View style={S.col}>
              <View style={S.row}>
                <Text style={S.label}>{t.ceNotifiedBodyName}:</Text>
                <Text style={[S.valueNormal, { borderBottomWidth: 1, borderBottomColor: '#D1D5DB' }]}>{'   '}</Text>
              </View>
              <View style={S.row}>
                <Text style={S.label}>{t.ceNotifiedBodyAddress}:</Text>
                <Text style={[S.valueNormal, { borderBottomWidth: 1, borderBottomColor: '#D1D5DB' }]}>{'   '}</Text>
              </View>
            </View>
            <View style={S.col}>
              <View style={S.row}>
                <Text style={S.label}>{t.ceNotifiedBodyId}:</Text>
                <Text style={[S.valueNormal, { borderBottomWidth: 1, borderBottomColor: '#D1D5DB' }]}>{'   '}</Text>
              </View>
              <View style={S.row}>
                <Text style={S.label}>{t.ceNotifiedBodyCert}:</Text>
                <Text style={[S.valueNormal, { borderBottomWidth: 1, borderBottomColor: '#D1D5DB' }]}>{'   '}</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Oświadczenie */}
        <View style={S.declarationBox}>
          <Text style={S.declarationText}>
            {t.ceDeclaration} ({t.ceRiskDate}: {analysisDate}{analysis.analystName ? `, ${t.ceAnalyst}: ${analysis.analystName}` : ''}).{'\u005cn'}
            {t.ceDeclarationEN}
          </Text>
        </View>

        {/* 6. Podpisy */}
        <Text style={{ fontSize: 7, fontWeight: 'bold', color: '#374151', marginBottom: 5 }}>
          {t.ceSignatories}
        </Text>
        <View style={S.signatureSection}>
          {[t.cePlaceDate, t.ceSignature, t.ceSignature].map((label, i) => (
            <View key={i} style={S.signatureBox}>
              <View style={S.signatureLine} />
              <Text style={S.signatureLabel}>{label}</Text>
            </View>
          ))}
        </View>

        {/* Uwaga */}
        <View style={S.noticeBox}>
          <Text style={S.noticeText}>⚠ {t.ceDisclaimer}</Text>
        </View>

        {/* Footer */}
        <View style={S.footer} fixed>
          <Text style={S.footerText}>RiskAnalytix · {today} · Nr: {docId}</Text>
          <Text style={S.footerText}>{t.ceFooter}</Text>
        </View>

        <View style={S.footerCE} fixed>
          <Text style={S.footerCEText}>Szablon RiskAnalytix • Ostateczna odpowiedzialność spoczywa na producencie maszyny • Wymaga weryfikacji i podpisu</Text>
        </View>
      </Page>
    </Document>
  )
}



