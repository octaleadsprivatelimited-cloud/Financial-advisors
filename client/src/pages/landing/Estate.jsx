import ServiceLandingPage from '../../components/ServiceLandingPage.jsx'

export default function Estate() {
  const strategies = [
    { 
      name: 'Private Family Trust Setup', 
      icon: '🛡️', 
      desc: 'Drafting and registering private family trusts to isolate assets, protect against business insolvency, and simplify inheritance.' 
    },
    { 
      name: 'Will Drafting & Execution', 
      icon: '📜', 
      desc: 'Structuring legally binding wills, appointing executors, and ensuring clean allocation to prevent litigation among family members.' 
    },
    { 
      name: 'HUF Asset Partitioning', 
      icon: '👨‍👩‍👧‍👦', 
      desc: 'Structuring partial or full partition of Hindu Undivided Family assets to optimize distribution and tax slabs.' 
    },
    { 
      name: 'Digital Asset Succession planning', 
      icon: '💻', 
      desc: 'Cataloging and securing digital portfolios, international stocks, crypto-assets, and online business holdings for clean transfers.' 
    }
  ]

  const problems = [
    { 
      title: 'Frozen Assets & Probate Delays', 
      desc: 'Leaving assets without designated nominees or a clear will leads to frozen bank accounts, property disputes, and expensive court probates.' 
    },
    { 
      title: 'Taxation on Inheritance Transfer', 
      desc: 'Failing to structure cross-border estates properly exposes beneficiaries to hefty inheritance and capital gains taxes in multiple jurisdictions.' 
    }
  ]

  const caseStudy = {
    quote: 'Setting up our family trust and drafting clear wills for our property and business interests gave us complete peace of mind. Fortune managed the legal complexity seamlessly.',
    client: 'Dinesh & Madhuri Singhal',
    details: 'Promoters, Singhal Logistics Group',
    outcome: '₹120Cr family estate secured'
  }

  const faqs = [
    { 
      q: 'What is the advantage of a Private Family Trust over a Will?', 
      a: 'A Will is only active after death and can be contested in court. A Private Family Trust is active immediately, keeps your estate plan private, and avoids court probates, while offering protection against business liabilities.' 
    },
    { 
      q: 'How are trust assets taxed in India?', 
      a: 'Depending on whether the trust is revocable or irrevocable, and determinate or indeterminate, taxes are levied either on the trust itself at the maximum marginal rate or on the individual beneficiaries. We structure the trust deed to optimize this tax liability.' 
    },
    { 
      q: 'Do you provide the legal registration services?', 
      a: 'Yes. We collaborate with legal experts to draft your Will or Trust deed, assist with stamp duty registration, and coordinate with trustees for ongoing accounts management.' 
    }
  ]

  return (
    <ServiceLandingPage
      title="Estate Planning & Wealth Succession"
      subtitle="Fiduciary Wealth Protection & Private Trusts"
      description="True wealth management looks beyond your lifetime. We help structure your assets to ensure your legacy is preserved and transferred according to your wishes."
      heroImage="https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?q=80&w=800"
      strategies={strategies}
      problems={problems}
      caseStudy={caseStudy}
      faqs={faqs}
    />
  )
}
