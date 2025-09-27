import { useUser, SignOutButton } from '@clerk/clerk-react';
import { SignedIn } from '@clerk/clerk-react';
// Assuming existing header content
const Header = () => {
  const { user } = useUser();

  return (
    <header>
      {/* Existing nav links */}
      <SignedIn>
        <div>
          {user?.fullName}
          <SignOutButton />
        </div>
      </SignedIn>
    </header>
  );
};

export default Header;
