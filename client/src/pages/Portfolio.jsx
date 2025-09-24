export default function Portfolio() {
  return (
    <section className="container-default py-16">
      <h1 className="text-3xl font-bold">Portfolio & Case Studies</h1>
      <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <img key={i} className="rounded-xl object-cover w-full h-56" src={`https://picsum.photos/seed/finance-${i}/600/400`} alt="Work" />
        ))}
      </div>
    </section>
  )
}


