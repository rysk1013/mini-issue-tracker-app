import type { ButtonHTMLAttributes } from 'react'
import { cn } from './cn'

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger'
  size?: 'sm' | 'md'
  loading?: boolean
}

/* eslint @typescript-eslint/no-explicit-any: 0 */
export default function Button({
  variant = 'primary',
  size = 'md',
  loading = false,
  className,
  children,
  disabled,
  ...rest
}: Props) {
  const base = 'inline-flex items-center justify-center rounded-md border transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2'

  const v = {
    primary: "bg-blue-600 text-white border-transparent hover:bg-blue-700 focus:ring-blue-600",
    secondary: "bg-gray-100 text-gray-900 border-gray-200 hover:bg-gray-200 focus:ring-gray-400",
    ghost: "bg-transparent text-gray-900 border-transparent hover:bg-gray-100 focus:ring-gray-300",
    danger: "bg-red-600 text-white border-transparent hover:bg-red-700 focus:ring-red-600",
  }[variant]

  const s = {
    sm: "h-8 px-3 text-sm",
    md: "h-10 px-4 text-sm",
  }[size]

  return (
    <button
      className={cn(base, v, s, disabled || loading ? 'opacity-50 cursor-not-allowed' : '', className)}
      disabled={disabled ?? loading}
      {...rest}
    >
      {loading && <span className="mr-2 inline-block animate-pulse">●</span>}
      {children}
    </button>
  )
}
