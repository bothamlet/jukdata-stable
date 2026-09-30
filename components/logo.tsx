export function Logo({ className = '' }: { className?: string }) {
  return (
    <span
      className={`inline-flex items-center justify-center rounded-md bg-brand px-2.5 py-1 text-lg font-extrabold leading-none tracking-tight text-white ${className}`}
      aria-label="JUK Data"
    >
      JUK
    </span>
  )
}
