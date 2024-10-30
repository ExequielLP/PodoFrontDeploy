import './skeletons.css';

export function TableRowSkeleton() {
  return (
    <tr className="table-row-skeleton table-row-skeleton-last-of-type-border-none table-row-skeleton-first-child-rounded-tl-lg table-row-skeleton-first-child-rounded-tr-lg table-row-skeleton-last-child-rounded-bl-lg table-row-skeleton-last-child-rounded-br-lg">
      {/* Customer Name and Image */}
      <td className="table-row-skeleton-cell">
        <div className="table-row-skeleton-content">
          <div className="table-row-skeleton-avatar"></div>
          <div className="table-row-skeleton-name"></div>
        </div>
      </td>
      {/* Email */}
      <td className="table-row-skeleton-email">
        <div className="table-row-skeleton-email-bar"></div>
      </td>
      {/* Amount */}
      <td className="table-row-skeleton-email">
        <div className="table-row-skeleton-amount-bar"></div>
      </td>
      {/* Date */}
      <td className="table-row-skeleton-email">
        <div className="table-row-skeleton-date-bar"></div>
      </td>
      {/* Status */}
      <td className="table-row-skeleton-email">
        <div className="table-row-skeleton-status-bar"></div>
      </td>
      {/* Actions */}
      <td className="table-row-skeleton-cell">
        <div className="table-row-skeleton-actions">
          <div className="table-row-skeleton-action"></div>
          <div className="table-row-skeleton-action"></div>
        </div>
      </td>
    </tr>
  );
}
