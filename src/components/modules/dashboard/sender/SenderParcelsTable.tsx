import DataTable from '@/components/common/dataTable/DataTable';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ParcelStatus } from '@/constants';
import { loggedInUser } from '@/redux/features/auth/authSlice';
import { useGetParcelsBySenderIdQuery } from '@/redux/features/parcels/parcelApi';
import { formatStatusLabel } from '@/utils/formatStatusLabel';
import { EllipsisVertical, Eye } from 'lucide-react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router';

const SenderParcelsTable = () => {
  const loggedInSender = useSelector(loggedInUser);
  const [currentPage, setCurrentPage] = useState(1);
  const dataLimitOnPerPage = 8;
  const [statusFilter, setStatusFilter] = useState('');

  const { data: parcelsData, isLoading: isParcelsLoading } =
    useGetParcelsBySenderIdQuery(
      {
        id: loggedInSender?._id,
        page: currentPage,
        limit: dataLimitOnPerPage,
        ...(statusFilter && { status: statusFilter }),
      },
      {
        skip: !loggedInSender?._id,
      }
    );
  console.log({ parcelsData });

  const columns = [
    { key: 'trackingId', header: 'Tracking Id' },
    { key: 'type', header: 'Type' },
    { key: 'weightKg', header: 'Weight-(KG)' },
    { key: 'fee', header: 'Fee' },
    { key: 'status', header: 'Status' },
    { key: 'isCancelled', header: 'Cancelled' },
    { key: 'isBlocked', header: 'Blocked' },
    {
      key: 'sender',
      header: 'Sender',
      render: (parcel) => (
        <div className="flex flex-col items-center justify-center ">
          <p>{parcel?.sender?.snapshot?.name} </p>
          <p>{parcel?.sender?.snapshot?.phone} </p>
          <p>{parcel?.sender?.snapshot?.cit}</p>
          <p>{parcel?.sender?.snapshot?.address}</p>
        </div>
      ),
    },
    {
      key: 'receiver',
      header: 'Receiver',
      render: (parcel) => (
        <div className="flex flex-col items-center justify-center ">
          <p>{parcel?.receiver?.snapshot?.name} </p>
          <p>{parcel?.receiver?.snapshot?.phone} </p>
          <p>{parcel?.receiver?.snapshot?.cit}</p>
          <p>{parcel?.receiver?.snapshot?.address}</p>
        </div>
      ),
    },
    {
      key: 'statusLogs',
      header: 'Logs',
      render: (parcel) => (
        <div className="space-y-1 text-xs flex flex-col items-center justify-center ">
          {parcel.statusLogs.map((log) => (
            <div className="py-1 px-2 rounded-md bg-muted">
              <p>{log?.status}</p>
              <p>{log?.note}</p>
              <p>{log?.at.slice(0, 10)}</p>
            </div>
          ))}
        </div>
      ),
    },
    {
      key: 'actions',
      header: 'Action',
      className: 'text-center',
      render: (parcel) => (
        <div className="flex items-center justify-center">
          <DropdownMenu>
            <DropdownMenuTrigger asChild className="cursor-pointer">
              <EllipsisVertical />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="start">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuGroup>
                <DropdownMenuItem className="w-fit p-0 group">
                  <Link to={`/dashboard/classes/view/${parcel.id}`}>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-fit p-0 text-gray-600 hover:text-primary hover:bg-primary/10 cursor-pointer"
                      title="View"
                    >
                      <Eye className="h-4 w-4 group-hover:text-primary" />
                      View
                    </Button>
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ),
    },
  ];

  const paginationOptions = {
    count: parcelsData?.meta?.total,
    current_page: parcelsData?.meta?.page,
    next_page:
      parcelsData?.meta?.page < parcelsData?.meta?.totalPages
        ? parcelsData?.meta?.page + 1
        : undefined,
    num_pages: parcelsData?.meta?.totalPages,
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  const handleStatusFilter = (status: string) => {
    setStatusFilter(status);
    setCurrentPage(1);
  };

  return (
    <div>
      {/* Optional: Add status filter */}
      <div className="mb-4">
        <select
          value={statusFilter}
          onChange={(e) => handleStatusFilter(e.target.value)}
          className="px-3 py-2 border rounded-md"
        >
          <option value="">All Status</option>
          {Object.values(ParcelStatus).map((status, idx) => (
            <option key={idx} value={status}>
              {formatStatusLabel(status)}
            </option>
          ))}
        </select>
      </div>

      <DataTable
        data={parcelsData?.data}
        columns={columns}
        paginationOptions={paginationOptions}
        pageSize={parcelsData?.meta?.limit}
        onPageChange={handlePageChange}
        isLoading={isParcelsLoading}
        emptyMessage="No certificates found"
      />
    </div>
  );
};
export default SenderParcelsTable;
