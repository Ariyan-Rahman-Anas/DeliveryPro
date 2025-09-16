'use client';

import { TableCell, TableRow as ShadcnTableRow } from '@/components/ui/table';
import type { TableColumn } from '@/types';

interface TableRowProps<T> {
  item: T;
  columns: TableColumn<T>[];
  rowIndex: number;
}

const TableRow = <T,>({ item, columns, rowIndex }: TableRowProps<T>) => {
  return (
    <ShadcnTableRow className="border-b border-gray-100 hover:bg-gray-50/50 transition-colors text-center">
      {columns.map((column, columnIndex) => (
        <TableCell
          key={columnIndex}
          className={`px-1 py-4 ${column || ''}`}
          style={{
            width: column.width || 'auto',
            minWidth: column.width || 'auto',
          }}
        >
          <div className="overflow-hidden">
            {column.key === 'index' ? (
              <span className="text-sm text-gray-700 font-medium">
                {rowIndex + 1}
              </span>
            ) : column.render ? (
              column.render(item)
            ) : (
              <span className="text-sm text-gray-700 block truncate">
                {String(item[column.key as keyof T] ?? '')}
              </span>
            )}
          </div>
        </TableCell>
      ))}
    </ShadcnTableRow>
  );
};
export default TableRow;
