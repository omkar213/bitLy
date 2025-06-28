"use client";

import { useState } from "react";
import Navbar from "@/app/components/Navbar/index";
import ActionButton from "@/app/components/Button/index";
import { ACTION_BUTTONS } from "@/app/constants/index";
import LinkShortner from "@/app/components/LinkShortner/index";
import QrcodeConverter from "@/app/components/QrcodeConverter/index";

export default function Home() {
  const [activeButton, setActiveButton] = useState(ACTION_BUTTONS[0].title);

  const handleActiveTab = (title: string) => {
    setActiveButton(title);
  };

  return (
    <main className="w-full h-full overflow-x-hidden">
      <Navbar />
      <article className="bg-bitly text-white">
        <div className="flex flex-col gap-10 pt-12 md:pt-16 lg:pt-20 px-4 sm:px-6 md:px-8 max-w-[1170px] mx-auto text-center">
          <div className="flex flex-col gap-3">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
              Connect with your audience effortlessly
            </h1>
            <p className="mt-4 text-sm sm:text-base md:text-lg max-w-2xl mx-auto">
              Create custom short links, landing pages, and QR codes to drive
              engagement, measure performance, and grow your brand`s reach — all
              from one platform.
            </p>
          </div>
          <div className="flex flex-col gap-10">
            <div className="flex justify-center gap-4 bg-bitly p-5 rounded-lg">
              {ACTION_BUTTONS.map((btn) => (
                <ActionButton
                  key={btn.title}
                  {...btn}
                  active={activeButton === btn.title}
                  onClick={() => handleActiveTab(btn.title)}
                />
              ))}
            </div>
            <div>
              {activeButton === "Short Link" ? (
                <LinkShortner />
              ) : (
                <QrcodeConverter />
              )}
            </div>
          </div>
        </div>
      </article>
    </main>
  );
}
