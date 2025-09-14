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
import { useUserLoginMutation } from '@/redux/features/auth/authApi';
import { Link, useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import PasswordField from './PasswordField';
import { toast } from 'sonner';
import { useDispatch } from 'react-redux';
import { setUser } from '@/redux/features/auth/authSlice';
import type { LoginFormData } from '@/types';

const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm<LoginFormData>();

  const [userLogin, { isLoading }] = useUserLoginMutation();

  const handleFormSubmit = async (data: LoginFormData) => {
    try {
      const loginRes = await userLogin(data).unwrap();
      if (loginRes.success) {
        toast.success(loginRes?.message);
        dispatch(setUser(loginRes.data));
        navigate('/');
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error?.data?.message);
    }
  };

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Welcome Back</CardTitle>
        <CardDescription>
          Enter your credentials to login to your account.
        </CardDescription>
        <CardAction>
          <Link to="/registration">
            <Button variant="link" className="cursor-pointer">
              Registration
            </Button>
          </Link>
        </CardAction>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                {...register('email', { required: true })}
              />
            </div>

            <PasswordField id="password" name="password" register={register} />
          </div>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? 'Logging in...' : 'Login'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
export default LoginForm;