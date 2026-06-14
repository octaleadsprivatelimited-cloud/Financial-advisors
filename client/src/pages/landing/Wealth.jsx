import ServiceLandingPage from '../../components/ServiceLandingPage.jsx'

export default function Wealth() {
  const strategies = [
    { 
      name: 'Institutional Asset Allocation', 
      icon: '📈', 
      desc: 'Constructing diversified portfolios across international equity, sovereign debt, gold, and absolute-return debt assets to minimize volatility.' 
    },
    { 
      name: 'PMS & AIF Due Diligence', 
      icon: '🛡️', 
      desc: 'Independent assessment of high-ticket private portfolios, filtering out hidden transactional churn, high entry fees, and performance hurdles.' 
    },
    { 
      name: 'Direct Mutual Fund Migration', 
      icon: '🔄', 
      desc: 'Analyzing your legacy regular mutual fund portfolio, building tax-efficient exit calendars, and shifting assets to direct commission-free shares.' 
    },
    { 
      name: 'Global Currency & Asset Hedging', 
      icon: '🌍', 
      desc: 'Allocating to US indices and international ETFs to protect purchase power and hedge against Rupee depreciation over long-term timelines.' 
    }
  ]

  const problems = [
    { 
      title: 'Hidden Commission Churn', 
      desc: 'Traditional advisors often recommend high-churn mutual funds because they collect ongoing trail commissions of 1% to 1.5% annually, eroding your compound growth.' 
    },
    { 
      title: 'Distributor Biases & Kickbacks', 
      desc: 'Relationship managers at large private banks are pushed to hit product sales quotas, leading them to recommend structured products with massive fee drag.' 
    }
  ]

  const caseStudy = {
    quote: 'Auditing our private bank portfolio exposed ₹12 Lakhs in annual commission bleed. Fortune structured a clean, commission-free asset allocation plan, increasing our net annual returns instantly.',
    client: 'Vikram & Sandhya Roy',
    details: 'UHNIs, Real Estate Developers',
    outcome: '₹12 Lakhs annual leakage recovered'
  }

  const faqs = [
    { 
      q: 'What are direct mutual funds, and how do they benefit me?', 
      a: 'Direct mutual fund plans do not pay distributor commissions. Because they bypass third-party agents, their expense ratios are up to 1.5% lower per year. Over a 10 to 20-year horizon, this single structural change can add millions to your compounded net worth.' 
    },
    { 
      q: 'Do you charge performance-based management fees?', 
      a: 'No. Performance fees create toxic incentives to take excessive risks. We charge a transparent, fixed annual retainer or a low percentage fee on assets under advisory (AUA), completely decoupled from transactional volume.' 
    },
    { 
      q: 'How do you handle global investment exposure?', 
      a: 'We assist in utilizing the Liberalised Remittance Scheme (LRS) to invest directly in low-cost US-domiciled equity ETFs and mutual funds, maintaining true geographical asset diversification.' 
    }
  ]

  return (
    <ServiceLandingPage
      title="Wealth Management & Fiduciary Portfolios"
      subtitle="Commission-Free Investment Design & Asset Allocation"
      description="We construct custom, empirically researched portfolios based on modern portfolio theory. No speculative day trading, no market-timing gimmicks. Just institutional-grade capital compounding."
      heroImage="https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?q=80&w=800"
      strategies={strategies}
      problems={problems}
      caseStudy={caseStudy}
      faqs={faqs}
    />
  )
}
