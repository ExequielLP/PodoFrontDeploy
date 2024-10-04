import "../css/Tablas-Admin.css";

const Table = ({ columns, data, actions }) => {
  return (
    <table className="table align-middle table-borderless">
      <thead className="tabla-header">
        <tr>
          {columns.map((column) => (
            <th key={column.key} scope="col" className="m-auto text-center">
              {column.header}
            </th>
          ))}
          {actions &&
            actions.map((action) => (
              <th key={action.label} scope="col" className="m-auto text-center">
                {action.label}
              </th>
            ))}
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item.id}>
            {columns.map((column) => (
              <td key={column.key} className="m-auto p-4">
                {column.render
                  ? column.render(item[column.key])
                  : item[column.key]}
              </td>
            ))}
            {actions &&
              actions.map((action) => (
                <td className="m-auto p-2" key={action.label}>
                  <button
                    className="tabla-admin-btn admin-btn"
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
