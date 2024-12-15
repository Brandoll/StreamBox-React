interface Column<T> {
    label: string;
    key: keyof T;
    render?: (item: T) => React.ReactNode; // Nueva propiedad para renderizado personalizado
  }
  
  interface TablaGenericaProps<T extends { id: number }> {
    data: T[];
    columns: Column<T>[];
    onEdit: (item: T) => void;
    onDelete: (id: number) => void;
  }
  
  function TablaGenerica<T extends { id: number }>({
    data,
    columns,
    onEdit,
    onDelete,
  }: TablaGenericaProps<T>) {
    return (
      <table className="tabla">
        <thead>
          <tr>
            {columns.map(({ label }) => (
              <th key={label}>{label}</th>
            ))}
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              {columns.map(({ key, render }) => (
                <td key={String(key)}>{render ? render(item) : String(item[key])}</td>
              ))}
              <td>
                <button onClick={() => onEdit(item)} className="tabla-button-edit">
                  Editar
                </button>
                <button onClick={() => onDelete(item.id)} className="tabla-button-delete">
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
  
  export default TablaGenerica;
  