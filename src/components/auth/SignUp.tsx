import { SignUp } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';

const SignUpPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <SignUp
        routing="path"
        path="/sign-up"
        redirectUrl="/dashboard"
        signInUrl="/sign-in"
        afterSignUp={() => navigate('/dashboard')}
      />
    </div>
  );
};

export default SignUpPage;