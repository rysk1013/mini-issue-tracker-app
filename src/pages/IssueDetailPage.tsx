import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getIssue } from '@/services/issueService'
import type { Issue } from '@/utils/types'

export default function IssueDetailPage() {
  const { id } = useParams()
  const issueId = Number(id)

  const [issue, setIssue] = useState<Issue | null>(null)
  const [loading, setLoading] = useState(false)
  const [err, setErr] = useState<string | null>(null)

  /* eslint @typescript-eslint/no-explicit-any: 0 */
  useEffect(() => {
    let alive = true
    setLoading(true)
    setErr(null)
    getIssue(issueId)
      .then((i) => alive && setIssue(i))
      .catch((e: any) => alive && setErr(e?.message ?? String(e)))
      .finally(() => alive && setLoading(false))
    return () => { alive = false }
  }, [issueId])

  if (Number.isNaN(issueId)) return <div>Invalid Issue id</div>
  if (loading) return <div>Loading...</div>
  if (err) return <div className="text-red-600">{err}</div>
  if (!issue) return <div>Not found</div>

  return (
    <div className="space-y-3">
      <Link to={-1 as any} className="nuderline">← Back</Link>
      <h1 className="text-xl font-bold">{issue.title}</h1>
      <div className="text-sm text-gray-600">
        Status: {issue.status} / Priority: {issue.priority}
      </div>
      {issue.description && <p>{issue.description}</p>}
      <div className="text-sm text-gray-500">
        Updated: <time dateTime={issue.updatedAt}>{new Date(issue.updatedAt).toLocaleString()}</time>
      </div>
    </div>
  )
}
