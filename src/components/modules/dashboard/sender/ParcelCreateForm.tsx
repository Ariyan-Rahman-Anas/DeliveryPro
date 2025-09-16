/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Role } from '@/constants';
import { useGetAllUserQuery } from '@/redux/features/auth/authApi';
import { loggedInUser } from '@/redux/features/auth/authSlice';
import { useCreateParcelMutation } from '@/redux/features/parcels/parcelApi';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { toast } from 'sonner';

const ParcelCreateForm = () => {
  const [type, setType] = useState('');
  const [receiverUserId, setReceiverUserId] = useState('');

  const loggedInSender = useSelector(loggedInUser);

  const { register, handleSubmit, reset } = useForm();

  const { data: userData } = useGetAllUserQuery(undefined);
  const [createParcel, { isLoading: isCreating }] = useCreateParcelMutation();
  const allReceivers = userData?.data?.filter(
    (user: any) =>
      user._id !== loggedInSender?._id && user.role === Role.RECEIVER
  );

  const handleFormSubmit = async (data: any) => {
    const parcelData = {
      type,
      weightKg: parseFloat(data.weight),
      fee: parseFloat(data.fee),
      sender: {
        user: loggedInSender?._id,
        snapshot: {
          name: data.senderName,
          phone: data.senderPhone,
          address: data.senderAddress,
          city: data.senderCity,
          area: data.senderArea,
          postcode: data.senderPostCode,
        },
      },
      receiver: {
        user: receiverUserId,
        snapshot: {
          name: data.receiverName,
          phone: data.receiverPhone,
          address: data.receiverAddress,
          city: data.receiverCity,
          area: data.receiverArea,
          postcode: data.receiverPostCode,
        },
      },
      expectedDeliveryDate: data.expectedDeliveryDate,
    };

    try {
      const parcelCreateRes = await createParcel(parcelData).unwrap();
      toast.success(parcelCreateRes?.message);
      reset();
      setType('');
      setReceiverUserId('');
    } catch (error: any) {
      if (error?.data?.errorSources?.[0]?.message) {
        toast.error(error?.data?.errorSources?.[0]?.message);
      } else {
        toast.error(error?.data?.message);
      }
    }
  };

  const handleCancel = () => {
    reset();
    setType('');
    setReceiverUserId('');
  };

  return (
    <div>
      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
        {/* type - weight - fee */}
        <div className="flex flex-col md:flex-row items-center gap-4">
          <Select onValueChange={(value) => setType(value)} value={type}>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Select parcel type" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Parcel Types</SelectLabel>
                <SelectItem value="package">Package</SelectItem>
                <SelectItem value="box">Box</SelectItem>
                <SelectItem value="bag">Bag</SelectItem>
                <SelectItem value="carton">Carton</SelectItem>
                <SelectItem value="crate">Crate</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>

          <Input
            placeholder="Parcel weight (kg)"
            type="number"
            step="0.1"
            required={true}
            className="py-5"
            {...register('weight', { required: true, min: 0.1 })}
          />
          <Input
            placeholder="Parcel fee"
            type="number"
            step="0.01"
            required={true}
            className="py-5"
            {...register('fee', { required: true, min: 1 })}
          />
        </div>

        <Card>
          <CardHeader>
            <CardTitle>On behalf of DeliveryPro,</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col md:flex-row items-center gap-4">
            <div>
              <p>
                Your ({loggedInSender?.name}) are , going to send a parcel to
              </p>
            </div>
            <Select
              onValueChange={(value) => setReceiverUserId(value)}
              value={receiverUserId}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select a receiver" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Authorized Receivers</SelectLabel>
                  {allReceivers?.map((user: any) => (
                    <SelectItem key={user._id} value={user._id}>
                      {user.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        {/* from */}
        <Card>
          <CardHeader>
            <CardTitle>From:</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Input
                placeholder="Name"
                type="text"
                required={true}
                className="py-5"
                {...register('senderName', { required: true })}
              />
              <Input
                placeholder="Phone"
                type="tel"
                required={true}
                className="py-5"
                {...register('senderPhone', { required: true })}
              />
              <Input
                placeholder="City"
                type="text"
                required={true}
                className="py-5"
                {...register('senderCity', { required: true })}
              />
              <Input
                placeholder="Area"
                type="text"
                required={true}
                className="py-5"
                {...register('senderArea', { required: true })}
              />
              <Input
                placeholder="Post Code"
                type="text"
                required={true}
                className="py-5"
                {...register('senderPostCode', { required: true })}
              />
              <Input
                placeholder="Full Address"
                type="text"
                required={true}
                className="py-5"
                {...register('senderAddress', { required: true })}
              />
            </div>
          </CardContent>
        </Card>

        {/* to */}
        <Card>
          <CardHeader>
            <CardTitle>To:</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Input
                placeholder="Name"
                type="text"
                required={true}
                className="py-5"
                {...register('receiverName', { required: true })}
              />
              <Input
                placeholder="Phone"
                type="tel"
                required={true}
                className="py-5"
                {...register('receiverPhone', { required: true })}
              />
              <Input
                placeholder="City"
                type="text"
                required={true}
                className="py-5"
                {...register('receiverCity', { required: true })}
              />
              <Input
                placeholder="Area"
                type="text"
                required={true}
                className="py-5"
                {...register('receiverArea', { required: true })}
              />
              <Input
                placeholder="Post Code"
                type="text"
                required={true}
                className="py-5"
                {...register('receiverPostCode', { required: true })}
              />
              <Input
                placeholder="Full Address"
                type="text"
                required={true}
                className="py-5"
                {...register('receiverAddress', { required: true })}
              />
            </div>
          </CardContent>
        </Card>

        <Input
          placeholder="Expected delivery date"
          type="date"
          required={true}
          className="py-5 w-fit mx-auto"
          {...register('expectedDeliveryDate', { required: true })}
        />

        {/* cancel - submit */}
        <div className="flex items-center justify-between gap-4 font-semibold">
          <Button
            type="button"
            variant="outline"
            className="w-28"
            onClick={handleCancel}
            disabled={isCreating}
          >
            Cancel
          </Button>
          <Button type="submit" className="w-28" disabled={isCreating}>
            {isCreating ? 'Creating...' : 'Submit'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ParcelCreateForm;
