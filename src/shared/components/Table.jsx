import "../css/Tablas-Admin.css";
import Tooltip from "./Tooltip";

const Table = ({ columns, data, actions }) => {
  return (
    <table className="tableContainer tableContainerMd">
      <thead className="tableHeader">
        <tr>
          {columns.map((column) => (
            <th
              key={column.key}
              scope="col"
              className="tableHeaderCell tableHeaderCellSm"
            >
              {column.header}
            </th>
          ))}
          {actions &&
            actions.map((action) => (
              <th
                key={action.label}
                scope="col"
                className="tableHeaderCellRelative"
              >
                {action.label}
              </th>
            ))}
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
            {actions &&
              actions.map((action) => (
                <td className="tableCell" key={action.label}>
                  <button
                    className="delete-button"
                    title={action.title}
                    onClick={() => action.onClick(item)}
                  >
                    {action.icon}
                  </button>
                </td>
              ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
