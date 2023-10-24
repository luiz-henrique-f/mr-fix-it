import { ComponentPropsWithoutRef } from "react";
import { twMerge } from "tailwind-merge";
import { HiPencil } from 'react-icons/hi'

interface ButtonProps extends ComponentPropsWithoutRef<"button"> {
  variant?: "primary" | "secondary";
}

function ChangeButton({ className, variant = "primary", ...props }: ButtonProps) {
  const variantClasses = {
    primary: "bg-white dark:bg-darkBGLighter text-grayLighter hover:text-white hover:bg-grayLighter dark:hover:bg-grayPrimary",
    secondary: "bg-whiteBG dark:bg-darkBG dark:text-white text-black hover:bg-grayLighter dark:hover:bg-grayPrimary",
  };

  const _className = twMerge(variantClasses[variant], "appearance-none rounded-md p-2 transition-all", className);

  return (
    <button className={_className} {...props} title="Editar">
      <div className="flex justify-center items-center">
        <HiPencil className="cursor-pointer text-xl"/>
      </div>
    </button>
  );
}

export default ChangeButton;