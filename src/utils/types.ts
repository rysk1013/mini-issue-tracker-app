export type Status = 'backlog' | 'in_progress' | 'done'
export type Priority = 'low' | 'med' | 'high'

export interface Project {
  id: number
  name: string
}

export interface Issue {
  id: number
  projectId: number
  title: string
  status: Status
  priority: Priority
  assignee?: string
  dueDate?: string
  labels: string[]
  description?: string
  updatedAt: string
}

export interface Comment {
  id: number
  issueId: number
  body: string
  author: string
  createdAt: string
}
