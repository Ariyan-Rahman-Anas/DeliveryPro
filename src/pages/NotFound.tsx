import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router';

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-6 py-12">
      <h1 className="text-9xl font-extrabold text-gray-800 tracking-widest">
        404
      </h1>
      <p className="mt-4 text-2xl font-semibold text-gray-700">
        Page Not Found
      </p>
      <p className="mt-2 text-gray-500">
        Sorry, the page you’re looking for doesn’t exist or has been moved.
      </p>

      <div className="mt-6 flex gap-4">
        <Button
          variant="outline"
          onClick={() => navigate(-1)}
          className="bg-muted-foreground/30 w-28 py-5"
        >
          Go Back
        </Button>
        <Button onClick={() => navigate('/')} className="w-28 py-5">
          Go to Home
        </Button>
      </div>
    </div>
  );
}
