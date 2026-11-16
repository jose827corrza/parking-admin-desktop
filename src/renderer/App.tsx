import '@aws-amplify/ui-react/styles.css';
import React from 'react'
import { AppProps } from './types/types';

export function App({ user, signOut}: AppProps) {
  return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-6">
      <div className="max-w-md w-full rounded-xl bg-slate-900 border border-slate-800 p-6 shadow-lg">
        <h1 className="text-2xl font-bold text-emerald-400">Parking Admin</h1>
        <p className="mt-2 text-sm text-slate-400">
          Electron + React + TypeScript + Vite + Tailwind CSS
        </p>
      </div>
    </div>
  )
}
