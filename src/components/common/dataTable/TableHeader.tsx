'use client';

import {
  TableHead,
  TableHeader as ShadcnTableHeader,
  TableRow,
} from '@/components/ui/table';
import type { TableColumn } from '@/types';

interface TableHeaderProps<T> {
  columns: TableColumn<T>[];
}

const TableHeader = <T,>({ columns }: TableHeaderProps<T>) => {
  return (
    <ShadcnTableHeader>
      <TableRow className="border-b border-gray-200">
        {columns.map((column) => (
          <TableHead
            key={String(column.key)}
            className={`px-1 py-4 text-sm font-medium text-gray-700 text-center ${
              column.headerClassName || ''
            }`}
            style={{
              width: column.width || 'auto',
              minWidth: column.width || 'auto',
            }}
          >
            {column.header}
          </TableHead>
        ))}
      </TableRow>
    </ShadcnTableHeader>
  );
};

export default TableHeader;
