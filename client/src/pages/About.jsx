export default function About() {
  return (
    <section className="container-default py-16">
      <div className="grid lg:grid-cols-2 gap-10 items-center">
        <img src="https://images.unsplash.com/photo-1526948128573-703ee1aeb6fa?q=80&w=1400" alt="Team" className="w-full rounded-xl object-cover" />
        <div>
          <h1 className="text-3xl font-bold">About Financial advisors</h1>
          <p className="mt-4 text-gray-600">We are a team of experienced financial planners dedicated to empowering clients with strategies for long-term success.</p>
        </div>
      </div>
    </section>
  )
}


