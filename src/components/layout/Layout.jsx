import { useEffect, useState } from 'react'
import { ArrowUpRight, GitFork, BriefcaseBusiness, Menu, X } from 'lucide-react'
import { navigation } from '../../data/navigation'
import { profile } from '../../data/profile'
import { TerminalConsole } from '../ui/TerminalConsole'

export function Seo({ title, description }) {
  useEffect(() => { document.title = `${title} — Ye Myint Htet`; document.querySelector('meta[name="description"]')?.setAttribute('content', description) }, [title, description])
  return null
}

export function Layout({ children }) {
  const [open, setOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')

  useEffect(() => {
    const sections = navigation.map(item => document.getElementById(item.id)).filter(Boolean)
    const observer = new IntersectionObserver(entries => {
      const current = entries.find(entry => entry.isIntersecting)
      if (current) setActiveSection(current.target.id)
    }, { rootMargin: '-28% 0px -58% 0px', threshold: 0 })
    sections.forEach(section => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  return <><header className="nav"><a className="brand" href="#top">YM<span>H</span><small>SOFTWARE ENGINEER</small></a><button className="menu-button" aria-label="Toggle navigation" onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button><nav className={open ? 'links links-open' : 'links'}>{navigation.map(item => <a key={item.id} className={activeSection === item.id ? 'active' : ''} aria-current={activeSection === item.id ? 'location' : undefined} href={`#${item.id}`} onClick={() => { setActiveSection(item.id); setOpen(false) }}>{item.label}</a>)}</nav></header><main>{children}</main><footer><div><span className="eyebrow">BUILDING WITH INTENT</span><h2>Let’s make something useful.</h2></div><div className="footer-meta"><a href={`mailto:${profile.email}`}>{profile.email}<ArrowUpRight size={15}/></a><span>© {new Date().getFullYear()} Ye Myint Htet</span></div></footer><TerminalConsole /></>
}

export function Socials() { return <div className="socials"><a aria-label="GitHub" href={profile.github} target="_blank" rel="noreferrer"><GitFork size={18}/></a><a aria-label="LinkedIn" href={profile.linkedin} target="_blank" rel="noreferrer"><BriefcaseBusiness size={18}/></a></div> }
export function Tag({ children }) { return <span className="tag">{children}</span> }
