import ServiceLandingPage from '../../components/ServiceLandingPage.jsx'

export default function Mortgage() {
  const strategies = [
    { 
      name: 'Mortgage Refinancing Audit', 
      icon: '🔄', 
      desc: 'Analyzing your interest rate structures, comparing floating vs. fixed models, and identifying opportunities to refinance outstanding home loans.' 
    },
    { 
      name: 'Prepayment Optimisation', 
      icon: '📈', 
      desc: 'Calculating the balance between debt prepayments and investing in direct mutual funds based on post-tax interest rate spreads.' 
    },
    { 
      name: 'Loan Restructuring Strategy', 
      icon: '⚖️', 
      desc: 'Negotiating credit terms, consolidating multiple high-cost liabilities, and optimizing loan tenures to lower your EMI burden.' 
    },
    { 
      name: 'SME Commercial Credit', 
      icon: '🏢', 
      desc: 'Structuring commercial property loans and working capital lines of credit to fund corporate expansions at minimal interest costs.' 
    }
  ]

  const problems = [
    { 
      title: 'The Long Tenure Trap', 
      desc: 'Accepting automatic loan tenure extensions from banks during interest rate hikes, which can double the total interest paid over the life of your mortgage.' 
    },
    { 
      title: 'Hidden Processing markups', 
      desc: 'Relying on bank agents who bundle expensive, single-premium credit life insurance policies into your loan amount, adding unnecessary debt.' 
    }
  ]

  const caseStudy = {
    quote: 'Fortune restructured our home loan, audited the bank\'s tenure extensions, and designed a prepayment schedule that saved us over ₹34 Lakhs in interest costs.',
    client: 'Ramesh & Anitha Gowda',
    details: 'IT Professionals, Bengaluru',
    outcome: 'Saved ₹34 Lakhs in lifetime interest'
  }

  const faqs = [
    { 
      q: 'Should I prepay my home loan or invest in mutual funds?', 
      a: 'This depends on the interest rate spread. If your home loan interest is 8.5% (with tax benefits) and direct mutual funds are expected to yield 12% over the long term, investing the surplus is often more wealth-efficient. We construct a custom schedule for your scenario.' 
    },
    { 
      q: 'How do tenure extensions affect my mortgage?', 
      a: 'During rate hikes, banks often extend your tenure rather than increasing EMIs. This keeps your monthly payment stable but adds years of interest. We monitor your loans to prevent these automatic extensions.' 
    },
    { 
      q: 'Do you recommend fixed or floating interest rates?', 
      a: 'Generally, floating rates linked to external benchmarks (like EBLR) are better over long tenures in India, as they pass interest rate cuts on to you quickly. We help audit your rate linkages.' 
    }
  ]

  return (
    <ServiceLandingPage
      title="Fiduciary Mortgage & Debt Advisory"
      subtitle="Debt Restructuring Desk"
      description="We do not sell loans. We provide unbiased audits of your home loans, commercial credit, and repayment plans to minimize your overall financing costs."
      heroImage="https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=800"
      strategies={strategies}
      problems={problems}
      caseStudy={caseStudy}
      faqs={faqs}
    />
  )
}
