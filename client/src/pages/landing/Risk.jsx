import ServiceLandingPage from '../../components/ServiceLandingPage.jsx'

export default function Risk() {
  const strategies = [
    { 
      name: 'Asset Protection & Insolvency', 
      icon: '🛡️', 
      desc: 'Insulating personal properties and equity portfolios from business insolvency risks using structures like the Married Women\'s Property Act (MWPA).' 
    },
    { 
      name: 'Portfolio Drawdown Auditing', 
      icon: '📉', 
      desc: 'Stress-testing liquid portfolios against historic market crashes (like 2008 or 2020) to ensure asset allocation buffers match your actual risk tolerances.' 
    },
    { 
      name: 'Director & Professional Liability', 
      icon: '⚖️', 
      desc: 'Auditing D&O and professional indemnity plans to protect executives and self-employed professionals from regulatory disputes.' 
    },
    { 
      name: 'Concentrated Stock Hedging', 
      icon: '🔒', 
      desc: 'Designing diversification paths for concentrated corporate ESOPs or promoter stock holdings to reduce company-specific risks.' 
    }
  ]

  const problems = [
    { 
      title: 'Vulnerable Personal Assets', 
      desc: 'Pledging personal properties or assets for business loans without setting up separate legal structures, risking your family\'s safety during business downturns.' 
    },
    { 
      title: 'Inadequate Indemnity Coverage', 
      desc: 'Relying on generic health and liability plans that fail to cover legal disputes or regulatory actions, exposing your savings to unexpected liabilities.' 
    }
  ]

  const caseStudy = {
    quote: 'Fortune audited our business risks and restructured our assets under the MWP Act, ensuring my family\'s safety from any future commercial litigation.',
    client: 'Naresh & Geeta Singhal',
    details: 'Manufacturing Promoters',
    outcome: '100% personal asset protection secured'
  }

  const faqs = [
    { 
      q: 'What is the Married Women\'s Property (MWP) Act protection?', 
      a: 'An insurance policy taken under the MWP Act ensures that the policy benefits are reserved solely for your wife and children. They cannot be attached by business creditors or claimed in court.' 
    },
    { 
      q: 'How do you stress-test investment portfolios?', 
      a: 'We simulate historical market events on your portfolio to analyze potential drawdowns. We then adjust your cash and debt allocations to ensure you can weather downturns without panic selling.' 
    },
    { 
      q: 'Can you help hedge concentrated ESOP exposure?', 
      a: 'Yes. We design structured exit calendars for vested ESOP shares, balancing tax implications with risk management to diversify your net worth out of a single employer.' 
    }
  ]

  return (
    <ServiceLandingPage
      title="Fiduciary Risk Management & Asset Protection"
      subtitle="Fiduciary Capital Shield"
      description="We identify hidden risk points across your personal and business balance sheets, structuring assets to insulate your family from unexpected liabilities."
      heroImage="https://images.unsplash.com/photo-1507207611509-ec012433ff52?q=80&w=800"
      strategies={strategies}
      problems={problems}
      caseStudy={caseStudy}
      faqs={faqs}
    />
  )
}
