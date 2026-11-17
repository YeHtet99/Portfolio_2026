import { Link } from 'react-router-dom'
import { Seo } from '../components/layout/Layout'
export default function NotFound() { return <section className="not-found"><Seo title="Not found" description="Page not found."/><span className="eyebrow">404 / LOST IN THE GRID</span><h1>Page not found.</h1><Link className="button" to="/">Return home</Link></section> }
