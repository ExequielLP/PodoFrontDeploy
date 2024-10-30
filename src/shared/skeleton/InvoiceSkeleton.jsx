import './skeletons.css';
import { TableRowSkeleton } from './TableRowSkeleton';

export function InvoiceSkeleton() {
  return (
    <div className="invoice-skeleton">
      <div className="invoice-skeleton-content">
        <div className="invoice-skeleton-avatar" />
        <div className="invoice-skeleton-info">
          <div className="invoice-skeleton-title" />
          <div className="invoice-skeleton-subtitle" />
        </div>
      </div>
      <div className="invoice-skeleton-subtitle" />
    </div>
  );
}

export function LatestInvoicesSkeleton() {
  return (
    <div className="shimmer latest-invoices-skeleton latest-invoices-skeleton-md-col-span-4">
      <div className="latest-invoices-skeleton-title" />
      <div className="latest-invoices-skeleton-content">
        <div className="latest-invoices-skeleton-body">
          <InvoiceSkeleton />
          <InvoiceSkeleton />
          <InvoiceSkeleton />
          <InvoiceSkeleton />
          <InvoiceSkeleton />
        </div>
        <div className="latest-invoices-skeleton-footer">
          <div className="latest-invoices-skeleton-circle" />
          <div className="latest-invoices-skeleton-label" />
        </div>
      </div>
    </div>
  );
}

export function InvoicesMobileSkeleton() {
  return (
    <div className="invoices-mobile-skeleton">
      <div className="invoices-mobile-skeleton-header">
        <div className="invoices-mobile-skeleton-content">
          <div className="invoices-mobile-skeleton-avatar"></div>
          <div className="invoices-mobile-skeleton-name"></div>
        </div>
        <div className="invoices-mobile-skeleton-date"></div>
      </div>
      <div className="invoices-mobile-skeleton-body">
        <div>
          <div className="invoices-mobile-skeleton-amount"></div>
          <div className="invoices-mobile-skeleton-amount-sub"></div>
        </div>
        <div className="invoices-mobile-skeleton-actions">
          <div className="invoices-mobile-skeleton-action"></div>
          <div className="invoices-mobile-skeleton-action"></div>
        </div>
      </div>
    </div>
  );
}

export function InvoicesTableSkeleton() {
  return (
    <div className="invoices-table-skeleton">
      <div className="invoices-table-skeleton-wrapper">
        <div className="invoices-table-skeleton-container">
          <div className="invoices-table-skeleton-md-hidden">
            <InvoicesMobileSkeleton />
            <InvoicesMobileSkeleton />
            <InvoicesMobileSkeleton />
            <InvoicesMobileSkeleton />
            <InvoicesMobileSkeleton />
            <InvoicesMobileSkeleton />
          </div>
          <table className="invoices-table-skeleton-table">
            <thead className="invoices-table-skeleton-thead">
              <tr>
                <th scope="col" className="invoices-table-skeleton-th invoices-table-skeleton-th-first">
                  Customer
                </th>
                <th scope="col" className="invoices-table-skeleton-th">
                  Email
                </th>
                <th scope="col" className="invoices-table-skeleton-th">
                  Amount
                </th>
                <th scope="col" className="invoices-table-skeleton-th">
                  Date
                </th>
                <th scope="col" className="invoices-table-skeleton-th">
                  Status
                </th>
                <th scope="col" className="invoices-table-skeleton-th invoices-table-skeleton-th-last">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="invoices-table-skeleton-tbody">
              <TableRowSkeleton />
              <TableRowSkeleton />
              <TableRowSkeleton />
              <TableRowSkeleton />
              <TableRowSkeleton />
              <TableRowSkeleton />
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
