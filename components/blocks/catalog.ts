export type Block = { id: string; name: string; html: string };

export const BLOCKS: Block[] = [
  {
    id: 'navbar-basic',
    name: 'Navbar (basic)',
    html: `<nav class="w-full border-b bg-white/60 backdrop-blur">
  <div class="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
    <div class="font-semibold">G6 Nova</div>
    <div class="hidden gap-6 text-sm sm:flex">
      <a href="#" class="text-gray-700 hover:text-black">Docs</a>
      <a href="#" class="text-gray-700 hover:text-black">Pricing</a>
      <a href="#" class="text-gray-700 hover:text-black">About</a>
    </div>
    <button class="rounded-lg bg-black px-3 py-1.5 text-white">Sign in</button>
  </div>
</nav>`
  },
  {
    id: 'hero-center',
    name: 'Hero (center)',
    html: `<section class="mx-auto max-w-6xl px-6 py-16">
  <div class="text-center">
    <span class="rounded-full border px-3 py-1 text-xs text-gray-600">Personal AI Developer</span>
    <h1 class="mt-4 text-4xl font-bold tracking-tight">Build apps from natural language</h1>
    <p class="mx-auto mt-3 max-w-2xl text-gray-600">Describe what you want—G6 Nova generates a working prototype in seconds, with Tailwind and modern patterns.</p>
    <div class="mt-6 flex items-center justify-center gap-3">
      <a class="rounded-lg bg-black px-4 py-2 text-white" href="#">Get started</a>
      <a class="rounded-lg border px-4 py-2" href="#">Live demo</a>
    </div>
  </div>
</section>`
  },
  {
    id: 'features-3col',
    name: 'Features (3 columns)',
    html: `<section class="mx-auto max-w-6xl px-6 py-12">
  <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
    <div class="rounded-2xl border bg-white p-6 shadow-sm">
      <h3 class="font-semibold">Zero‑code Studio</h3>
      <p class="mt-1 text-sm text-gray-600">Generate, preview, and export—no local setup required.</p>
    </div>
    <div class="rounded-2xl border bg-white p-6 shadow-sm">
      <h3 class="font-semibold">Blocks Library</h3>
      <p class="mt-1 text-sm text-gray-600">Compose from curated, accessible Tailwind blocks.</p>
    </div>
    <div class="rounded-2xl border bg-white p-6 shadow-sm">
      <h3 class="font-semibold">PR Flow</h3>
      <p class="mt-1 text-sm text-gray-600">Every change via Pull Request for safe iteration.</p>
    </div>
  </div>
</section>`
  },
  {
    id: 'pricing-3col',
    name: 'Pricing (3 columns)',
    html: `<section class="mx-auto max-w-6xl px-6 py-12">
  <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
    <div class="rounded-2xl border bg-white p-6 shadow-sm">
      <h3 class="text-lg font-semibold">Starter</h3>
      <p class="mt-1 text-gray-600">$0 — explore the Studio</p>
      <button class="mt-4 w-full rounded-lg border px-4 py-2">Choose</button>
    </div>
    <div class="rounded-2xl border bg-black p-6 text-white shadow-sm">
      <h3 class="text-lg font-semibold">Pro</h3>
      <p class="mt-1 text-gray-200">$19 — advanced blocks & PR bot</p>
      <button class="mt-4 w-full rounded-lg bg-white px-4 py-2 text-black">Choose</button>
    </div>
    <div class="rounded-2xl border bg-white p-6 shadow-sm">
      <h3 class="text-lg font-semibold">Team</h3>
      <p class="mt-1 text-gray-600">Custom — collab & governance</p>
      <button class="mt-4 w-full rounded-lg border px-4 py-2">Contact</button>
    </div>
  </div>
</section>`
  },
  {
    id: 'footer-simple',
    name: 'Footer (simple)',
    html: `<footer class="mt-12 w-full border-t bg-white/60 backdrop-blur">
  <div class="mx-auto max-w-6xl px-6 py-6 text-sm text-gray-600">
    © ${new Date().getFullYear()} G6 Nova. All rights reserved.
  </div>
</footer>`
  }
];
