import { useEffect, useMemo, useState } from 'react'
import { useParams, useSearchParams, Link } from 'react-router-dom'
import { listIssues } from '@/services/issueService'
import { Issue } from '@/utils/types'
import Button from '@/components/Button'

export default function IssuePage() {
  const { id } = useParams()
  const projectId = Number(id)
  const [sp, setSp] = useSearchParams()

  // URLクエリ（状態はURLに）
  const page = Number(sp.get('page') ?? 1)
  const q = sp.get('q') ?? ''
  const status = sp.get('status') ?? ''
  const pageSize = 10

  const [data, setData] = useState<Issue[]>([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(false)
  const [err, setErr] = useState<string | null>(null)

  // API呼び出し
  /* eslint @typescript-eslint/no-explicit-any: 0 */
  useEffect(() => {
    let alive = true
    setLoading(true)
    setErr(null)

    listIssues({
      projectId,
      q,
      status: status as any,
      page,
      pageSize,
    })
      .then((res) => {
        if (!alive) return
        setData(res.items)
        setTotal(res.total)
      })
      .catch((e: any) => {
        if (!alive) return
        setErr(e?.message ?? String(e))
      })
      .finally(() => alive && setLoading(false))

    return () => {
      alive = false
    }
  }, [projectId, q, status, page])

  const canPrev = page > 1
  const canNext = page * pageSize < total

  // 件数表示
  const rangeLabel = useMemo(() => {
    const start = (page - 1) * pageSize + 1
    const end = Math.min(page * pageSize, total)
    return total > 0 ? `${start}-${end} / ${total}` : '0 / 0 '
  }, [page, pageSize, total])

  return (
    <div className="space-y-3">
      <h1 className="text-xl font-bold">
        Issues (Project #{projectId})
      </h1>

      {/* 検索・フィルタ */}
      <div className="flex gap-2 items-center">
        <input
          placeholder="Search title or labels..."
          value={q}
          onChange={(e) => setSp({ page: "1", q: e.target.value, status })}
          className="border px-2 py-1 rounded"
        />
        <select
          value={status}
          onChange={(e) => setSp({ page: "1", q, status: e.target.value })}
          className="border px-2 py-1 rounded"
        >
          <option value="">All</option>
          <option value="backlog">Backlog</option>
          <option value="in_progress">In Progress</option>
          <option value="done">Done</option>
        </select>
        <Button variant="secondary" onClick={() => setSp({ page: "1", q: "", status: ""})}>
          Clear
        </Button>
        <span className="text-sm text-gray-500 ml-auto">{ rangeLabel }</span>
      </div>

      {/* 結果テーブル */ }
      {loading && <div>Loading...</div>}
      {err && <div className="text-red-600">{err}</div>}
      {!loading && !err && (
        <table className="w-full" style={{ borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ borderBottom: "1px solid #e5e7eb" }}>
              <th className="p-2 text-left">Title</th>
              <th className="p-2 text-left">Status</th>
              <th className="p-2 text-left">Priority</th>
              <th className="p-2 text-left">Updated</th>
            </tr>
          </thead>
          <tbody>
            {data.map((i) => (
              <tr key={i.id} style={{ borderTop: "1px solid #e5e7eb" }}>
                <td className="p-2">
                  <Link to={`/issues/${i.id}`} className="underline">
                    {i.title}
                  </Link>
                </td>
                <td className="p-2">{ i.status }</td>
                <td className="p-2">{ i.priority }</td>
                <td className="p-2">
                  <time dateTime={i.updatedAt}>
                    {new Date(i.updatedAt).toLocaleString()}
                  </time>
                </td>
              </tr>
            ))}
            {data.length === 0 && (
              <tr>
                <td className="p-2 text-gray-500" colSpan={4}>
                  No results
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}

      {/* ページャー */}
      <div className="flex gap-2 items-center">
        <button
          onClick={() => setSp({ page: String(page - 1), q, status })}
          disabled={!canPrev}
          className="px-2 py-1 border rounded disabled:opacity-50"
        >
          Prev
        </button>
        <span>Page {page}</span>
        <button
          onClick={() => setSp({ page: String(page + 1), q, status })}
          disabled={!canNext}
          className="px-2 py-1 border rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  )
}
