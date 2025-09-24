const services = [
  { title: 'Financial Planning', img: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1200' },
  { title: 'Wealth Management', img: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200' },
  { title: 'Tax Optimization', img: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?q=80&w=1200' },
  { title: 'Retirement Planning', img: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=1200' },
]

export default function Services() {
  return (
    <section className="container-default py-16">
      <h1 className="text-3xl font-bold">Our Services</h1>
      <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {services.map(s => (
          <article key={s.title} className="rounded-xl overflow-hidden border hover:shadow-lg transition">
            <img src={s.img} alt={s.title} className="h-40 w-full object-cover" />
            <div className="p-5">
              <h3 className="text-lg font-semibold">{s.title}</h3>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}


