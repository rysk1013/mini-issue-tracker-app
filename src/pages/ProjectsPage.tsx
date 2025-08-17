import { projects } from '@/utils/seed'

export default function ProjectsPage() {
  return (
    <div className="p-4 space-y-2">
      <h1 className="text-xl font-bold">Projects</h1>
      <ul className="list-disc pl-6">
        {projects.map(p => (
          <li key={p.id}>{ p.name }</li>
        ))}
      </ul>
    </div>
  )
}
