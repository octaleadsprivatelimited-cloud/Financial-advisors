export default function Testimonials() {
  const items = [
    { name:'Ava M.', text:'Their guidance transformed my savings into a clear plan.' },
    { name:'Noah R.', text:'Transparent, proactive, and incredibly knowledgeable.' },
    { name:'Liam S.', text:'I finally feel in control of my retirement path.' },
  ]
  return (
    <section className="container-default py-16">
      <h1 className="text-3xl font-bold">What Clients Say</h1>
      <div className="mt-8 grid md:grid-cols-3 gap-6">
        {items.map(t => (
          <blockquote key={t.name} className="rounded-xl border p-6 bg-white">
            <p className="text-gray-700">“{t.text}”</p>
            <footer className="mt-4 font-medium">— {t.name}</footer>
          </blockquote>
        ))}
      </div>
    </section>
  )
}


