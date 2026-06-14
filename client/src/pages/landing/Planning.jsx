import ServiceLandingPage from '../../components/ServiceLandingPage.jsx'

export default function Planning() {
  const strategies = [
    { 
      name: 'Cash Flow Coordination', 
      icon: '📊', 
      desc: 'Detailed monthly cash flow charting, allocating surpluses across capital compounding tranches, and budgeting emergency buffers.' 
    },
    { 
      name: 'Goal-Based Capital Modeling', 
      icon: '🎯', 
      desc: 'Custom multi-variable simulation factoring in domestic inflation, global educational cost indexes, and real estate appreciation.' 
    },
    { 
      name: 'Debt & Liability Optimization', 
      icon: '⚖️', 
      desc: 'Restructuring outstanding high-interest liabilities, optimizing home loan prepayments, and auditing promoter leverage.' 
    },
    { 
      name: 'Emergency Fund Protection', 
      icon: '🛡️', 
      desc: 'Securing a robust 6 to 12 months buffer in low-volatility liquid arbitrage funds, insulated from market drawdowns.' 
    }
  ]

  const problems = [
    { 
      title: 'The One-Time Report Trap', 
      desc: 'Many advisors sell a static 100-page financial plan PDF that sits in a drawer and becomes obsolete the moment your career path or cash flow changes.' 
    },
    { 
      title: 'Disguised Insurance Push', 
      desc: 'Traditional planners often bundle low-yield endowment plans or ULIPs under the guise of safety, extracting up to 40% upfront commissions.' 
    }
  ]

  const caseStudy = {
    quote: 'Before corporate wealth planning, we had scattered mutual funds and three expensive ULIPs. Fortune audited our assets, exited the bad contracts, and aligned us to a single fiduciary cash flow track.',
    client: 'Amit & Nita Sharma',
    details: 'VP Product (SaaS) & Architect',
    outcome: '₹18 Lakhs saved from commission exits'
  }

  const faqs = [
    { 
      q: 'How frequently do we review our personal financial plan?', 
      a: 'We establish a baseline plan during the first 6 weeks. Subsequently, we host quarterly progress reviews and provide real-time updates as your income, equity vesting, or milestone goals shift.' 
    },
    { 
      q: 'Do you sell insurance or investment products directly?', 
      a: 'No. As a fee-only fiduciary advisor, we do not receive distributor commission codes. We provide unbiased specifications for term plans, health covers, and direct mutual funds, leaving you to invest without markup.' 
    },
    { 
      q: 'How is the emergency fund managed?', 
      a: 'We allocate your emergency funds across dynamic liquid asset funds and sovereign cash reserves to prioritize immediate liquidity, tax optimization, and yield over speculative stock returns.' 
    }
  ]

  return (
    <ServiceLandingPage
      title="Comprehensive Personal Financial Planning"
      subtitle="Fiduciary Life Strategy & Cash Flow Maps"
      description="A true financial plan is not a static binder. We construct a responsive, custom playbook built around your actual life goals, equity vesting schedules, and multi-generational priorities."
      heroImage="https://images.unsplash.com/photo-1551632436-cbf8dd35adfa?q=80&w=800"
      strategies={strategies}
      problems={problems}
      caseStudy={caseStudy}
      faqs={faqs}
    />
  )
}
