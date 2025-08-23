import { projects } from '@/utils/seed'
import { useEffect, useState } from 'react'
import { listIssues } from '@/services/issueService'
import { Issue } from '@/utils/types'
import { Link } from 'react-router-dom'

export default function ProjectsPage() {
  const [firstIssues, setFirstIssues] = useState<Issue[] | null>(null)
  const [loading, setLoading] = useState(false)
  const [err, setErr] = useState<string | null>(null)

  /* eslint @typescript-eslint/no-explicit-any: 0 */
  useEffect(() => {
    (async () => {
      setLoading(true)
      setErr(null)
      try {
        const res = await listIssues({ projectId: 1, page: 1, pageSize: 5})
        setFirstIssues(res.items)
      } catch (e: any) {
        setErr(e?.message ?? String(e))
      } finally {
        setLoading(false)
      }
    })()
  }, [])

  return (
    <div className="p-4 space-y-3">
      <h1 className="text-xl font-bold">Projects</h1>
      <ul className="list-disc pl-6 space-y-1">
        {projects.map((p) => (
          <li key={p.id}>
            <Link className="underline" to={`/projects/${p.id}/issues`}>{ p.name }</Link>
          </li>
        ))}
      </ul>
      <hr className="my-4" />
      <h2 className="font-semibold">Quick Preview (Project #1 Issues)</h2>
      {loading && <p>Loading...</p>}
      {err && <p className="text-red-600">{ err }</p>}
      {!loading && !err && firstIssues && (
        <ul className="list-disc pl-6">
          {firstIssues.map((i) => (
            <li key={i.id}>{ i.title } <span className="text-sm text-slate-500">[{i.status}]</span></li>
          ))}
        </ul>
      )}
    </div>
  )
}
