import { VariantProps, cva } from "class-variance-authority";
import { ComponentProps } from "react";
import { cn } from "../../../utilities/class-names";

type ButtonType = ComponentProps<'button'> & ComponentProps<'a'>;
export interface BaseButtonProps extends ButtonType {}

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-[5px] font-poppins gap-2.5 font-outfit transition-colors disabled:pointer-events-none duration-300 font-medium disabled:cursor-not-allowed disabled:opacity-70',
    {
        variants: {
            variant: {
                default: 'text-white bg-primary-gradient',
                primary: 'text-white bg-primary-100 border-none',
                outline: 'bg-[#FB72001A] text-white border border-[#FB7200CC]'
            },
            size: {
                default: 'w-[227px] font-[14px] h-[43px] p-[10px]'
            },
            fullWidth: {
                true: 'w-full'
            }
        },
        defaultVariants: {
            variant: 'default',
            size: 'default'
        }
    }
)

export interface ButtonProps extends BaseButtonProps, VariantProps<typeof buttonVariants> {}


const Button = ({ variant, size, fullWidth, className, ...props }: ButtonProps) => {
  return (
    <button
    className={cn(buttonVariants({ variant, size, className, fullWidth }))}
    {...props}
    />
  )
}

export default Button