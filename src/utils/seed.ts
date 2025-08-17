import type { Issue, Project, Comment } from './types'

const iso = (d = new Date()) => d.toISOString()

export const projects: Project[] = [
  { id: 1, name: 'Alpha' },
  { id: 2, name: 'Beta' },
  { id: 3, name: 'Gamma' },
]

export const issues: Issue[] = [
  {
    id: 101,
    projectId: 1,
    title: 'ログイン処理のバリデーション強化',
    status: 'backlog',
    priority: 'med',
    labels: ['auth', 'validation'],
    description: 'Zod でサーバ/クライアントの整合性を取る',
    updatedAt: iso(),
  },
  {
    id: 102,
    projectId: 1,
    title: 'プロフィール画像アップロード',
    status: 'in_progress',
    priority: 'high',
    assignee: 'Alice',
    labels: ['upload'],
    dueDate: iso(new Date(Date.now() + 1000 * 60 * 60 * 24 * 7)), // +7日
    description: 'S3 互換API前提のUI',
    updatedAt: iso(),
  },
  {
    id: 201,
    projectId: 2,
    title: '通知設定ページ（UI）',
    status: 'done',
    priority: 'low',
    labels: ['settings', 'ui'],
    updatedAt: iso(),
  },
]

export const comments: Comment[] = [
  {
    id: 1,
    issueId: 101,
    body: '入力長の上限を 128 にしませんか？',
    author: 'ryo',
    createdAt: iso(),
  },
  {
    id: 2,
    issueId: 102,
    body: 'MIME チェックを先に入れたいです',
    author: 'bob',
    createdAt: iso(),
  },
]
