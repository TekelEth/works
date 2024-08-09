import { VariantProps, cva } from 'class-variance-authority';
import { HTMLAttributes } from 'react';
import { cn } from '../../../utilities/class-names';

const cardVariants = cva(
  'flex flex-col  w-full justify-center cursor-pointer h-[122px] px-[25px] ',
  {
    variants: {
      variant: {
        default:
          'rounded-[10px] hover:bg-primary-gradient bg-transparent border border-[#302E2E]',
        active: 'bg-primary-100 border-none',
        outline: 'bg-[#FB72001A] text-white border border-[#FB7200CC]',
        white: 'bg-white border-none rounded-[28px]',
      },
      size: {
        lg: 'h-[244px] rounded-[20px]',
        sm: 'h-[122px] rounded-[10px]',
        md: 'h-[204px] rounded-[10px]',
        xl: 'min-h-[200px]',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export interface Div extends HTMLAttributes<HTMLElement> {}
export interface CardProps extends Div, VariantProps<typeof cardVariants> {}

const CardLayout = ({
  children,
  variant,
  size,
  className,
  ...props
}: CardProps) => {
  return (
    <div className={cn(cardVariants({ variant, size, className }))} {...props}>
      {children}
    </div>
  );
};

export default CardLayout;
