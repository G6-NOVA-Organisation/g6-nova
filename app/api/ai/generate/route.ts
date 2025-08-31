import { NextResponse } from 'next/server';

const SYS_PROMPT = `
You are an expert frontend generator. Return a **single complete HTML5 document** only.
Rules:
- Use Tailwind classes where reasonable (assume Tailwind is loaded globally).
- No external network calls, fonts, or images—use inline SVG or placeholder text.
- Keep CSS minimal (prefer utility classes). No <script> unless essential.
- Professional, clean, accessible.
`;

const STUB_HTML = (idea: string) => `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<title>G6 Nova Prototype</title>
<script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="min-h-screen bg-gray-50 text-gray-900">
  <header class="mx-auto max-w-6xl px-6 py-6">
    <h1 class="text-2xl font-bold">G6 Nova Prototype</h1>
    <p class="text-gray-600">Stub output (set OPENAI_API_KEY to enable real generations)</p>
  </header>
  <main class="mx-auto max-w-6xl px-6">
    <section class="rounded-2xl border bg-white p-8 shadow-sm">
      <h2 class="text-xl font-semibold">Your idea</h2>
      <p class="mt-2 text-gray-700">${idea.replace(/</g, '&lt;')}</p>
      <div class="mt-6 grid gap-4 sm:grid-cols-3">
        <div class="rounded-xl border p-4"><div class="h-24 rounded bg-gray-100"></div></div>
        <div class="rounded-xl border p-4"><div class="h-24 rounded bg-gray-100"></div></div>
        <div class="rounded-xl border p-4"><div class="h-24 rounded bg-gray-100"></div></div>
      </div>
      <button class="mt-6 rounded-lg bg-black px-4 py-2 text-white">Primary action</button>
    </section>
  </main>
</body>
</html>`;

export async function POST(req: Request) {
  const { prompt } = await req.json().catch(() => ({ prompt: '' }));
  const key = process.env.OPENAI_API_KEY;

  // No key? Return a nice stub so demos still work.
  if (!key) {
    return NextResponse.json({ html: STUB_HTML(prompt || 'Example: landing page with hero + pricing grid') });
  }

  try {
    // Basic Chat Completions call; adjust model as you like.
    const r = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${key}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        temperature: 0.7,
        messages: [
          { role: 'system', content: SYS_PROMPT },
          { role: 'user', content: `Build this as a polished HTML page:\n${prompt || 'Landing page with hero, features, pricing.'}` }
        ]
      })
    });

    const data = await r.json();
    if (!r.ok) {
      const msg = data?.error?.message || 'OpenAI error';
      return NextResponse.json({ error: msg }, { status: 500 });
    }

    // Try to find an HTML code block; otherwise use the whole message.
    const text: string = data.choices?.[0]?.message?.content || '';
    const match = text.match(/```html([\s\S]*?)```/i);
    const html = match ? match[1].trim() : text.trim();
    return NextResponse.json({ html });
  } catch (e:any) {
    return NextResponse.json({ error: e.message || 'Unexpected error' }, { status: 500 });
  }
}
