import "./skeletons.css";

export function CardSkeleton() {
  return (
    <div className="card-skeleton">
      <div className="card-skeleton-content">
        <div className="card-skeleton-icon" />
        <div className="card-skeleton-title" />
      </div>
      <div className="card-skeleton-body">
        <div className="card-skeleton-body-content" />
      </div>
    </div>
  );
}

export function CardsSkeleton() {
  return (
    <>
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
    </>
  );
}