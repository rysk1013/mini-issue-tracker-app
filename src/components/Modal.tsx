import { ReactNode, useEffect } from 'react'
import { cn } from './cn'

type Props = {
  open: boolean
  onClose: () => void
  title?: string
  children: ReactNode
  footer?: ReactNode
}

export default function Modal({ open, onClose, title, children, footer }: Props) {
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }
    if (open) document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open, onClose])

  if (!open) return null

  return (
    <div
      onClick={onClose}
      className='fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4'
      aria-modal='true'
      role='dialog'
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={cn('w-full max-w-lg rounded-lg bg-white shadow-lg')}
      >
        {title && <div className='border-b px-4 py-3 text-sm font-semibold'>{ title }</div>}
        <div className='px-4 py-3'>{ children }</div>
        {footer && <div className='border-t px-4 py-3'>{ footer }</div>}
      </div>
    </div>
  )
}
