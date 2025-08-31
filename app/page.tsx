export default function Home() {
  return (
    <main className="mx-auto max-w-2xl p-8">
      <h1 className="text-3xl font-bold">G6 Nova</h1>
      <p className="mt-2">It works 🎉</p>
      <div className="mt-6 space-y-3 text-sm">
        <p><strong>Health check:</strong> <code>/api/health</code></p>
        <p><strong>Env placeholders:</strong> <code>NEXT_PUBLIC_SUPABASE_URL</code>, <code>NEXT_PUBLIC_SUPABASE_ANON_KEY</code></p>
      </div>
    </main>
  );
}
