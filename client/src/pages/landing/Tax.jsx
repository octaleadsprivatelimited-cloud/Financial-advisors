import ServiceLandingPage from '../../components/ServiceLandingPage.jsx'

export default function Tax() {
  const strategies = [
    { 
      name: 'Capital Gains Management', 
      icon: '📉', 
      desc: 'Proactively managing long-term and short-term capital gains on equities and properties using Section 54, 54EC, and 54F tax exemptions.' 
    },
    { 
      name: 'HUF Partition & Structuring', 
      icon: '👨‍👩‍👧‍👦', 
      desc: 'Forming Hindu Undivided Family accounts legally to establish a separate tax entity, effectively doubling your basic deduction thresholds.' 
    },
    { 
      name: 'Promoter & Compensation Optimization', 
      icon: '🏢', 
      desc: 'Designing compensation models, director salaries, and executive perk distributions to minimize personal tax rates while preserving company deductions.' 
    },
    { 
      name: 'Tax-Harvesting Automation', 
      icon: '🌾', 
      desc: 'Systematically harvesting up to ₹1.25 Lakhs in tax-free equity long-term capital gains every fiscal year through automated portfolio rebalancing.' 
    }
  ]

  const problems = [
    { 
      title: 'Year-End Scramble Stress', 
      desc: 'Most taxpayers wait until March to throw money into lock-in tax savings options without checking their overall asset allocation, causing permanent capital losses.' 
    },
    { 
      title: 'Double Taxation Leakage', 
      desc: 'NRIs and global employees often face double taxation on ESOPs, stock options, and foreign pension distributions due to incorrect double tax relief (DTAA) filing.' 
    }
  ]

  const caseStudy = {
    quote: 'By structuring our family HUF, optimizing long-term capital gains on real estate sales, and setting up systematic tax-harvesting, Fortune saved us ₹85 Lakhs on a single asset sale.',
    client: 'Rajiv Mehta',
    details: 'Founder, Chemical Export Enterprise',
    outcome: '₹85 Lakhs in direct tax savings'
  }

  const faqs = [
    { 
      q: 'How does tax-harvesting work on equity portfolios?', 
      a: 'In India, long-term capital gains (LTCG) on equity up to ₹1.25 Lakhs per fiscal year are exempt from income tax. We systematically sell and immediately repurchase mutual fund units before the year ends to lock in these tax-free gains and increase your cost basis.' 
    },
    { 
      q: 'Can you help set up a Hindu Undivided Family (HUF)?', 
      a: 'Yes. We guide you through the legal drafting, PAN card application, and bank account setup for your HUF. We then help shift ancestral gifts or business gains to this entity to reduce your overall family tax slab.' 
    },
    { 
      q: 'Do you file income tax returns (ITR) for clients?', 
      a: 'Yes, our tax desk provides comprehensive return filing support. We audit Form 26AS, AIS, and TIS to ensure all capital gains, dividends, and professional incomes are accurately declared to the tax department.' 
    }
  ]

  return (
    <ServiceLandingPage
      title="Fiduciary Tax Optimization & Advisory"
      subtitle="Integrated Tax Planning & Wealth Protection"
      description="Tax planning is not a year-end compliance errand. We embed legal tax optimization strategies directly into your daily asset allocation to boost your compound net return."
      heroImage="https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?q=80&w=800"
      strategies={strategies}
      problems={problems}
      caseStudy={caseStudy}
      faqs={faqs}
    />
  )
}
