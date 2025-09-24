import { useState } from 'react'

const faqs = [
  { q: 'What services do you offer?', a: 'Comprehensive planning, wealth management, tax, retirement, insurance, and more.' },
  { q: 'How do you charge?', a: 'Transparent tiered pricing with no hidden fees.' },
  { q: 'Do you offer virtual meetings?', a: 'Yes, we meet in-person or virtually based on your preference.' },
]

export default function FAQ() {
  const [open, setOpen] = useState(0)
  return (
    <section className="container-default py-16">
      <h1 className="text-3xl font-bold">Frequently Asked Questions</h1>
      <div className="mt-8 divide-y border rounded-xl bg-white">
        {faqs.map((f, i) => (
          <div key={f.q}>
            <button className="w-full text-left p-5 font-medium flex justify-between items-center" onClick={() => setOpen(open === i ? -1 : i)}>
              {f.q}
              <span>{open === i ? '-' : '+'}</span>
            </button>
            {open === i && <p className="px-5 pb-5 text-gray-600">{f.a}</p>}
          </div>
        ))}
      </div>
    </section>
  )
}


