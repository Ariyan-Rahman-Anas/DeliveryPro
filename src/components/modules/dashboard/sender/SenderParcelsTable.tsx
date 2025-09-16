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
import { loggedInUser } from '@/redux/features/auth/authSlice';
import { useGetParcelsByUserIdQuery } from '@/redux/features/parcels/parcelApi';
import { Edit, EllipsisVertical, Eye, Trash2 } from 'lucide-react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router';

const SenderParcelsTable = () => {
  const loggedInSender = useSelector(loggedInUser);
  const { data: parcelsData, isLoading: isParcelsLoading } =
    useGetParcelsByUserIdQuery(loggedInSender?._id);
  console.log({ parcelsData });

  const columns = [
    { key: 'trackingId', header: 'Tracking Id' },
    { key: 'type', header: 'Type' },
    { key: 'weightKg', header: 'Weight-(KG)' },
    // {
    //   key: 'time',
    //   header: 'Time Period',
    //   render: (parcel) => (
    //     <div>
    //       <p className="text-primary">
    //         <span>Start:</span> {parcel.time?.start}
    //       </p>
    //       <p className="text-destructive">
    //         <span>End:</span> {parcel.time?.end}
    //       </p>
    //     </div>
    //   ),
    // },
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
                <DropdownMenuItem className="w-fit p-0 group">
                  <Link to={`/dashboard/classes/edit/${parcel.id}`}>
                    <Button
                      variant="ghost"
                      size="sm"
                      // onClick={() => handleView(certificate)}
                      className="h-8 w-fit p-0 text-gray-600 hover:text-primary hover:bg-primary/10 cursor-pointer"
                      title="View"
                    >
                      <Edit className="h-4 w-4 group-hover:text-primary" />
                      Edit
                    </Button>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onSelect={(e) => e.preventDefault()}
                  className="w-fit p-0 group"
                >
                  <Button>
                    <Trash2 />
                  </Button>
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ),
    },
  ];

  const paginationOptions = {};
  const handlePageChange = () => {};

  return (
    <div>
      <DataTable
        data={parcelsData?.data}
        columns={columns}
        paginationOptions={paginationOptions}
        // pageSize={itemsPerPage}
        pageSize={5}
        onPageChange={handlePageChange}
        isLoading={isParcelsLoading}
        emptyMessage="No certificates found"
      />
    </div>
  );
};

export default SenderParcelsTable;

//  {parcel.trainers.map((trainer, idx) => (
//             <p
//               key={idx}
//               className={`w-fit px-4 py-1 font-semibold rounded-full ${
//                 idx % 2 == 0
//                   ? 'text-primary bg-primary/15'
//                   : 'bg-green-500/15 text-green-500'
//               }`}
//             >
//               {trainer}
//             </p>
//           ))}
