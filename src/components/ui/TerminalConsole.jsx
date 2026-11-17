import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const commands = {
  help: 'Available: about, experience, projects, skills, contact, resume, clear',
  about: '/about', experience: '/experience', projects: '/projects', skills: '/skills', contact: '/contact',
}

export function TerminalConsole() {
  const navigate = useNavigate()
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
    if (commands[command]?.startsWith('/')) { setLines(previous => [...previous, `Navigating to ${command}…`]); navigate(commands[command]); setOpen(false); return }
    setLines(previous => [...previous, commands[command] || `Command not found: ${command}. Type “help”.`])
  }

  return <div className="terminal-dock"><button className="terminal-trigger" type="button" aria-label="Open command console" aria-expanded={open} onClick={() => setOpen(true)}><span aria-hidden="true">&gt;_</span><span className="terminal-tooltip">Open terminal</span></button>{showHint && !open && <span className="terminal-hint">OPEN TERMINAL <b>&gt;_</b></span>}{open && <section className="terminal-panel" role="dialog" aria-label="Portfolio command console"><header><span><i/> COMMAND CONSOLE</span><button type="button" aria-label="Close command console" onClick={() => setOpen(false)}>×</button></header><div className="terminal-output" aria-live="polite">{lines.map((line, index) => <p key={`${line}-${index}`}>{line}</p>)}</div><form onSubmit={runCommand}><label htmlFor="terminal-input">&gt;</label><input ref={inputRef} id="terminal-input" value={input} onChange={event => setInput(event.target.value)} placeholder="type a command" autoComplete="off"/><kbd>ENTER</kbd></form></section>}</div>
}
