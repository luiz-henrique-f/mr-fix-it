import { ComponentPropsWithoutRef } from "react";
import { twMerge } from "tailwind-merge";

interface ButtonProps extends ComponentPropsWithoutRef<"button"> {
  variant?: "primary" | "primaryLight" | "outlined" | "login" | "sidebar" | "icon" | "dropbar" | "custom1";
}

function Button({ className, variant = "primary", ...props }: ButtonProps) {
  const variantClasses = {
    primary: "text-white py-2 px-4 text-sm gap-2 uppercase bg-primary border-2 border-transparent hover:bg-primaryDarker items-center justify-center",
    primaryLight: "text-white py-2 px-4 text-sm gap-2 uppercase bg-primaryLighter hover:bg-primaryDarker items-center justify-center",
    outlined: "text-black py-2 px-4 text-sm dark:text-white gap-2 uppercase bg-transparent border-2 border-black/50 dark:border-white/70 hover:bg-primary hover:border-primary dark:hover:border-primary hover:text-white items-center justify-center",
    login: "text-white rounded-lg uppercase w-full 2sm:w-3/4 md:w-3/5 2md:w-4/5 xl:w-3/5 mt-4 cursor-pointer dark:bg-primaryLighter bg-primary hover:bg-primaryDarker tracking-wide py-3 px-11 items-center justify-center",
    sidebar: "cursor-pointer p-2 gap-4 group-hover:bg-gray-400/20 rounded-lg w-full justify-center group-hover/sidebar:justify-start items-center",
    icon: "cursor-pointer p-2 hover:text-primary w-full justify-center justify-center items-center",
    dropbar: "text-black dark:text-white text-sm font-semibold gap-2 justify-start items-center group-hover:bg-gray-400/30 p-2 w-full",
    custom1: "relative bg-primary hover:bg-primaryDarker p-4 w-56 h-full text-white transform gap-2 items-center justify-center",
  };

  const _className = twMerge(variantClasses[variant], "flex appearance-none rounded-md font-semibold transition-all duration-[0.3s] ease-[ease-in-out] hover:transition-all hover:duration-[0.3s] hover:ease-[ease-in-out]", className);

  return (
    <button className={_className} {...props}>
    </button>
  );
}

export default Button;