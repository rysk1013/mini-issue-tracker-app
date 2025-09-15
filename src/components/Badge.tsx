import { cn } from './cn'

type Props = {
  children: React.ReactNode
  color?: 'gray' | 'blue' | 'green' | 'orange' | 'red'
  className?: string
}

export default function Badge({ children, color = 'gray', className }: Props) {
  const map = {
    gray: "bg-gray-100 text-gray-800",
    blue: "bg-blue-100 text-blue-800",
    green: "bg-green-100 text-green-800",
    orange: "bg-orange-100 text-orange-800",
    red: "bg-red-100 text-red-800",
  }
  return (
    <span className={cn('inline-flex items-center rounded px-2 py-0.5 text-xs font-medium', map[color], className)}>
      {children}
    </span>
  )
}
