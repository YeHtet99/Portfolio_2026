import { useEffect, useRef, useState } from 'react'
const commandResponses = {
  help: ['Available commands:', 'about · experience · projects · skills · contact · resume · clear'],
  about: ['YE MYINT HTET', 'Software Engineer · Mandalay, Myanmar', '4+ years building ESG, carbon reporting, and HR management products.', 'Focus: Building data-rich product systems with React, Node.js, Express.js, MongoDB, and Redis.'],
  experience: ['01  Software Engineer · Evercomm Singapore · Nov 2025 — Present', '    ESG dashboards, reporting workflows, Redis, and MongoDB.', '02  Mid-Level Full Stack Developer · Evercomm Singapore · Sep 2023 — Oct 2025', '    Carbon emissions, CO2e services, and Excel workflows.', '03  Junior Frontend Developer · Kumo Solutions · Jul 2022 — Aug 2023', '    HR workflows, React forms, reporting, and exports.'],
  projects: ['NXStart   ESG data management & reporting', 'NXMap     Carbon emissions management', 'Alliance  HR management system'],
  skills: ['FRONTEND  React · JavaScript · TypeScript · Tailwind CSS · MobX', 'BACKEND   Node.js · Express.js · REST APIs · Validation', 'DATA      MongoDB · Mongoose · Aggregation · Redis', 'DELIVERY  GitHub Actions · Azure Pipelines · GitHub · GitLab · Azure DevOps'],
  contact: ['Email     yemyinthtet99999@gmail.com', 'GitHub    github.com/YeHtet99', 'LinkedIn  linkedin.com/in/ye-myint-htet-73a88122a'],
}

export function TerminalConsole() {
  const inputRef = useRef(null)
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState('')
  const [lines, setLines] = useState(['Command console ready. Type “help” to navigate.'])
  const [showHint, setShowHint] = useState(() => sessionStorage.getItem('terminal-hint-seen') !== 'true')

  useEffect(() => {
    if (!showHint) return undefined
    sessionStorage.setItem('terminal-hint-seen', 'true')
    const timer = window.setTimeout(() => setShowHint(false), 3600)
    return () => window.clearTimeout(timer)
  }, [showHint])

  useEffect(() => {
    const onKeyDown = event => { if (event.key === 'Escape') setOpen(false) }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  useEffect(() => { if (open) inputRef.current?.focus() }, [open])

  const runCommand = event => {
    event.preventDefault()
    const command = input.trim().toLowerCase()
    if (!command) return
    setInput('')
    if (command === 'clear') { setLines([]); return }
    setLines(previous => [...previous, `> ${command}`])
    if (command === 'resume') { setLines(previous => [...previous, 'Opening résumé…']); window.location.assign('/resume.pdf'); return }
    setLines(previous => [...previous, ...(commandResponses[command] || [`Command not found: ${command}. Type “help”.`])])
  }

  return <div className="terminal-dock"><button className="terminal-trigger" type="button" aria-label="Open command console" aria-expanded={open} onClick={() => setOpen(true)}><span aria-hidden="true">&gt;_</span><span className="terminal-tooltip">Open terminal</span></button>{showHint && !open && <span className="terminal-hint">OPEN TERMINAL <b>&gt;_</b></span>}{open && <section className="terminal-panel" role="dialog" aria-label="Portfolio command console"><header><span><i/> COMMAND CONSOLE</span><button type="button" aria-label="Close command console" onClick={() => setOpen(false)}>×</button></header><div className="terminal-output" aria-live="polite">{lines.map((line, index) => <p key={`${line}-${index}`}>{line}</p>)}</div><form onSubmit={runCommand}><label htmlFor="terminal-input">&gt;</label><input ref={inputRef} id="terminal-input" value={input} onChange={event => setInput(event.target.value)} placeholder="type a command" autoComplete="off"/><kbd>ENTER</kbd></form></section>}</div>
}
