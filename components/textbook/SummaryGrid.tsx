export default function SummaryGrid({ children }: { children: React.ReactNode }) {
  return (
    <div className="my-4 grid grid-cols-2 gap-3">
      {children}
    </div>
  )
}
