import { Card } from './ui/card'
import { Skeleton } from './ui/skeleton'

export default function CardItemSkeleton() {
  return (
    <Card className="shadow px-5 py-2 rounded flex flex-row mb-1 gap-2">
      <div className="flex items-center space-x-4">
        <Skeleton className="h-12 w-12 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[200px]" />
        </div>
      </div>
    </Card>
  )
}
