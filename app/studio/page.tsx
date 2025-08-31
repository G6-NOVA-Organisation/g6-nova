'use client';
import { useState } from 'react';
import { BLOCKS, type Block } from '../../components/blocks/catalog';

function wrapAsDocument(inner: string) {
  const hasDoc = /<html[\s\S]*<\/html>/i.test(inner);
  if (hasDoc) return inner;
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<title>G6 Nova Prototype</title>
<script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="min-h-screen bg-gray-50 text-gray-900">${inner}</body>
</html>`;
}

const PRESETS = [
  { id: 'landing', label: 'Landing (navbar + hero + features + pricing + footer)',
    blocks: ['navbar-basic','hero-center','features-3col','pricing-3col','footer-simple'] },
  { id: 'simple-landing', label: 'Simple Landing (navbar + hero + footer)',
    blocks: ['navbar-basic','hero-center','footer-simple'] },
];

export default function StudioPage() {
  const [prompt, setPrompt] = useState('A clean landing page for G6 Nova with navbar, hero, features and pricing.');
  const [html, setHtml] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function generate() {
    setLoading(true); setError(null); setHtml(null);
    try {
      const res = await fetch('/api/ai/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || 'Generation failed');
      setHtml(data.html);
    } catch (e:any) {
      setError(e.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  }

  function downloadHtml() {
    if (!html) return;
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href = url; a.download = 'g6-nova-prototype.html'; a.click();
    URL.revokeObjectURL(url);
  }

  function addBlock(b: Block) {
    const current = html || '';
    const combined = current ? current.replace(/<\/body>[\s\S]*<\/html>\s*$/i, '') : '<main class="mx-auto max-w-6xl p-6 space-y-6">';
    const next = `${combined}\n${b.html}\n</main>\n</body>\n</html>`;
    setHtml(wrapAsDocument(next));
  }

  function usePreset(id: string) {
    const preset = PRESETS.find(p => p.id === id);
    if (!preset) return;
    const chosen = preset.blocks.map(bid => BLOCKS.find(b => b.id === bid)).filter(Boolean) as Block[];
    const inner = chosen.map(b => b.html).join('\n');
    setHtml(wrapAsDocument(`<main class="mx-auto max-w-6xl p-6 space-y-6">${inner}</main>`));
  }

  return (
    <main className="mx-auto max-w-7xl p-6 space-y-6">
      <header className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold">G6 Nova — AI Studio</h1>
        <div className="text-xs text-gray-600">/studio</div>
      </header>

      <section className="grid grid-cols-1 gap-4 lg:grid-cols-12">
        <div className="lg:col-span-5 space-y-4">
          <div className="rounded-2xl border bg-white p-4 shadow-sm">
            <label className="block text-sm font-medium">Describe what to build</label>
            <textarea
              className="mt-2 w-full resize-vertical rounded-lg border p-3 focus:outline-none focus:ring"
              rows={8}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="e.g., A dashboard with sidebar nav, stats cards, and a users table."
            />
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <button onClick={generate} disabled={loading} className="rounded-lg bg-black px-4 py-2 text-white disabled:opacity-50">
                {loading ? 'Generating…' : 'Generate'}
              </button>
              <button onClick={downloadHtml} disabled={!html} className="rounded-lg border px-4 py-2 disabled:opacity-50">
                Download HTML
              </button>
            </div>
            {error && <p className="mt-3 text-sm text-red-600">{error}</p>}
          </div>

          <div className="rounded-2xl border bg-white p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-medium">Presets</h2>
              <div className="text-xs text-gray-500">click to compose</div>
            </div>
            <div className="mt-3 space-y-2">
              {PRESETS.map(p => (
                <button key={p.id} onClick={() => usePreset(p.id)} className="w-full rounded-lg border px-3 py-2 text-left hover:bg-gray-50">
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border bg-white p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-medium">Block library</h2>
              <div className="text-xs text-gray-500">{BLOCKS.length} blocks</div>
            </div>
            <ul className="mt-3 grid gap-2 sm:grid-cols-2">
              {BLOCKS.map(b => (
                <li key={b.id} className="rounded-lg border p-3">
                  <div className="text-sm font-medium">{b.name}</div>
                  <button onClick={() => addBlock(b)} className="mt-2 w-full rounded-lg border px-3 py-1.5 text-sm hover:bg-gray-50">Add</button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="rounded-2xl border bg-white shadow-sm lg:col-span-7">
          <div className="flex items-center justify-between border-b p-3">
            <div className="text-sm font-medium">Live preview</div>
            <div className="text-xs text-gray-500">{html ? 'Generated/Composed' : 'Waiting for output'}</div>
          </div>
          <div className="h-[720px]">
            {html ? (
              <iframe title="Preview" className="h-full w-full" srcDoc={html} />
            ) : (
              <div className="flex h-full items-center justify-center text-sm text-gray-500">
                Nothing yet—click Generate or use a Preset/Block.
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
