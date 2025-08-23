import { Link, NavLink } from 'react-router-dom'
import { ReactNode } from 'react'

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen">
      <header
        style={{ borderBottom: "1px solid #e5e7eb" }}
        className="px-4 py-3 flex items-center gap-4"
      >
        <Link to="/" className="font-bold">Mini Issue Tracker</Link>
        <nav className="flex gap-3 text-sm">
          <Nav to="/projects">Projects</Nav>
          <Nav to="/board">Board</Nav>
        </nav>
      </header>
      <main className="p-4 max-w-5xl mx-auto">
        { children }
      </main>
    </div>
  )
}

function Nav({ to, children }: { to: string;  children: ReactNode }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        "px-2 py-1 rounded " + (isActive ? "bg-black text-white" : "hover:bg-gray-100")
      }
    >
      { children }
    </NavLink>
  )
}
