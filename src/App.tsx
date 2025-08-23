import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Layout from '@/components/Layout'
import ProjectPage from '@/pages/ProjectsPage'
import IssuePage from '@/pages/IssuesPage'
import IssueDetailPage from '@/pages/IssueDetailPage'

function Placeholder({ title }: { title: string }) {
  return <div className="p-4 text-xl font-bold">{title}</div>
}

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Navigate to="/projects" replace />} />
          <Route path="/projects" element={<ProjectPage />} />
          <Route path="/projects/:id/issues" element={<IssuePage />} />
          <Route path="/issues/:id" element={<IssueDetailPage />} />
          <Route path="/board" element={<Placeholder title="BoardPage (仮) " />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}
