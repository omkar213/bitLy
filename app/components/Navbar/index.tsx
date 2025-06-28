import { UserButton, useUser } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
  const { isSignedIn, user } = useUser();
  return (
    <header className="w-full bg-bitly text-white h-20 flex justify-center items-center">
      <div className="max-w-7xl w-full px-4 sm:px-6 flex items-center justify-between">
        <div className="relative h-10 w-24 sm:h-12 sm:w-28">
          <Image
            src="/bitly_logo.svg"
            alt="logo"
            fill
            className="object-contain"
            priority
          />
        </div>

        <div className="flex items-center gap-4 sm:gap-6 text-sm font-medium">
          {isSignedIn ? (
            <>
              <span className="hidden sm:inline text-white">
                {user.fullName}
              </span>
              <UserButton />
            </>
          ) : (
            <>
              <Link href="/sign-in" className="hover:text-orange-400">
                Log In
              </Link>
              <Link
                href="/sign-up"
                className="bg-white text-[#031f39] px-3 py-1 sm:px-4 rounded-md hover:text-orange-400 transition"
              >
                Sign up Free
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
