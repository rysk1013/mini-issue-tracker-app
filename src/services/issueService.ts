import { issues, comments } from '@/utils/seed'
import { Issue, Comment } from '@/utils/types'
import { sleep, paginate } from '@/services/_helpers'

export async function listIssues(params: {
  projectId?: number
  q?: string
  status?: Issue['status']
  priority?: Issue['priority']
  page?: number
  pageSize?: number
}): Promise<{ items: Issue[]; total: number }> {
  // APIらしさのため遅延
  await sleep(150)

  let data = [...issues]

  if (params.projectId) {
    data = data.filter((i) => i.projectId === params.projectId)
  }
  if (params.q && params.q.trim()) {
    const q = params.q.trim().toLowerCase()
    data = data.filter(
      (i) =>
        i.title.toLowerCase().includes(q) ||
        i.labels.some((lab) => lab.toLowerCase().includes(q))
     )
  }
  if (params.status) {
    data = data.filter((i) => i.status === params.status)
  }
  if (params.priority) {
    data = data.filter((i) => i.priority === params.priority)
  }

  // 並びは updatedAt desc を想定（実務っぽい）
  data.sort((a, b) => (a.updatedAt < b.updatedAt ? 1 : -1))

  const page = params.page ?? 1
  const pageSize = params.pageSize ?? 10
  const total = data.length
  const items = paginate(data, page, pageSize)

  return { items, total }
}

export async function getIssue(id: number): Promise<Issue> {
  await sleep(120)
  const found = issues.find((i) => i.id === id)
  if (!found) throw new Error('Issue not found')
  return found
}

export async function updateIssue(input: Partial<Issue> & { id: number }): Promise<Issue> {
  await sleep(150)
  const idx = issues.findIndex((i) => i.id === input.id)
  if (idx < 0) throw new Error('Issue not found')

  const updated: Issue = {
    ...issues[idx],
    ...input,
    updatedAt: new Date().toISOString(),
  }
  issues[idx] = updated
  return updated
}

export async function listComment(issueId: number): Promise<Comment[]> {
  await sleep(100)
  return comments
    .filter((c) => c.issueId === issueId)
    .sort((a, b) => (a.createdAt > b.createdAt ? 1 : -1))
}

export async function addComment(input: Omit<Comment, 'id' | 'createdAt'>): Promise<Comment> {
  await sleep(100)
  const newc: Comment = {
    id: Math.floor(Math.random() * 10_000_000),
    createdAt: new Date().toISOString(),
    ...input
  }
  comments.push(newc)
  return newc
}
