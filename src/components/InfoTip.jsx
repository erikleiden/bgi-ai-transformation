import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { Info } from 'lucide-react'

export default function InfoTip({ text, children }) {
  return (
    <Tooltip>
      <TooltipTrigger
        render={<span className="inline-flex items-center gap-1 cursor-help" />}
      >
        {children}
        <Info className="h-3.5 w-3.5 text-gray-400 shrink-0" />
      </TooltipTrigger>
      <TooltipContent className="max-w-xs text-sm">{text}</TooltipContent>
    </Tooltip>
  )
}
