import { useNavigate } from 'react-router-dom';
import { useSignIn } from '@clerk/clerk-react';
// Assuming existing landing page content
const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="landing-page">
      {/* Existing hero/content */}
      <button onClick={() => navigate('/sign-in')}>Sign In</button>
      <button onClick={() => navigate('/sign-up')}>Sign Up</button>
    </div>
  );
};

export default Index;
