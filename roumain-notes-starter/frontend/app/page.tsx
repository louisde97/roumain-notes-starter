'use client';
import React, { useState } from 'react';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL;

export default function Home() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleUpload(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (!file) { setError('Choisis un fichier .docx ou .pptx'); return; }
    const fd = new FormData();
    fd.append('file', file);
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/upload`, { method: 'POST', body: fd });
      const json = await res.json();
      if (!res.ok || json.error) throw new Error(json.error || 'Erreur serveur');
      setResult(json);
    } catch (err:any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  const catsOrder = ['vocab','conjugaison','prononciation','grammaire','expression','orthographe','culture'];
  function catLabel(c:string){ 
    return {vocab:'Vocabulaire', conjugaison:'Conjugaison', prononciation:'Prononciation', grammaire:'Grammaire', expression:'Expressions', orthographe:'Orthographe', culture:'Culture'}[c] || c; 
  }

  return (
    <main className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Importer un cours (roumain)</h1>
      <form onSubmit={handleUpload} className="bg-white shadow rounded p-4 space-y-4">
        <input type="file" accept=".docx,.pptx" onChange={(e)=>setFile(e.target.files?.[0] || null)} className="block w-full" />
        <button disabled={loading} className="px-4 py-2 rounded bg-black text-white disabled:opacity-50">
          {loading ? 'Analyse en cours…' : 'Importer et analyser'}
        </button>
        {error && <p className="text-red-600">{error}</p>}
      </form>

      {result && (
        <section className="mt-8">
          <h2 className="text-xl font-semibold">Notions du jour — {result.title}</h2>
          {catsOrder.map((c)=>{
            const items = result.notions?.[c] || [];
            if (!items.length) return null;
            return (
              <div key={c} className="mt-4">
                <h3 className="font-semibold mb-2">{catLabel(c)}</h3>
                <ul className="space-y-1">
                  {items.map((it:any, idx:number)=>(
                    <li key={idx} className="bg-white border rounded px-3 py-2 flex items-center justify-between">
                      <span>{it.title}</span>
                      {it.is_revision && <span className="text-xs px-2 py-1 rounded bg-yellow-100 border border-yellow-300">Révision</span>}
                    </li>
                  ))}
                </ul>
              </div>
            )
          })}
        </section>
      )}
    </main>
  );
}
