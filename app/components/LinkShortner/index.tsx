import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import React from "react";

const LinkShortner = () => {
  const { user, isSignedIn } = useUser();

  const router = useRouter();

  const handleSubmit = () => {
    console.log("redirect");
    if (!user) {
      router.push("/sign-up");
    }
  };

  return (
    <div className="w-full bg-white rounded-[40px] sm:rounded-[50px] md:rounded-[60px] px-4 sm:px-6 md:px-8 py-8 sm:py-9 flex flex-col gap-6 sm:gap-8 md:gap-10 items-start text-left mx-auto">
      <div className="flex flex-col items-start gap-3 sm:gap-4 pb-3 sm:pb-5">
        <h3 className="text-xl sm:text-2xl md:text-3xl text-bitly font-semibold">
          Shorten a long link
        </h3>
        <p className="text-sm sm:text-base md:text-xl text-bitly">
          No credit card required
        </p>
      </div>
      <div className="w-full flex flex-col items-start">
        <label
          htmlFor="long-link"
          className="block text-bitly font-bold text-sm sm:text-base mb-2"
        >
          Paste your long link here
        </label>
        <input
          type="text"
          id="long-link"
          placeholder="https://example.com/my-long-url"
          className="w-full px-4 py-3 sm:px-5 sm:py-4 border border-gray-200 rounded-xl text-gray-600 placeholder:text-gray-500 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />
      </div>
      <button
        type="submit"
        onClick={handleSubmit}
        className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 cursor-pointer transition text-white font-bold py-3 sm:py-4 px-6 rounded-2xl text-sm sm:text-base flex justify-center items-center gap-2"
      >
        Get your link for free
      </button>
    </div>
  );
};

export default LinkShortner;
