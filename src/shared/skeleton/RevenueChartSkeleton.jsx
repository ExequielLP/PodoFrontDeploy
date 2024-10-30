import './skeletons.css';

export function RevenueChartSkeleton() {
  return (
    <div className="shimmer revenue-chart-skeleton revenue-chart-skeleton-md-col-span-4">
      <div className="revenue-chart-skeleton-title" />
      <div className="revenue-chart-skeleton-content">
        <div className="revenue-chart-skeleton-grid revenue-chart-skeleton-sm-grid-cols-13 revenue-chart-skeleton-md-gap-4" />
        <div className="revenue-chart-skeleton-footer">
          <div className="revenue-chart-skeleton-circle" />
          <div className="revenue-chart-skeleton-label" />
        </div>
      </div>
    </div>
  );
}
