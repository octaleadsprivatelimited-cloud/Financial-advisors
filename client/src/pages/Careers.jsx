export default function Careers() {
  const roles = [
    { title: 'Financial Advisor', type: 'Full-time', location: 'Metropolis, NY' },
    { title: 'Client Success Manager', type: 'Full-time', location: 'Remote' },
  ]
  return (
    <section className="container-default py-16">
      <h1 className="text-3xl font-bold">Careers</h1>
      <p className="mt-4 text-gray-600">Join a mission-driven team helping clients achieve financial confidence.</p>
      <div className="mt-8 space-y-4">
        {roles.map(r => (
          <div key={r.title} className="rounded-xl border p-6 flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold">{r.title}</h3>
              <p className="text-gray-600">{r.type} · {r.location}</p>
            </div>
            <a href="/contact" className="btn-primary">Apply</a>
          </div>
        ))}
      </div>
    </section>
  )
}


