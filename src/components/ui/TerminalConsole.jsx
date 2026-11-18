import { useEffect, useRef, useState } from 'react'

const commandResponses = {
  help: { label: 'COMMAND INDEX', lines: ['about  - profile summary and engineering focus', 'experience  - professional roles and contributions', 'projects  - selected product work', 'skills  - engineering capabilities', 'contact  - direct contact channels', 'resume  - download resume', 'clear  - clear the console'] },
  about: { label: 'PROFILE', lines: ['YE MYINT HTET', 'Software Engineer | Mandalay, Myanmar', '4+ years building ESG, carbon reporting, and HR management products.', 'Focus: Building data-rich product systems with React, Node.js, Express.js, MongoDB, and Redis.'] },
  experience: { label: 'EXPERIENCE', items: [['01', 'Software Engineer', 'Evercomm Singapore | Nov 2025 - Present', 'ESG dashboards, reporting workflows, Redis, and MongoDB.'], ['02', 'Mid-Level Full Stack Developer', 'Evercomm Singapore | Sep 2023 - Oct 2025', 'Carbon emissions, CO2e services, and Excel workflows.'], ['03', 'Junior Frontend Developer', 'Kumo Solutions | Jul 2022 - Aug 2023', 'HR workflows, React forms, reporting, and exports.']] },
  projects: { label: 'SELECTED WORK', items: [['NXStart', 'ESG data management and reporting'], ['NXMap', 'Carbon emissions management'], ['Alliance', 'HR management system']] },
  skills: { label: 'CAPABILITIES', lines: ['FRONTEND  React | JavaScript | TypeScript | Tailwind CSS | MobX', 'BACKEND   Node.js | Express.js | REST APIs | Validation', 'DATA      MongoDB | Mongoose | Aggregation | Redis', 'DELIVERY  GitHub Actions | Azure Pipelines | GitHub | GitLab | Azure DevOps'] },
  contact: { label: 'CONTACT', lines: ['Email     yemyinthtet99999@gmail.com', 'GitHub    github.com/YeHtet99', 'LinkedIn  linkedin.com/in/ye-myint-htet-73a88122a'] },
}

export function TerminalConsole() {
  const inputRef = useRef(null)
  const outputRef = useRef(null)
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState('')
  const [entries, setEntries] = useState([{ type: 'system', text: 'Console ready. Type help to inspect the portfolio.' }])
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
  useEffect(() => { outputRef.current?.scrollTo?.({ top: outputRef.current.scrollHeight, behavior: 'smooth' }) }, [entries])

  const runCommand = event => {
    event.preventDefault()
    const command = input.trim().toLowerCase()
    if (!command) return
    setInput('')
    if (command === 'clear') { setEntries([]); return }
    if (command === 'resume') { setEntries(previous => [...previous, { type: 'command', text: command }, { type: 'system', text: 'Opening resume...' }]); window.location.assign('/resume.pdf'); return }
    const response = commandResponses[command]
    setEntries(previous => [...previous, { type: 'command', text: command }, response ? { type: 'response', response } : { type: 'system', text: `Command not found: ${command}. Type help.` }])
  }

  return <div className="terminal-dock"><button className="terminal-trigger" type="button" aria-label="Open command console" aria-expanded={open} onClick={() => setOpen(true)}><span aria-hidden="true">&gt;_</span><span className="terminal-tooltip">Open terminal</span></button>{showHint && !open && <span className="terminal-hint">OPEN TERMINAL <b>&gt;_</b></span>}{open && <section className="terminal-panel" role="dialog" aria-label="Portfolio command console"><header><span><i/> COMMAND CONSOLE</span><button type="button" aria-label="Close command console" onClick={() => setOpen(false)}>x</button></header><div className="terminal-output" ref={outputRef} aria-live="polite">{entries.map((entry, index) => <TerminalEntry entry={entry} key={`${entry.type}-${index}`}/>)}</div><form onSubmit={runCommand}><label htmlFor="terminal-input">&gt;</label><input ref={inputRef} id="terminal-input" value={input} onChange={event => setInput(event.target.value)} placeholder="type a command" autoComplete="off"/><kbd>ENTER</kbd></form></section>}</div>
}

function TerminalEntry({ entry }) {
  if (entry.type === 'command') return <p className="terminal-command">&gt; {entry.text}</p>
  if (entry.type === 'system') return <p className="terminal-system">{entry.text}</p>
  const { label, lines, items } = entry.response
  return <section className="terminal-block"><span>{label}</span>{lines?.map((line, index) => <p className={index === 0 && label === 'PROFILE' ? 'terminal-identity' : ''} key={line}>{line}</p>)}{items?.map(([title, detail, meta, description]) => <div className="terminal-item" key={title}><b>{title}</b><div><strong>{detail}</strong>{meta && <small>{meta}</small>}{description && <p>{description}</p>}</div></div>)}</section>
}
