import type { InputHTMLAttributes } from 'react'
import { cn } from './cn'

type Props = InputHTMLAttributes<HTMLInputElement> & {
  label?: string
  error?: string
}

export default function Input({ label, error, className, id, ...rest}: Props) {
  const inputId = id || rest.name || undefined

  return (
    <label className="block">
      {label && <span className="mb-1 block text-sm text-gray-700">{ label }</span>}
      <input
        id={inputId}
        className={cn(
          "w-full rounded-md border px-3 py-2 text-sm",
          "focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent",
          error ? "border-red-500" : "border-gray-300",
          className
        )}
        { ...rest }
      />
      {error && <span className="mt-1 block text-xs text-red-600">{ error }</span>}
    </label>
  )
}
