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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { Input } from '@/components/ui/input';
import { ParcelStatus } from '@/constants';
import { loggedInUser } from '@/redux/features/auth/authSlice';
import {
  useBlockUnblockParcelMutation,
  useChangeParcelStatusMutation,
  useGetAllParcelQuery,
} from '@/redux/features/parcels/parcelApi';
import { formatStatusLabel } from '@/utils/formatStatusLabel';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { toast } from 'sonner';
import { Search, X } from 'lucide-react';

const AdminParcelsTable = () => {
  const loggedInSender = useSelector(loggedInUser);
  const [currentPage, setCurrentPage] = useState(1);
  const dataLimitOnPerPage = 8;
  const [statusFilter, setStatusFilter] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState('');
  const [parcelId, setParcelId] = useState('');
  const [selectedParcel, setSelectedParcel] = useState<any>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const { register, reset, handleSubmit, setValue, watch } = useForm();

  // Debounce search query to avoid too many API calls
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
      setCurrentPage(1);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const { data: parcelsData, isLoading: isParcelsLoading } =
    useGetAllParcelQuery(
      {
        page: currentPage,
        limit: dataLimitOnPerPage,
        ...(statusFilter && { status: statusFilter }),
        ...(debouncedSearchQuery && { search: debouncedSearchQuery }),
      },
      {
        skip: !loggedInSender?._id,
      }
    );

  const [changeParcelStatus, { isLoading: isChangingStatus }] =
    useChangeParcelStatusMutation();

  const handleChangeParcelStatus = async (data: any) => {
    const parcelStatusChangeData = {
      status: data.status,
      note: data.note,
    };

    try {
      const parcelStatusChangeRes = await changeParcelStatus({
        id: parcelId,
        updatedData: parcelStatusChangeData,
      }).unwrap();
      toast.success(parcelStatusChangeRes?.message);
      reset();
      setDialogOpen(false);
    } catch (error: any) {
      toast.error(error?.data?.message);
    }
  };

  const [unblockUnblockParcel, { isLoading: isBlockUnblocking }] =
    useBlockUnblockParcelMutation();

  const handleBlockUnblockParcel = async (blockUnblockParcelId: string) => {
    try {
      const blockUnblockRes = await unblockUnblockParcel(
        blockUnblockParcelId
      ).unwrap();
      toast.success(blockUnblockRes?.message);
    } catch (error: any) {
      toast.error(error?.data?.message);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleStatusFilter = (status: string) => {
    setStatusFilter(status);
    setCurrentPage(1);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const clearSearch = () => {
    setSearchQuery('');
    setDebouncedSearchQuery('');
  };

  const clearAllFilters = () => {
    setSearchQuery('');
    setDebouncedSearchQuery('');
    setStatusFilter('');
    setCurrentPage(1);
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
        <div className="space-y-1">
          <div className="border rounded-md p-0.5 bg-primary/10">
            <p className="text-left font-semibold text-xs text-primary">
              Authorized Creator:
            </p>
            <p>{parcel?.sender?.user?.name} </p>
            <p>{parcel?.sender?.user?.email} </p>
          </div>
          <div className="border rounded-md p-0.5 bg-blue-500/10 flex flex-col items-center justify-center ">
            <p className="text-left font-semibold w-full">From:</p>
            <p>{parcel?.sender?.snapshot?.name} </p>
            <p>{parcel?.sender?.snapshot?.phone} </p>
            <p>{parcel?.sender?.snapshot?.cit}</p>
            <p>{parcel?.sender?.snapshot?.address}</p>
          </div>
        </div>
      ),
    },
    {
      key: 'receiver',
      header: 'Receiver',
      render: (parcel: any) => (
        <div className="space-y-1">
          <div className="border rounded-md p-0.5 bg-primary/10">
            <p className="text-left font-semibold text-xs text-blue-500">
              Authorized Receiver:
            </p>
            <p>{parcel?.receiver?.user?.name} </p>
            <p>{parcel?.receiver?.user?.email} </p>
          </div>
          <div className="border rounded-md p-0.5 bg-blue-500/10 flex flex-col items-center justify-center ">
            <p className="text-left font-semibold w-full">To:</p>
            <p>{parcel?.receiver?.snapshot?.name} </p>
            <p>{parcel?.receiver?.snapshot?.phone} </p>
            <p>{parcel?.receiver?.snapshot?.cit}</p>
            <p>{parcel?.receiver?.snapshot?.address}</p>
          </div>
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
                        : log?.status === 'DELIVERED'
                        ? 'text-primary'
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
        return (
          <div className="flex flex-col gap-y-2 items-center justify-center">
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  type="button"
                  className="bg-destructive/20"
                  onClick={() => {
                    setParcelId(parcel?._id);
                    setSelectedParcel(parcel);
                    setDialogOpen(true);
                    reset();
                  }}
                  disabled={
                    parcel.status === 'DELIVERED' ||
                    parcel.status === 'CANCELLED' ||
                    parcel?.isBlocked === true
                  }
                >
                  Update
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Parcel Status Change</DialogTitle>
                  <DialogDescription>
                    Please make sure your action and enter a note below
                  </DialogDescription>
                </DialogHeader>
                <form
                  onSubmit={handleSubmit(handleChangeParcelStatus)}
                  className="space-y-3"
                >
                  <div>
                    <Select
                      onValueChange={(value) => setValue('status', value)}
                      value={watch('status')}
                    >
                      <SelectTrigger className="w-full min-w-[180px]">
                        <SelectValue placeholder="Select a status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Status</SelectLabel>
                          {selectedParcel?.status === 'REQUESTED' ? (
                            <>
                              <SelectItem value="APPROVED">APPROVED</SelectItem>
                              <SelectItem value="CANCELLED">
                                CANCELLED
                              </SelectItem>
                            </>
                          ) : selectedParcel?.status === 'APPROVED' ? (
                            <>
                              <SelectItem value="PICKUP_SCHEDULED">
                                PICKUP_SCHEDULED
                              </SelectItem>
                              <SelectItem value="PICKED_UP">
                                PICKED_UP
                              </SelectItem>
                              <SelectItem value="CANCELLED">
                                CANCELLED
                              </SelectItem>
                            </>
                          ) : selectedParcel?.status === 'PICKUP_SCHEDULED' ? (
                            <>
                              <SelectItem value="PICKED_UP">
                                PICKED_UP
                              </SelectItem>
                              <SelectItem value="CANCELLED">
                                CANCELLED
                              </SelectItem>
                            </>
                          ) : selectedParcel?.status === 'PICKED_UP' ? (
                            <>
                              <SelectItem value="IN_TRANSIT">
                                IN_TRANSIT
                              </SelectItem>
                              <SelectItem value="AT_HUB">AT_HUB</SelectItem>
                              <SelectItem value="RETURN_REQUESTED">
                                RETURN_REQUESTED
                              </SelectItem>
                            </>
                          ) : selectedParcel?.status === 'IN_TRANSIT' ? (
                            <>
                              <SelectItem value="AT_HUB">AT_HUB</SelectItem>
                              <SelectItem value="OUT_FOR_DELIVERY">
                                OUT_FOR_DELIVERY
                              </SelectItem>
                              <SelectItem value="RETURN_REQUESTED">
                                RETURN_REQUESTED
                              </SelectItem>
                            </>
                          ) : selectedParcel?.status === 'AT_HUB' ? (
                            <>
                              <SelectItem value="OUT_FOR_DELIVERY">
                                OUT_FOR_DELIVERY
                              </SelectItem>
                              <SelectItem value="IN_TRANSIT">
                                IN_TRANSIT
                              </SelectItem>
                              <SelectItem value="RETURN_REQUESTED">
                                RETURN_REQUESTED
                              </SelectItem>
                            </>
                          ) : (
                            selectedParcel?.status === 'OUT_FOR_DELIVERY' && (
                              <>
                                <SelectItem value="DELIVERED">
                                  DELIVERED
                                </SelectItem>
                                <SelectItem value="RETURN_REQUESTED">
                                  RETURN_REQUESTED
                                </SelectItem>
                              </>
                            )
                          )}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid gap-1.5">
                    <Input
                      id="note"
                      placeholder="Note"
                      {...register('note', { required: true })}
                    />
                  </div>

                  <div className="flex items-center justify-between mt-8">
                    <DialogClose asChild>
                      <Button
                        variant="outline"
                        disabled={isChangingStatus}
                        type="button"
                      >
                        Cancel
                      </Button>
                    </DialogClose>
                    <Button
                      variant="destructive"
                      type="submit"
                      disabled={isChangingStatus}
                    >
                      {isChangingStatus ? 'Updating...' : 'Confirm'}
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
            <Button
              disabled={
                isBlockUnblocking ||
                parcel?.status === 'CANCELLED' ||
                parcel?.status === 'DELIVERED'
              }
              onClick={() => handleBlockUnblockParcel(parcel?._id)}
              className={`${
                parcel?.isBlocked === true ? '' : 'bg-destructive'
              }`}
            >
              {parcel?.isBlocked === true ? 'Unblock' : 'Block'}
            </Button>
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

  return (
    <div>
      {/* Search and Filter Section */}
      <div className="mb-4 space-y-4">
        {/* Search Input */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-gray-400" />
          </div>
          <Input
            type="text"
            placeholder="Search by tracking ID, sender, receiver, phone..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="pl-10 pr-10"
          />
          {searchQuery && (
            <button
              onClick={clearSearch}
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
            >
              <X className="h-4 w-4 text-gray-400 hover:text-gray-600" />
            </button>
          )}
        </div>

        {/* Filters Row */}
        <div className="flex flex-wrap gap-4 items-center">
          <div className="flex items-center gap-2">
            <label htmlFor="status-filter" className="text-sm font-medium">
              Status:
            </label>
            <select
              id="status-filter"
              value={statusFilter}
              onChange={(e) => handleStatusFilter(e.target.value)}
              className="px-3 py-2 border rounded-md min-w-[150px]"
            >
              <option value="">All Status</option>
              {Object.values(ParcelStatus).map((status, idx) => (
                <option key={idx} value={status}>
                  {formatStatusLabel(status)}
                </option>
              ))}
            </select>
          </div>

          {/* Clear Filters Button */}
          {(searchQuery || statusFilter) && (
            <Button
              variant="outline"
              size="sm"
              onClick={clearAllFilters}
              className="flex items-center gap-2"
            >
              <X className="h-4 w-4" />
              Clear Filters
            </Button>
          )}
        </div>

        {/* Active Filters Display */}
        {(debouncedSearchQuery || statusFilter) && (
          <div className="flex flex-wrap gap-2">
            {debouncedSearchQuery && (
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                Search: "{debouncedSearchQuery}"
                <button
                  onClick={clearSearch}
                  className="hover:bg-blue-200 rounded-full p-0.5"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            )}
            {statusFilter && (
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                Status: {formatStatusLabel(statusFilter)}
                <button
                  onClick={() => handleStatusFilter('')}
                  className="hover:bg-green-200 rounded-full p-0.5"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Results Info */}
      {parcelsData?.meta && (
        <div className="mb-4 text-sm text-gray-600">
          Showing {parcelsData.data?.length || 0} of {parcelsData.meta.total}{' '}
          parcels
          {(debouncedSearchQuery || statusFilter) && ' (filtered)'}
        </div>
      )}

      <DataTable
        data={parcelsData?.data}
        columns={columns}
        paginationOptions={paginationOptions}
        pageSize={parcelsData?.meta?.limit}
        onPageChange={handlePageChange}
        isLoading={isParcelsLoading}
        emptyMessage={
          debouncedSearchQuery || statusFilter
            ? 'No parcels found matching your search criteria'
            : 'No parcels found'
        }
      />
    </div>
  );
};

export default AdminParcelsTable;
