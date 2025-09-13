import { useState } from 'react';
import { type UseFormRegister } from 'react-hook-form';
import { EyeIcon, EyeOffIcon } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

interface PasswordFieldProps {
  id: string;
  name: string;
  placeholder?: string;
  isRequired?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register: UseFormRegister<any>;
  label?: string;
  showForgotPassword?: boolean;
}

const PasswordField = ({
  id,
  name,
  placeholder = 'Password',
  isRequired = true,
  register,
  label = 'Password',
  showForgotPassword = true,
}: PasswordFieldProps) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  return (
    <div className="grid gap-2">
      <div className="flex items-center">
        <Label htmlFor={id}>{label}</Label>
        {showForgotPassword && (
          <a
            href="#"
            className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
          >
            Forgot your password?
          </a>
        )}
      </div>

      <div className="relative">
        <Input
          id={id}
          className="pe-9"
          placeholder={placeholder}
          type={isVisible ? 'text' : 'password'}
          {...register(name, { required: isRequired })}
        />
        <button
          className="text-muted-foreground/80 hover:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-md transition-[color,box-shadow] outline-none focus:z-10 focus-visible:ring-[3px] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
          type="button"
          onClick={() => setIsVisible(!isVisible)}
          aria-label={isVisible ? 'Hide password' : 'Show password'}
          aria-pressed={isVisible}
          aria-controls={id}
        >
          {isVisible ? (
            <EyeOffIcon size={16} aria-hidden="true" />
          ) : (
            <EyeIcon size={16} aria-hidden="true" />
          )}
        </button>
      </div>
    </div>
  );
};

export default PasswordField;
