import ServiceLandingPage from '../../components/ServiceLandingPage.jsx'

export default function Retirement() {
  const strategies = [
    { 
      name: 'Structured Drawdown Planning', 
      icon: '📉', 
      desc: 'Creating inflation-indexed withdrawal models (like SWPs) to generate reliable monthly cash flow without liquidating equity during bear markets.' 
    },
    { 
      name: 'NPS & EPF Capital Audit', 
      icon: '⚖️', 
      desc: 'Optimizing retirement corpus allocations between Equity, Corporate Debt, and Government Securities in the National Pension Scheme (NPS).' 
    },
    { 
      name: 'Tax-Efficient Retirement Income', 
      icon: '💸', 
      desc: 'Structuring distributions to minimize tax brackets, extracting tax-free components, and planning tax-friendly annuity options.' 
    },
    { 
      name: 'Healthcare & Inflation Cushioning', 
      icon: '🛡️', 
      desc: 'Building separate health insurance funds and inflation-hedged equity segments to protect your principal capital from rising medical costs.' 
    }
  ]

  const problems = [
    { 
      title: 'The Static Annuity Mistake', 
      desc: 'Locking up your entire retirement corpus in low-yield traditional insurance annuities that fail to beat basic inflation, reducing your purchasing power over time.' 
    },
    { 
      title: 'Sequence of Returns Danger', 
      desc: 'Forced to sell depressed equity mutual funds during market corrections in early retirement because of poor cash flow planning, causing permanent damage to your portfolio.' 
    }
  ]

  const caseStudy = {
    quote: 'We retired with a mix of corporate deposits, gold, and mutual funds, but had no idea how to pull money out. Fortune designed a systematic withdrawal path that gives us stress-free cash flow while keeping our corpus growing.',
    client: 'Subhash & Sunita Deshpande',
    details: 'Retired PSU Director & Teacher',
    outcome: '₹4.5Cr corpus secured with dynamic SWP'
  }

  const faqs = [
    { 
      q: 'How do you prevent inflation from eroding my retirement funds?', 
      a: 'We allocate a segment of your retirement portfolio into equity index funds. While debt assets cover your short-term cash needs, the equity segment grows over time to hedge your capital against inflation.' 
    },
    { 
      q: 'Should I withdraw my EPF immediately upon retirement?', 
      a: 'Not always. EPF continues to earn tax-free interest for a specific period after retirement depending on active status. We help evaluate your tax slabs to map out a systematic exit schedule.' 
    },
    { 
      q: 'How is the Systematic Withdrawal Plan (SWP) structured?', 
      a: 'We set up an SWP from low-risk debt funds or arbitrage schemes. This automatically credits a monthly salary to your bank account, keeping your core equity investments untouched.' 
    }
  ]

  return (
    <ServiceLandingPage
      title="Fiduciary Retirement Planning & Drawdowns"
      subtitle="Pension Audits & Inflation-Hedged Cash Flows"
      description="Retirement planning isn't just about saving capital; it's about structuring a reliable stream of cash to support your lifestyle without outliving your assets."
      heroImage="https://images.unsplash.com/photo-1473186578172-c141e6798cf4?q=80&w=800"
      strategies={strategies}
      problems={problems}
      caseStudy={caseStudy}
      faqs={faqs}
    />
  )
}
