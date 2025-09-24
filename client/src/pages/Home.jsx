import Hero from '../components/Hero.jsx'

export default function Home() {
  return (
    <>
      <Hero />
      <section className="container-default py-16">
        <div className="grid md:grid-cols-3 gap-8">
          {[{t:'Holistic Planning',d:'End-to-end planning for every stage of life.'},{t:'Goal-Based Investing',d:'Aligned portfolios tailored to your goals.'},{t:'Risk Management',d:'Protect what matters with smart coverage.'}].map((c)=> (
            <div key={c.t} className="rounded-xl border p-6 hover:shadow-lg transition">
              <h3 className="text-xl font-semibold">{c.t}</h3>
              <p className="mt-2 text-gray-600">{c.d}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}


