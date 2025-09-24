export default function Pricing() {
  const tiers = [
    { name: 'Starter', price: 'Free consult', features: ['Initial plan review', '30-min call'] },
    { name: 'Growth', price: '$199/mo', features: ['Ongoing planning', 'Quarterly reviews', 'Tax tips'] },
    { name: 'Wealth', price: '$499/mo', features: ['Full wealth mgmt', 'Tax & estate coordination', 'Priority support'] },
  ]
  return (
    <section className="container-default py-16">
      <h1 className="text-3xl font-bold">Pricing</h1>
      <div className="mt-8 grid md:grid-cols-3 gap-6">
        {tiers.map(t => (
          <div key={t.name} className="rounded-2xl border p-6 hover:shadow-lg transition">
            <h3 className="text-xl font-semibold">{t.name}</h3>
            <p className="mt-2 text-3xl font-bold text-primary">{t.price}</p>
            <ul className="mt-4 space-y-2 text-gray-600">
              {t.features.map(f => <li key={f}>• {f}</li>)}
            </ul>
            <a href="/contact" className="btn-primary mt-6 w-full inline-flex">Get Started</a>
          </div>
        ))}
      </div>
    </section>
  )
}


