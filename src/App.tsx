import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { SignedIn, SignedOut, RedirectToSignIn } from '@clerk/clerk-react';
import LandingPage from './pages/LandingPage.tsx'; // Assuming this exists
import NotFound from './pages/NotFound.tsx'; // Assuming this exists
import Ideas from './pages/Ideas.tsx'; // We'll create this
import SignInPage from './pages/SignIn.tsx'; // We'll create this
import SignUpPage from './pages/SignUp.tsx'; // We'll create this

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/sign-in" element={<SignInPage />} />
        <Route path="/sign-up" element={<SignUpPage />} />
        {/* Protected Route */}
        <Route
          path="/ideas"
          element={
            <>
              <SignedIn>
                <Ideas />
              </SignedIn>
              <SignedOut>
                <RedirectToSignIn />
              </SignedOut>
            </>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
