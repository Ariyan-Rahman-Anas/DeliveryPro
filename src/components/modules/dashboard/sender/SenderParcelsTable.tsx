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

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { parcelCancellableStatus, ParcelStatus } from '@/constants';
import { loggedInUser } from '@/redux/features/auth/authSlice';
import {
  useGetParcelsBySenderIdQuery,
  useParcelCancellationMutation,
} from '@/redux/features/parcels/parcelApi';
import { formatStatusLabel } from '@/utils/formatStatusLabel';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { toast } from 'sonner';

const SenderParcelsTable = () => {
  const loggedInSender = useSelector(loggedInUser);
  const [currentPage, setCurrentPage] = useState(1);
  const dataLimitOnPerPage = 8;
  const [statusFilter, setStatusFilter] = useState('');
  const [parcelId, setParcelId] = useState('');

  const { register, reset, handleSubmit } = useForm();

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

  const [parcelCancellation, { isLoading: isCancelling }] =
    useParcelCancellationMutation();

  const handleCancelParcel = async (data: any) => {
    const parcelCancellationData = {
      id: parcelId,
      cancelReason: data,
    };
    try {
      const parcelCancelRes = await parcelCancellation(
        parcelCancellationData
      ).unwrap();
      toast.success(parcelCancelRes?.message);
      reset();
      console.log({ parcelCancelRes });
    } catch (error: any) {
      toast.error(error?.data?.message);
    }
  };

  console.log({ parcelsData, parcelId });

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
      header: 'Logs',
      render: (parcel: any) => (
        <div className="space-y-1 text-xs flex flex-col items-center justify-center ">
          {parcel.statusLogs.map((log: any, index: number) => (
            <div key={index} className="py-1 px-2 rounded-md bg-muted">
              <p>{log?.status}</p>
              <p className="w-48 overflow-auto">{log?.note}</p>
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
      render: (parcel: any) => {
        const isCancellable = parcelCancellableStatus.find(
          (i) => i === parcel.status
        );

        return (
          <div className="flex items-center justify-center">
            {isCancellable ? (
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    variant="outline"
                    type="button"
                    className="bg-destructive/20"
                    onClick={() => setParcelId(parcel?._id)}
                  >
                    Cancel
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Parcel Cancellation</DialogTitle>
                    <DialogDescription>
                      Please make sure your action and enter a reason below
                    </DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleSubmit(handleCancelParcel)}>
                    <div className="grid gap-1.5">
                      <Label htmlFor="cancelReason">Cancel Reason</Label>
                      <Input
                        id="cancelReason"
                        {...register('cancelReason', { required: true })}
                      />
                    </div>
                    <div className="flex items-center justify-between mt-8">
                      <DialogClose asChild>
                        <Button variant="outline" disabled={isCancelling}>
                          Cancel
                        </Button>
                      </DialogClose>
                      <Button
                        variant="destructive"
                        type="submit"
                        disabled={isCancelling}
                      >
                        Confirm
                      </Button>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>
            ) : (
              <Button
                variant="outline"
                type="button"
                disabled={true}
                className="bg-destructive/20 disabled:cursor-not-allowed disabled:opacity-30"
              >
                Cancel
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
export default SenderParcelsTable;
