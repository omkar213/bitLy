import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

const QrcodeConverter = () => {
  const { user, isSignedIn } = useUser();

  const router = useRouter();

  const handleSubmit = () => {
    console.log("redirect");
    if (!user) {
      router.push("/sign-up");
    }
  };
  return (
    <div className="w-full mx-auto bg-white rounded-[30px] md:rounded-[40px] p-6 sm:p-8 md:p-10 flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-12 shadow-md">
      <div className="flex-1 w-full flex flex-col items-start gap-10">
        <div className="flex flex-col gap-2 items-start">
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-bitly mb-2">
            Create a QR Code
          </h3>
          <p className="text-sm sm:text-base md:text-lg text-bitly">
            No credit card required.
          </p>
        </div>

        <div className="w-full flex flex-col items-start">
          <label
            htmlFor="long-link"
            className="text-sm sm:text-base font-bold text-bitly mb-2"
          >
            Enter your QR Code destination
          </label>
          <input
            type="text"
            id="long-link"
            placeholder="https://example.com/my-long-url"
            className="w-full mb-4 px-4 py-3 sm:py-4 border border-gray-200 rounded-xl text-sm sm:text-base text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
          <button
            type="submit"
            onClick={handleSubmit}
            className="w-full sm:w-fit bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 sm:py-4 px-6 rounded-2xl text-sm sm:text-base transition flex items-center justify-center gap-2"
          >
            Get your QR Code for free →
          </button>
        </div>
      </div>

      <div className="w-full md:w-[350px] bg-[#EEEAE3] border border-[#BAB7B0] rounded-2xl p-4 flex justify-center items-center">
        <Image
          src="/qr-code.png"
          alt="QR code"
          width={300}
          height={300}
          className="w-full h-auto object-contain"
        />
      </div>
    </div>
  );
};

export default QrcodeConverter;
