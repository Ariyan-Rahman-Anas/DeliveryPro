/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from '@/components/ui/button';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Link, useNavigate } from 'react-router';
import PasswordField from './PasswordField';
import { useForm } from 'react-hook-form';
import type { RegistrationFormData } from '@/types';
import { useCreateUserMutation } from '@/redux/features/auth/authApi';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { toast } from 'sonner';
import { useState } from 'react';

const RegistrationForm = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, setValue } = useForm<RegistrationFormData>();
  const [selectedRole, setSelectedRole] = useState('SENDER');

  const [createUser, { isLoading }] = useCreateUserMutation();

  const handleFormSubmit = async (data: RegistrationFormData) => {
    const formData = {
      ...data,
      role: selectedRole,
    };

    try {
      const registrationRes = await createUser(formData).unwrap();
      toast.success(registrationRes?.message);
      navigate('/login');
    } catch (error: unknown) {
      if (typeof error === 'object' && error !== null) {
        const err = error as {
          data?: { errorSources?: Array<{ message?: string }> };
          status?: string | number;
        };
        if (err.data?.errorSources?.[0]?.message) {
          toast.error(err.data.errorSources[0].message);
        } else if ((err as any)?.data?.message) {
          toast.error((err as any)?.data?.message);
        } else {
          toast.error('An unexpected error occurred');
        }
      } else {
        toast.error('An unexpected error occurred');
      }
    }
  };

  // Handle role selection
  const handleRoleChange = (value: string) => {
    setSelectedRole(value);
    setValue('role', value as 'SENDER' | 'RECEIVER');
  };

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Sign up Parcel D.</CardTitle>
        <CardDescription>
          We just need a few details to get you started.
        </CardDescription>
        <CardAction>
          <Link to="/login">
            <Button variant="link" className="cursor-pointer">
              Login
            </Button>
          </Link>
        </CardAction>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
          <div className="flex flex-col gap-6">
            <RadioGroup
              value={selectedRole}
              onValueChange={handleRoleChange}
              className="flex items-center gap-6"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem
                  value="SENDER"
                  id="sender"
                  className="border border-primary"
                />
                <Label htmlFor="sender">Sender</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem
                  value="RECEIVER"
                  id="receiver"
                  className="border border-primary"
                />
                <Label htmlFor="receiver">Receiver</Label>
              </div>
            </RadioGroup>
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="Ariyan Rahman Anas"
                {...register('name', { required: true })}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                {...register('email', { required: true })}
              />
            </div>

            <PasswordField
              id="password"
              name="password"
              register={register}
              showForgotPassword={false}
            />
          </div>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? 'Creating account...' : 'Registration'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
export default RegistrationForm;
