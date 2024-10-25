import "../css/Tablas-Admin.css";
import Tooltip from "./Tooltip";

const Table = ({ columns, data, actions }) => {
  return (
    <table className="tableContainer tableContainerMd">
      <thead className="tableHeader">
        <tr className="tableHeaderRow">
          {columns.map((column) => (
            <th
              key={column.key}
              scope="col"
              className="tableHeaderCell tableHeaderCellSm"
            >
              {column.header}
            </th>
          ))}
          {actions && actions.length > 0 && (
            <th scope="col" className="tableHeaderCellRelative">
              {actions.length === 1 ? "Acción" : "Acciones"}
            </th>
          )}
        </tr>
      </thead>
      <tbody className="tableBody">
        {data.map((item) => (
          <tr
            key={item.id}
            className="tableRow tableRowLast tableRowFirstChildTdFirstChild 
            tableRowFirstChildTdLastChild tableRowLastChildTdFirstChild tableRowLastChildTdLastChild"
          >
            {columns.map((column) => (
              <td
                key={column.key}
                className={`tableCell ${column.className || ""}`}
              >
                {column.key === "descripcion" ? (
                  <Tooltip content={item[column.key]}>
                    {item[column.key].length > 50
                      ? `${item[column.key].substring(0, 50)}...`
                      : item[column.key]}
                  </Tooltip>
                ) : column.render ? (
                  column.render(item[column.key])
                ) : (
                  item[column.key]
                )}
              </td>
            ))}
            {actions && actions.length > 0 && (
              <td className="tableCell">
                <span className="tableCellActions">
                  {actions.map((action) => (
                    <button
                      key={action.label}
                      className="delete-button"
                      title={action.title}
                      onClick={() => action.onClick(item)}
                    >
                      {action.icon}
                    </button>
                  ))}
                </span>
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
