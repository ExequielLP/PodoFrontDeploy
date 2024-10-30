import './skeletons.css';
import { CardSkeleton } from './CardSkeleton'
import { LatestInvoicesSkeleton } from './InvoiceSkeleton'
import { RevenueChartSkeleton } from './RevenueChartSkeleton'
export default function DashboardSkeleton() {
  return (
    <>
      <div className="shimmer dashboard-skeleton-title" />
      <div className="dashboard-skeleton-grid dashboard-skeleton-sm-grid-cols-2 dashboard-skeleton-lg-grid-cols-4">
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
      </div>
      <div className="dashboard-skeleton-mt-6 dashboard-skeleton-grid dashboard-skeleton-md-grid-cols-4 dashboard-skeleton-lg-grid-cols-8">
        <RevenueChartSkeleton />
        <LatestInvoicesSkeleton />
      </div>
    </>
  );
}
