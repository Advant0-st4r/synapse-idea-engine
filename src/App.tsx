import { Routes, Route, Navigate } from 'react-router-dom';
import { SignedIn, SignedOut, RedirectToSignIn } from '@clerk/clerk-react';
import Index from './pages/Index.tsx';
import NotFound from './pages/NotFound.tsx';
import SignInPage from './components/auth/SignIn.tsx';
import SignUpPage from './components/auth/SignUp.tsx';
// Import other feature components (e.g., Ideas, Insights) assuming they exist
import Ideas from './components/ideas/Ideas.tsx'; // Adjust paths as needed
// ... other imports for protected pages

const ProtectedRoute = ({ children }: { children: JSX.Element }) => (
  <>
    <SignedIn>{children}</SignedIn>
    <SignedOut>
      <RedirectToSignIn />
    </SignedOut>
  </>
);

function App() {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/sign-in" element={<SignInPage />} />
      <Route path="/sign-up" element={<SignUpPage />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <div>{/* Dashboard layout with Header and features */}</div>
          </ProtectedRoute>
        }
      />
      {/* Add protected routes for features */}
      <Route path="/ideas" element={<ProtectedRoute><Ideas /></ProtectedRoute>} />
      {/* ... other protected routes */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
