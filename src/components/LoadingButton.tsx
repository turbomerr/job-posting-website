import { Loader2Icon } from "lucide-react"
import { Button } from "@/components/ui/button"

export function LoadingButton() {
  return (
    <Button variant="ghost" className="w-full border border-blue-500" disabled>
      <Loader2Icon className="animate-spin" />
      Posting
    </Button>
  )
}
