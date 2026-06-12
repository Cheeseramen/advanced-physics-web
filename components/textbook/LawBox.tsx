interface LawBoxProps {
  title: string
  children: React.ReactNode
}

export default function LawBox({ title, children }: LawBoxProps) {
  return (
    <div className="relative my-6 rounded border-2 border-[#791215]">
      <div className="absolute -top-3.5 left-4 rounded bg-[#791215] px-3 py-0.5 text-sm font-bold text-white">
        {title}
      </div>
      <div className="rounded bg-[#fceded] p-5 pt-6">
        {children}
      </div>
    </div>
  )
}
