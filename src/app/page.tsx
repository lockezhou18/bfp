export default function Home() {
  return (
    <main className="min-h-screen font-sans">
      {/* 1) HEAD / HERO */}
      <section id="head" className="bg-gradient-to-b from-neutral-100 to-white dark:from-neutral-900 dark:to-black">
        <div className="mx-auto max-w-6xl px-6 py-24">
          <div className="flex flex-col items-start gap-6">
            <span className="inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium text-neutral-600 dark:text-neutral-300">
              Fixed 8% interest, daily accrual
            </span>
            <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
              Invest in Real Estate at Scale
            </h1>
            <p className="max-w-2xl text-neutral-600 dark:text-neutral-300">
              A simple, stable, low-friction savings-style account backed by diversified real estate investments.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <a href="#contact" className="inline-flex items-center justify-center rounded-md bg-black px-5 py-3 text-white hover:bg-neutral-800 dark:bg-white dark:text-black dark:hover:bg-neutral-200">
                Contact us
              </a>
              <a href="#services" className="inline-flex items-center justify-center rounded-md border px-5 py-3 hover:bg-neutral-100 dark:hover:bg-neutral-800">
                Learn more
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 2) SERVICES */}
      <section id="services" className="border-t">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <h2 className="mb-6 text-2xl font-semibold">Our Services</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-lg border p-6">
              <h3 className="mb-2 font-medium">8% Fixed Savings Account</h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-300">
                Fixed 8% APY, no fees, no lock-up. Interest accrues daily at midnight based on your current balance.
              </p>
            </div>
            <div className="rounded-lg border p-6">
              <h3 className="mb-2 font-medium">Investment Focus</h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-300">
                Income-producing US residential rentals and select multifamily developments with prudent leverage.
              </p>
            </div>
            <div className="rounded-lg border p-6">
              <h3 className="mb-2 font-medium">Who It’s For</h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-300">
                Savers seeking stable yield. Withdraw anytime or sweep monthly interest to your personal account.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3) CASE STUDY */}
      <section id="case-study" className="border-t bg-neutral-50 dark:bg-neutral-950">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <h2 className="mb-6 text-2xl font-semibold">Case Studies</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-lg border bg-white p-6 dark:bg-black">
              <h3 className="mb-1 font-medium">Townhouse — Bay Area</h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-300">
                New build 2021. Purchase $1.45M. Positive cash flow and ~30% appreciation over 3 years.
              </p>
            </div>
            <div className="rounded-lg border bg-white p-6 dark:bg-black">
              <h3 className="mb-1 font-medium">Townhouse — Bay Area</h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-300">
                Purchased 2017 at $845k and exited 2022 at $1.29M. Strong IRR via appreciation.
              </p>
            </div>
            <div className="rounded-lg border bg-white p-6 dark:bg-black">
              <h3 className="mb-1 font-medium">Condo — Toronto</h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-300">
                Downtown positive-cash-flow rental with low vacancy. Long-term value growth.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4) CONTACT */}
      <section id="contact" className="border-t">
        <div className="mx-auto max-w-3xl px-6 py-16">
          <h2 className="mb-6 text-2xl font-semibold">Contact Us</h2>
          <p className="mb-4 text-neutral-600 dark:text-neutral-300">
            Have questions or want to open an account? Send a message and we’ll get back within 1–2 business days.
          </p>
          <form className="grid gap-4" onSubmit={(e) => e.preventDefault()}>
            <div className="grid gap-2">
              <label htmlFor="name" className="text-sm font-medium">Name</label>
              <input id="name" name="name" className="rounded-md border px-3 py-2 outline-none focus:ring-2 focus:ring-black dark:focus:ring-white bg-white dark:bg-black" placeholder="Your name" />
            </div>
            <div className="grid gap-2">
              <label htmlFor="email" className="text-sm font-medium">Email</label>
              <input id="email" name="email" type="email" className="rounded-md border px-3 py-2 outline-none focus:ring-2 focus:ring-black dark:focus:ring-white bg-white dark:bg-black" placeholder="you@example.com" />
            </div>
            <div className="grid gap-2">
              <label htmlFor="message" className="text-sm font-medium">Message</label>
              <textarea id="message" name="message" rows={4} className="rounded-md border px-3 py-2 outline-none focus:ring-2 focus:ring-black dark:focus:ring-white bg-white dark:bg-black" placeholder="Tell us a bit about your goals" />
            </div>
            <div className="flex items-center gap-3">
              <button className="inline-flex items-center justify-center rounded-md bg-black px-5 py-3 text-white hover:bg-neutral-800 dark:bg-white dark:text-black dark:hover:bg-neutral-200">
                Send
              </button>
              <a href="mailto:hello@stairwayinvest.com" className="text-sm underline underline-offset-4">Or email hello@stairwayinvest.com</a>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}
