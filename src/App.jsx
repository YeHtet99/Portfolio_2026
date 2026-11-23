import { lazy, Suspense, useState } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { Layout } from './components/layout/Layout'
import { BootSequence } from './components/ui/BootSequence'
import { ScrollToTop } from './components/ui/ScrollToTop'
import { shouldPlayBootSequence } from './lib/boot'

const Home = lazy(() => import('./pages/Home'))

export default function App() {
  const [booting, setBooting] = useState(shouldPlayBootSequence)
  return <><ScrollToTop/>{booting && <BootSequence onDone={() => setBooting(false)}/>}<Layout><Suspense fallback={<div className="loading"/>}><Routes><Route path="/" element={<Home/>}/><Route path="*" element={<Navigate to="/" replace/>}/></Routes></Suspense></Layout></>
}
