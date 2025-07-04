import { LoadingSpinner } from '@/components/ui/LoadingSpinner'

export default function DashboardLoading() {
  return (
    <div className="container py-12">
      <div className="flex items-center justify-center min-h-[400px]">
        <LoadingSpinner size="lg" />
      </div>
    </div>
  )
} 