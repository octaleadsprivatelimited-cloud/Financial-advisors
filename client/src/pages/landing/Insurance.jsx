import ServiceLandingPage from '../../components/ServiceLandingPage.jsx'

export default function Insurance() {
  const strategies = [
    { 
      name: 'Unbiased Coverage Audits', 
      icon: '🔍', 
      desc: 'Calculating your Human Life Value (HLV) to specify the exact term cover needed to secure your family, without regular premium inflation.' 
    },
    { 
      name: 'ULIP & Endowment Exits', 
      icon: '🔄', 
      desc: 'Identifying high-expense, low-yield investment-linked insurance plans, designing surrender schedules, and shifting capital to low-cost alternatives.' 
    },
    { 
      name: 'Super Top-Up Health Planning', 
      icon: '🏥', 
      desc: 'Structuring health policies with corporate covers, base plans, and high-deductible super top-ups to maximize coverage while lowering premiums.' 
    },
    { 
      name: 'Keyman & Business Risk Audits', 
      icon: '🏢', 
      desc: 'Securing director liability plans and Keyman protection schemes to insulate your company from operations disruptions.' 
    }
  ]

  const problems = [
    { 
      title: 'High-Commission Investment Bundles', 
      desc: 'Agents frequently sell ULIPs and Endowment plans because they collect up to 40% upfront commissions, lock up your money for 5 years, and return less than 6% annually.' 
    },
    { 
      title: 'Hidden Policy Exclusions', 
      desc: 'Cheap policies often have room rent limits, copay requirements, and strict pre-existing condition clauses, resulting in denied claims at the hospital desk.' 
    }
  ]

  const caseStudy = {
    quote: 'We were paying ₹3.5 Lakhs annually for five different endowment policies. Fortune reviewed the policies, helped us exit the bad ones, and replaced them with a simple term policy and health top-up.',
    client: 'Kiran & Sneha Kulkarni',
    details: 'IT Managers, Pune',
    outcome: 'Saved ₹2.4 Lakhs in annual premiums'
  }

  const faqs = [
    { 
      q: 'Why should I separate insurance from investments?', 
      a: 'Bundled plans offer the worst of both worlds: low insurance coverage and poor investment returns. By separating them—using pure term insurance for safety and direct mutual funds for growth—you maximize your protection and compound your wealth faster.' 
    },
    { 
      q: 'What is a Super Top-Up health insurance plan?', 
      a: 'A Super Top-Up policy kicks in after a certain hospital expense threshold (deductible) is reached. It provides high medical coverage (e.g., ₹50 Lakhs) at a fraction of the cost of a standard base policy.' 
    },
    { 
      q: 'Do you help with policy claims processing?', 
      a: 'Yes. Our fiduciary desk assists client families during medical emergencies or claim filings, auditing documentation to ensure swift approvals from insurance companies.' 
    }
  ]

  return (
    <ServiceLandingPage
      title="Fiduciary Insurance Auditing & Risk Management"
      subtitle="Independent Protection Review & ULIP Exits"
      description="We do not sell insurance. We act as independent fiduciaries to audit your policies, remove high-cost plans, and ensure your family has comprehensive coverage."
      heroImage="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=800"
      strategies={strategies}
      problems={problems}
      caseStudy={caseStudy}
      faqs={faqs}
    />
  )
}
