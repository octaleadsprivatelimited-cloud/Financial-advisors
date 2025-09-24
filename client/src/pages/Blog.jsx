export default function Blog() {
  return (
    <section className="container-default py-16">
      <h1 className="text-3xl font-bold">Insights & Articles</h1>
      <div className="mt-8 grid md:grid-cols-3 gap-6">
        {Array.from({length:6}).map((_,i)=> (
          <article key={i} className="rounded-xl border overflow-hidden hover:shadow-lg transition">
            <img src={`https://picsum.photos/seed/blog-${i}/600/400`} alt="Blog" className="h-40 w-full object-cover" />
            <div className="p-5">
              <h3 className="font-semibold">Market update #{i+1}</h3>
              <p className="text-gray-600 mt-2">Brief commentary on markets and planning tips.</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}


