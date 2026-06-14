import ServiceLandingPage from '../../components/ServiceLandingPage.jsx'

export default function Education() {
  const strategies = [
    { 
      name: 'NRI Tax Advisory & DTAA', 
      icon: '✈️', 
      desc: 'Optimizing taxation on NRE/NRO accounts, managing double taxation treaty benefits (DTAA), and planning repatriation calendars.' 
    },
    { 
      name: 'Global Education Saving Models', 
      icon: '🎓', 
      desc: 'Building diversified portfolios indexed to global higher education inflation (which rises at 8-10% annually in foreign currencies).' 
    },
    { 
      name: 'LRS Outward Remittance Setup', 
      icon: '💵', 
      desc: 'Guiding you through the Liberalised Remittance Scheme (LRS) limits and optimizing TCS (Tax Collected at Source) during remittances.' 
    },
    { 
      name: 'USD Currency Hedging', 
      icon: '🇺🇸', 
      desc: 'Investing in foreign-currency assets and US index trackers to protect your savings from domestic rupee depreciation.' 
    }
  ]

  const problems = [
    { 
      title: 'Underestimating Education Cost Inflation', 
      desc: 'Assuming that standard domestic savings rates are enough to fund foreign university costs, without accounting for exchange rate volatility and specialized index inflation.' 
    },
    { 
      title: 'NRO Account Tax Penalties', 
      desc: 'Leaving domestic Indian income in NRO accounts without filing for lower TDS under tax treaties, resulting in automatic 30.9% tax deductions.' 
    }
  ]

  const caseStudy = {
    quote: 'We wanted our daughter to study in the UK, but the rising exchange rates made us nervous. Fortune structured a dedicated currency-hedged savings plan that hit our targets right on time.',
    client: 'Dr. Sandeep & Monica Varma',
    details: 'NRIs, Medical Practitioners (Abu Dhabi)',
    outcome: '£180,000 education fund secured'
  }

  const faqs = [
    { 
      q: 'How does India\'s TCS tax apply to foreign education remittances?', 
      a: 'Remittances for foreign education under LRS are subject to Tax Collected at Source (TCS) of 5% above ₹7 Lakhs (or 0.5% if funded via an education loan). This TCS is not a final tax and can be claimed back during your ITR filing.' 
    },
    { 
      q: 'Can NRIs continue to hold regular resident mutual funds in India?', 
      a: 'No. Upon changing your status to NRI, you must update your KYC and convert your resident savings/demat accounts to NRO/NRE status. We manage this entire transition for you.' 
    },
    { 
      q: 'Which investment vehicles are best for education planning?', 
      a: 'We combine direct international equity funds, sovereign bonds, and currency-hedged ETFs, adjusting the asset mix as your child approaches college age.' 
    }
  ]

  return (
    <ServiceLandingPage
      title="NRI Advisory & Global Education Planning"
      subtitle="Fiduciary Cross-Border Wealth Strategy"
      description="Whether saving for your child's international degree or managing cross-border income, we help you build inflation-proof, currency-hedged portfolios."
      heroImage="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=800"
      strategies={strategies}
      problems={problems}
      caseStudy={caseStudy}
      faqs={faqs}
    />
  )
}
