import ServiceLandingPage from '../../components/ServiceLandingPage.jsx'

export default function Advisory() {
  const strategies = [
    { 
      name: 'Conflict-Free Portfolio Audits', 
      icon: '🔍', 
      desc: 'Analyzing your current portfolio to calculate exact expense ratios, identify hidden commissions, and flag performance-dragging assets.' 
    },
    { 
      name: 'Flat-Fee Wealth retainers', 
      icon: '💵', 
      desc: 'Providing flat-fee or asset-based pricing that is independent of transactions, ensuring our recommendations are in your best interest.' 
    },
    { 
      name: 'Independent Product Due Diligence', 
      icon: '🛡️', 
      desc: 'Performing thorough reviews of PMS, AIF, and private corporate debt offerings, weeding out commission structures and entry hurdles.' 
    },
    { 
      name: 'Direct Asset Execution', 
      icon: '🔄', 
      desc: 'Guiding you through direct-plan account opening and tax-efficient portfolio transition processes, avoiding commission markups.' 
    }
  ]

  const problems = [
    { 
      title: 'Sales Quota Pressures', 
      desc: 'Relationship managers at banks are pushed to sell high-commission products like structured notes and ULIPs to hit corporate sales quotas.' 
    },
    { 
      title: 'Hidden Commission Fees', 
      desc: 'Many regular mutual funds and insurance products carry ongoing commission charges that are deducted directly from your portfolio yield.' 
    }
  ]

  const caseStudy = {
    quote: 'Shifting to Fortune\'s fee-only advisory model cleared all product conflicts. We now have a clear view of our balance sheet and make conflict-free decisions.',
    client: 'Sridhar & Kavitha Krishnan',
    details: 'UHNIs, Technology Executives',
    outcome: '100% fiduciary alignment secured'
  }

  const faqs = [
    { 
      q: 'What does registered fiduciary status mean?', 
      a: 'A registered fiduciary is legally required to put your financial interests first. We do not sell financial products or collect distributor commissions, making our advice conflict-free.' 
    },
    { 
      q: 'How does your advisory process begin?', 
      a: 'We start with a thorough audit of your current portfolio, assets, liabilities, and goals. We then design a customized wealth strategy and provide ongoing reviews.' 
    },
    { 
      q: 'How are your advisory fees calculated?', 
      a: 'We charge a flat annual retainer or a low percentage fee based on assets under advisory (AUA), completely decoupled from transactional volume.' 
    }
  ]

  return (
    <ServiceLandingPage
      title="Unbiased Fiduciary Advisory Services"
      subtitle="Fiduciary Advisory Desk"
      description="We act as your dedicated personal CFOs, offering conflict-free wealth advice, tax optimization, and inheritance strategies without product cross-selling."
      heroImage="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=800"
      strategies={strategies}
      problems={problems}
      caseStudy={caseStudy}
      faqs={faqs}
    />
  )
}
