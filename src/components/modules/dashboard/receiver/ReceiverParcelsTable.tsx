/* eslint-disable @typescript-eslint/no-explicit-any */
import DataTable from '@/components/common/dataTable/DataTable';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { parcelDeliverStatus, ParcelStatus } from '@/constants';
import { loggedInUser } from '@/redux/features/auth/authSlice';
import {
  useConfirmParcelDeliveryMutation,
  useGetParcelsByReceiverIdQuery,
} from '@/redux/features/parcels/parcelApi';
import { formatStatusLabel } from '@/utils/formatStatusLabel';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'sonner';

const ReceiverParcelsTable = () => {
  const loggedInSender = useSelector(loggedInUser);
  const [currentPage, setCurrentPage] = useState(1);
  const dataLimitOnPerPage = 8;
  const [statusFilter, setStatusFilter] = useState('');
  const [parcelId, setParcelId] = useState('');

  const { data: parcelsData, isLoading: isParcelsLoading } =
    useGetParcelsByReceiverIdQuery(
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

  const [confirmParcelDelivery, { isLoading: isConfirming }] =
    useConfirmParcelDeliveryMutation();

  const handleConfirmParcelDelivery = async () => {
    try {
      const confirmRes = await confirmParcelDelivery(parcelId).unwrap();
      toast.success(confirmRes?.message);
    } catch (error: any) {
      toast.error(error?.data?.message);
    }
  };

  const columns = [
    { key: 'trackingId', header: 'Tracking Id' },
    { key: 'type', header: 'Type' },
    { key: 'weightKg', header: 'Weight-(KG)' },
    { key: 'fee', header: 'Fee' },
    { key: 'status', header: 'Status' },
    {
      key: 'sender',
      header: 'Sender',
      render: (parcel: any) => (
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
      render: (parcel: any) => (
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
      header: 'History',
      render: (parcel: any) => (
        <div className="space-y-1 text-xs flex flex-col items-center justify-center ">
          {parcel?.statusLogs?.length >= 1
            ? parcel.statusLogs.map((log: any, idx: number) => (
                <div
                  key={idx}
                  className="py-1 px-2 rounded-md bg-muted relative text-muted-foreground"
                >
                  <div className="absolute left-0 top-0 h-5 w-5 bg-black text-white rounded-tl-md flex items-center justify-center ">
                    <h1>{idx + 1}</h1>
                  </div>
                  <p
                    className={`font-semibold text-xs ${
                      log?.status === 'CANCELLED'
                        ? 'text-destructive'
                        : 'text-black'
                    }`}
                  >
                    {log?.status}
                  </p>
                  <p className="w-48 overflow-auto">{log?.note}</p>
                  <p>{log?.at.slice(0, 10)}</p>
                </div>
              ))
            : 'No history so far'}
        </div>
      ),
    },
    {
      key: 'expectedDeliveryDate',
      header: 'Tentative Delivery',
      render: (parcel: any) => (
        <div className="">{parcel?.expectedDeliveryDate.slice(0, 10)}</div>
      ),
    },
    {
      key: 'actions',
      header: 'Action',
      className: 'text-center',
      render: (parcel: any) => {
        const isReadyToDelivery = parcelDeliverStatus.find(
          (i) => i === parcel.status
        );

        return (
          <div className="flex items-center justify-center">
            {isReadyToDelivery ? (
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    variant="outline"
                    type="button"
                    className="bg-primary text-white"
                    onClick={() => setParcelId(parcel?._id)}
                  >
                    Confirm
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Parcel Delivery Confirmation</DialogTitle>
                    <DialogDescription>
                      Please make sure your action and check everything you
                      need.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="flex items-center justify-between mt-8">
                    <DialogClose asChild>
                      <Button variant="outline" disabled={isConfirming}>
                        Cancel
                      </Button>
                    </DialogClose>
                    <Button
                      variant="destructive"
                      type="submit"
                      disabled={isConfirming}
                      onClick={handleConfirmParcelDelivery}
                    >
                      Confirm
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            ) : parcel.status === 'DELIVERED' ? (
              <Button
                variant="outline"
                type="button"
                disabled={true}
                className="bg-primary"
              >
                Confirmed
              </Button>
            ) : parcel.status === 'CANCELLED' ? (
              <Button
                variant="outline"
                type="button"
                disabled={true}
                className="bg-destructive text-white  "
              >
                Cancelled
              </Button>
            ) : (
              <Button
                variant="outline"
                type="button"
                disabled={true}
                className="bg-primary"
              >
                A Step Away
              </Button>
            )}
          </div>
        );
      },
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

export default ReceiverParcelsTable;
