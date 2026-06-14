import ServiceLandingPage from '../../components/ServiceLandingPage.jsx'

export default function Business() {
  const strategies = [
    { 
      name: 'Promoter Dilution Strategy', 
      icon: '📈', 
      desc: 'Modeling equity dilution schedules, structuring investor term sheets, and managing pre/post-money valuation calculations.' 
    },
    { 
      name: 'Corporate Cash Flow Treasury', 
      icon: '💼', 
      desc: 'Optimizing yield on business cash balances using short-duration treasury assets and arbitrage structures, avoiding zero-interest current accounts.' 
    },
    { 
      name: 'Business Budgeting & Modeling', 
      icon: '📊', 
      desc: 'Building operating budgets, unit economics tracking dashboards, and long-range capital expenditure forecasts.' 
    },
    { 
      name: 'Keyman Insurance & Risk Audit', 
      icon: '🛡️', 
      desc: 'Structuring director liability and keyman insurance policies to protect the company from operational shocks.' 
    }
  ]

  const problems = [
    { 
      title: 'Idle Corporate Cash Leakage', 
      desc: 'Leaving millions in idle business cash in standard current accounts, losing valuable yield to inflation and missing out on risk-free treasury returns.' 
    },
    { 
      title: 'Unstructured Promoter Compensation', 
      desc: 'Taking random promoter withdrawals that trigger high tax slabs, rather than structuring compensation through tax-efficient dividends, fees, and perk programs.' 
    }
  ]

  const caseStudy = {
    quote: 'Fortune set up a corporate treasury account and helped us allocate our surplus capital into low-risk debt assets, generating significant extra yield for our operations.',
    client: 'Siddharth & Ananya Goyal',
    details: 'Co-founders, AeroTech Solutions',
    outcome: '₹14 Lakhs annual treasury yield added'
  }

  const faqs = [
    { 
      q: 'How do you optimize idle business cash reserves?', 
      a: 'We set up a corporate treasury account and allocate excess cash to liquid debt mutual funds, overnight assets, and short-term certificates. This ensures immediate liquidity for operations while earning market yield.' 
    },
    { 
      q: 'Do you help with venture capital term sheets?', 
      a: 'Yes. We act as your fiduciary financial officers to review VC term sheets, evaluate liquidation preferences, anti-dilution clauses, and protective provisions to protect the promoters.' 
    },
    { 
      q: 'What is Keyman Insurance and is it tax-deductible?', 
      a: 'Keyman Insurance covers key promoters or directors whose loss would impact business operations. The premiums paid by the business are generally deductible as business expenses.' 
    }
  ]

  return (
    <ServiceLandingPage
      title="Business Financial Advisory & Corporate Treasury"
      subtitle="Fiduciary Corporate CFO Desk"
      description="We act as your virtual CFO and corporate treasury advisor, structuring cash reserves, promoter compensation, and capital raising plans."
      heroImage="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800"
      strategies={strategies}
      problems={problems}
      caseStudy={caseStudy}
      faqs={faqs}
    />
  )
}
