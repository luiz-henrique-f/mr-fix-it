import { ComponentPropsWithoutRef } from "react";
import { twMerge } from "tailwind-merge";

interface ButtonProps extends ComponentPropsWithoutRef<"button"> {
  variant?: "primary" | "outlined";
}

function Button({ className, variant = "primary", ...props }: ButtonProps) {
  const variantClasses = {
    primary: "text-white items-center justify-center gap-2 uppercase bg-primary hover:bg-primaryDarker",
    outlined: "text-black dark:text-white items-center justify-center gap-2 uppercase bg-transparent border-2 border-solid border-black/50 dark:border-white/70 hover:bg-primary hover:border-primary dark:hover:border-primary hover:text-white",
  };

  const _className = twMerge(variantClasses[variant], "flex appearance-none rounded-md py-2 px-4 text-sm font-semibold transition-all duration-[0.3s] ease-[ease-in-out] hover:transition-all hover:duration-[0.3s] hover:ease-[ease-in-out]", className);

  return (
    <button className={_className} {...props}>
    </button>
  );
}

export default Button;