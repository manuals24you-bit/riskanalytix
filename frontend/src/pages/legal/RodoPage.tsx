import { Link } from 'react-router-dom'

export default function RodoPage() {
  return (
    <div style={{ minHeight: '100vh', background: '#0B0F1A', color: '#F0EDE8', fontFamily: 'Lato, sans-serif' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '60px 24px' }}>
        <Link to="/" style={{ color: '#E8A838', fontSize: '13px', textDecoration: 'none' }}>← Powrót</Link>
        <h1 style={{ fontFamily: 'Georgia, serif', fontSize: '36px', marginTop: '24px', marginBottom: '32px' }}>
          Informacja RODO
        </h1>
        <div style={{ fontSize: '14px', lineHeight: 1.8, color: '#8a99b0' }}>
          <p style={{ marginBottom: '16px' }}>Zgodnie z art. 13 Rozporządzenia Parlamentu Europejskiego i Rady (UE) 2016/679 z dnia 27 kwietnia 2016 r. (RODO) informujemy:</p>

          <p style={{ marginBottom: '8px', marginTop: '24px' }}><strong style={{ color: '#F0EDE8' }}>Administrator:</strong></p>
          <p style={{ marginBottom: '16px' }}>RiskAnalytix Sp. z o.o., ul. Przykładowa 1, 00-000 Warszawa, kontakt@riskanalytix.pl</p>

          <p style={{ marginBottom: '8px', marginTop: '16px' }}><strong style={{ color: '#F0EDE8' }}>Inspektor Ochrony Danych:</strong></p>
          <p style={{ marginBottom: '16px' }}>iod@riskanalytix.pl (do uzupełnienia jeśli wymagany)</p>

          <p style={{ marginBottom: '8px', marginTop: '16px' }}><strong style={{ color: '#F0EDE8' }}>Cele przetwarzania i podstawy prawne:</strong></p>
          <p style={{ marginBottom: '8px' }}>• Świadczenie usług platformy — art. 6 ust. 1 lit. b (wykonanie umowy)</p>
          <p style={{ marginBottom: '8px' }}>• Wystawianie faktur — art. 6 ust. 1 lit. c (obowiązek prawny)</p>
          <p style={{ marginBottom: '8px' }}>• Marketing własnych usług — art. 6 ust. 1 lit. f (uzasadniony interes) lub zgoda</p>
          <p style={{ marginBottom: '16px' }}>• Bezpieczeństwo systemu — art. 6 ust. 1 lit. f (uzasadniony interes)</p>

          <p style={{ marginBottom: '8px', marginTop: '16px' }}><strong style={{ color: '#F0EDE8' }}>Odbiorcy danych:</strong></p>
          <p style={{ marginBottom: '16px' }}>Operatorzy płatności (Stripe), dostawcy hostingu (Supabase/AWS EU), dostawcy e-mail transakcyjnego. Dane nie są przekazywane do państw trzecich bez odpowiednich zabezpieczeń (SCC).</p>

          <p style={{ marginBottom: '8px', marginTop: '16px' }}><strong style={{ color: '#F0EDE8' }}>Twoje prawa:</strong></p>
          <p style={{ marginBottom: '8px' }}>✓ Prawo dostępu do danych (art. 15)</p>
          <p style={{ marginBottom: '8px' }}>✓ Prawo do sprostowania (art. 16)</p>
          <p style={{ marginBottom: '8px' }}>✓ Prawo do usunięcia (art. 17)</p>
          <p style={{ marginBottom: '8px' }}>✓ Prawo do ograniczenia przetwarzania (art. 18)</p>
          <p style={{ marginBottom: '8px' }}>✓ Prawo do przenoszenia danych (art. 20)</p>
          <p style={{ marginBottom: '8px' }}>✓ Prawo do sprzeciwu (art. 21)</p>
          <p style={{ marginBottom: '16px' }}>✓ Prawo do cofnięcia zgody w dowolnym momencie (art. 7 ust. 3)</p>

          <p style={{ marginBottom: '8px', marginTop: '16px' }}><strong style={{ color: '#F0EDE8' }}>Prawo do skargi:</strong></p>
          <p style={{ marginBottom: '16px' }}>Prezes Urzędu Ochrony Danych Osobowych, ul. Stawki 2, 00-193 Warszawa, www.uodo.gov.pl</p>

          <p style={{ marginBottom: '8px', marginTop: '16px' }}><strong style={{ color: '#F0EDE8' }}>Zautomatyzowane podejmowanie decyzji:</strong></p>
          <p style={{ marginBottom: '16px' }}>Dane nie są wykorzystywane do profilowania ani zautomatyzowanego podejmowania decyzji.</p>
        </div>
      </div>
    </div>
  )
}