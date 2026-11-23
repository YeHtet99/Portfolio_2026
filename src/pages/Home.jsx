import { useEffect, useRef, useState } from 'react'
import { ArrowUpRight } from 'lucide-react'
import gsap from 'gsap'
import Lenis from 'lenis'
import { caseStudies, projects } from '../data/projects'
import { experience } from '../data/experience'
import { skillGroups } from '../data/skills'
import { profile } from '../data/profile'
import { Seo, Socials, Tag } from '../components/layout/Layout'
import { ProjectVisual } from '../components/projects/ProjectVisual'
import { Reveal } from '../components/ui/Reveal'

export default function Home() {
  const hero = useRef(null)
  const [selectedProject, setSelectedProject] = useState('nxstart')

  useEffect(() => {
    let ctx
    const revealHero = () => {
      ctx = gsap.context(() => gsap.from('.hero-reveal', {
        y: 46, opacity: 0, duration: .85, stagger: .1, delay: .04, ease: 'power3.out',
      }), hero)
    }
    if (document.documentElement.classList.contains('is-booting')) window.addEventListener('portfolio:booted', revealHero, { once: true })
    else revealHero()
    const lenis = new Lenis({ smoothWheel: true, lerp: .09 })
    let frame
    const raf = time => { lenis.raf(time); frame = requestAnimationFrame(raf) }
    frame = requestAnimationFrame(raf)
    return () => { window.removeEventListener('portfolio:booted', revealHero); ctx?.revert(); cancelAnimationFrame(frame); lenis.destroy() }
  }, [])

  const selectedCaseStudy = caseStudies[selectedProject]

  return <>
    <Seo title="Software Engineer" description="Ye Myint Htet — Software Engineer building ESG, emissions reporting, and HR management products."/>
    <section className="hero" id="top" ref={hero}>
      <div className="grid-bg"/>
      <div className="hero-copy">
        <p className="eyebrow hero-reveal">YE MYINT HTET <span>—</span> SOFTWARE ENGINEER</p>
        <h1><span className="hero-reveal">Building clarity</span><span className="hero-reveal italic">for complex</span><span className="hero-reveal">systems.</span></h1>
        <p className="hero-summary hero-reveal">Software Engineer <i/> React.js, Node.js, Express.js & MongoDB</p>
        <div className="hero-actions hero-reveal"><a className="button" href="#work">Explore My Work</a></div>
        <div className="hero-socials hero-reveal"><span>CONNECT</span><Socials/></div>
      </div>
      <div className="hero-image-wrap hero-reveal"><div className="portrait-glow"/><figure className="portrait-panel"><div className="portrait-frame"><img src="/images/profile.png" alt="Ye Myint Htet in a suit" className="portrait"/></div><figcaption><span>PORTRAIT / 01</span><span>MANDALAY, MM</span></figcaption></figure></div>
    </section>

    <section className="intro section" id="overview"><Reveal><span className="eyebrow">THE PRACTICE</span><div className="intro-layout"><h2>I turn complicated<br/><i>work into clear tools.</i></h2><div><p className="lead">I build product systems that make ESG reporting, emissions data, and people operations easier to understand and act on.</p><a className="text-link" href="#about">More about my approach <ArrowUpRight size={16}/></a></div></div></Reveal></section>

    <section className="section projects-preview" id="work">
      <Reveal><div className="section-heading"><span className="eyebrow">SELECTED WORK</span><p className="section-note">Three product systems, one focus: reliable workflows.</p></div></Reveal>
      <div className="project-list">{projects.map((project, index) => <Reveal key={project.slug} delay={index * .06}><button className={`project-row project-row-button ${selectedProject === project.slug ? 'is-selected' : ''}`} type="button" aria-pressed={selectedProject === project.slug} onClick={() => setSelectedProject(project.slug)}><ProjectVisual project={project}/><div className="project-row-copy"><span className="eyebrow">{project.type}</span><h3>{project.name}</h3><p>{project.eyebrow}</p></div><span className="row-action">{selectedProject === project.slug ? 'OPEN' : 'VIEW'}</span></button></Reveal>)}</div>
      <ProjectBrief study={selectedCaseStudy} project={projects.find(project => project.slug === selectedProject)}/>
    </section>

    <section className="section experience-tease" id="experience"><Reveal><div className="section-heading"><span className="eyebrow">EXPERIENCE</span><p className="section-note">Product work across ESG, carbon, and HR systems.</p></div><div className="experience-timeline">{experience.map(item => <article key={item.id}><span className="experience-period">{item.period}</span><div className="experience-detail"><h3>{item.role} <span>· {item.company}</span></h3><p className="experience-overview">{item.homeImpact}</p><div className="experience-tags">{item.technologies.slice(0, 5).map(technology => <Tag key={technology}>{technology}</Tag>)}</div></div></article>)}</div></Reveal></section>

    <section className="section single-about" id="about"><Reveal><span className="eyebrow">ABOUT</span><div className="about-grid"><img className="about-image" src="/images/profile.png" alt="Ye Myint Htet"/><div><h2>Systems thinker.<br/><i>Product builder.</i></h2><p className="lead">I’m Ye Myint Htet, a Software Engineer based in Mandalay, Myanmar. I build product systems across interfaces, APIs, data models, and reporting workflows.</p><p className="about-copy">My work spans ESG platforms, carbon emissions reporting, and HR management applications. I approach complex workflows by making states visible and building the smallest robust system that serves them.</p><dl className="about-facts"><div><dt>EDUCATION</dt><dd>Bachelor’s Degree in Information Technology<br/><span>Technology University Mandalay</span></dd></div><div><dt>LANGUAGES</dt><dd>Burmese · English · Japanese</dd></div></dl></div></div></Reveal></section>

    <section className="section capabilities" id="skills"><Reveal><div className="section-heading"><span className="eyebrow">CAPABILITIES</span><p className="section-note">Thoughtful engineering, from interface to data.</p></div><div className="skills-list single-page-skills">{skillGroups.map((group, index) => <article key={group.title}><span>0{index + 1}</span><div><h2>{group.title}</h2><p>{group.canBuild}</p></div><div><span className="eyebrow">TECHNOLOGIES</span><div className="tags">{group.technologies.map(item => <Tag key={item}>{item}</Tag>)}</div></div><div><span className="eyebrow">IN PRACTICE</span><p>{group.examples.join(' · ')}</p></div></article>)}</div></Reveal></section>

    <section className="contact-hero" id="contact"><span className="eyebrow">CONTACT</span><h1>Have a meaningful<br/><i>problem to solve?</i></h1><p className="lead">I’m always interested in product work where thoughtful engineering can make a difference.</p><a className="email-link" href={`mailto:${profile.email}`}>{profile.email}<ArrowUpRight/></a></section>
  </>
}

function ProjectBrief({ study, project }) {
  return <Reveal><article className="project-brief" aria-live="polite"><div><span className="eyebrow">PROJECT BRIEF</span><h2>{study.title || project.name}</h2><p className="project-brief-summary">{study.summary}</p></div><div className="project-brief-details"><div><span className="eyebrow">ROLE / SCOPE</span><p><strong>{study.role}</strong><br/>{study.scope}</p></div><div><span className="eyebrow">CONTRIBUTION</span><p>{study.contribution}</p></div><div><span className="eyebrow">OUTCOME</span><p>{study.outcome}</p></div><div className="project-brief-stack"><span className="eyebrow">STACK</span><div className="tags">{project.stack.slice(0, 7).map(item => <Tag key={item}>{item}</Tag>)}</div></div></div></article></Reveal>
}
