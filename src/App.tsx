import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import ProjectPage from '@/pages/ProjectsPage'

function Placeholder({ title }: { title: string }) {
  return <div className="p-4 text-xl font-bold">{title}</div>
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/projects" replace />} />
        <Route path="/projects" element={<ProjectPage />} />
        <Route path="/projects/:id/issues" element={<Placeholder title="IssuesPage (仮)" />} />
        <Route path="/issues/:id" element={<Placeholder title="IssueDetailPage (仮)" />} />
        <Route path="/board" element={<Placeholder title="BoardPage (仮) " />} />
      </Routes>
    </BrowserRouter>
  )
}
