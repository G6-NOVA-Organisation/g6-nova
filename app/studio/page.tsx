'use client';

import { useState } from 'react';

export default function StudioPage() {
  const [prompt, setPrompt] = useState('A clean product landing page with a top navbar, hero section, and pricing grid.');
  const [html, setHtml] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function generate() {
    setLoading(true);
    setError(null);
    setHtml(null);
    try {
      const res = await fetch('/api/ai/generate', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
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
    const a = document.createElement('a');
    a.href = url;
    a.download = 'g6-nova-prototype.html';
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <main className="mx-auto max-w-6xl p-6 space-y-6">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">G6 Nova — AI Studio</h1>
        <div className="text-sm text-gray-600">/studio</div>
      </header>

      <section className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div className="rounded-2xl border bg-white p-4 shadow-sm">
          <label className="block text-sm font-medium">Describe what to build</label>
          <textarea
            className="mt-2 w-full resize-vertical rounded-lg border p-3 focus:outline-none focus:ring"
            rows={8}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="e.g., A dashboard with sidebar nav, stats cards, and a users table."
          />
          <div className="mt-3 flex items-center gap-2">
            <button
              onClick={generate}
              disabled={loading}
              className="rounded-lg bg-black px-4 py-2 text-white disabled:opacity-50"
            >
              {loading ? 'Generating…' : 'Generate'}
            </button>
            <button
              onClick={downloadHtml}
              disabled={!html}
              className="rounded-lg border px-4 py-2 disabled:opacity-50"
            >
              Download HTML
            </button>
          </div>
          {error && <p className="mt-3 text-sm text-red-600">{error}</p>}
          <p className="mt-3 text-xs text-gray-500">
            Tip: this MVP outputs **plain HTML** so we can live preview instantly. We’ll add React + components next.
          </p>
        </div>

        <div className="rounded-2xl border bg-white shadow-sm">
          <div className="flex items-center justify-between border-b p-3">
            <div className="text-sm font-medium">Live preview</div>
            <div className="text-xs text-gray-500">{html ? 'Generated' : 'Waiting for output'}</div>
          </div>
          <div className="h-[620px]">
            {html ? (
              <iframe title="Preview" className="h-full w-full" srcDoc={html} />
            ) : (
              <div className="flex h-full items-center justify-center text-sm text-gray-500">
                Nothing yet—click Generate.
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
