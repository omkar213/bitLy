/* eslint-disable @next/next/no-img-element */
import type { ActionButtonProps } from "@/app/types";

const ActionButton = ({ title, img, active, onClick }: ActionButtonProps) => {
  return (
    <button
      onClick={onClick}
      aria-pressed={active}
      className={`flex items-center gap-2 px-4 py-2 rounded-2xl font-medium text-sm transition cursor-pointer
        ${active ? "bg-white text-bitly" : "bg-bitly text-white"}`}
    >
      <img
        src={img}
        alt={`${title} icon`}
        className="w-[35px] h-[35px] lg:w-[70px] lg:h-[50px]"
      />
      <span>{title}</span>
    </button>
  );
};

export default ActionButton;
