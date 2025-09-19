import LoginForm from '@/components/modules/auth/LoginForm';
import { loggedInUser } from '@/redux/features/auth/authSlice';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

const LoginPage = () => {
  const loggedInData = useSelector(loggedInUser);
  const navigate = useNavigate();

  useEffect(() => {
    if (loggedInData?.name || loggedInData?.email) {
      navigate('/');
    }
  }, [loggedInData?.name, loggedInData?.email, navigate]);

  return (
    <div className="py-12 flex items-center justify-center">
      <LoginForm />
    </div>
  );
};
export default LoginPage;
