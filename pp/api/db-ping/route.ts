import { NextResponse } from 'next/server';
import { supabase } from '../../lib/supabase/client';

export async function GET() {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    return NextResponse.json({ ok: false, reason: 'Missing env vars' }, { status: 500 });
  }
  try {
    const { data, error } = await supabase.from('studio_generations').select('id').limit(1);
    return NextResponse.json({
      ok: !error,
      table: 'studio_generations',
      sampleCount: data?.length ?? 0,
      error: error?.message ?? null,
    }, { status: error ? 500 : 200 });
  } catch (e:any) {
    return NextResponse.json({ ok: false, error: String(e) }, { status: 500 });
  }
}
