import RegistrationForm from '@/components/modules/auth/RegistrationForm';
import { loggedInUser } from '@/redux/features/auth/authSlice';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';

const RegistrationPage = () => {
  const loggedInData = useSelector(loggedInUser);
  const navigate = useNavigate();

  useEffect(() => {
    if (loggedInData?.name || loggedInData?.email) {
      navigate('/');
    }
  }, [loggedInData?.name, loggedInData?.email, navigate]);

  return (
    <div className="py-12 flex items-center justify-center">
      <RegistrationForm />
    </div>
  );
};
export default RegistrationPage;
