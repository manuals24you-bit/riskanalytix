import jwt from 'jsonwebtoken'

// Dodajemy domyślną wartość, jeśli proces.env zawiedzie
const JWT_SECRET = process.env.JWT_SECRET || 'emergency_secret_123';
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'emergency_refresh_123';

export const generateTokens = (userId: string, role: string) => {
  // Logujemy (tylko w logach Vercel), czy zmienna została wczytana
  if (!process.env.JWT_SECRET) {
    console.error('❌ UWAGA: process.env.JWT_SECRET jest PUSTE!');
  }

  const accessToken = jwt.sign(
    { userId, role },
    JWT_SECRET, // Teraz użyje albo zmiennej, albo 'emergency_secret_123'
    { expiresIn: '60m' }
  )
  // ... reszta kodu