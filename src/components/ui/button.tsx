import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-btn font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-care focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 min-h-11 min-w-[44px]",
  {
    variants: {
      intent: {
        primary:
          "orbee-btn-gradient hover:scale-[1.02] shadow-sm",
        ai: "orbee-btn-gradient hover:scale-[1.02] shadow-sm",
        care: "bg-care text-white hover:bg-care/90 rounded-btn",
        outline:
          "border-2 border-care bg-white text-navy hover:bg-teal-50 rounded-btn",
        ghost: "text-navy hover:bg-muted rounded-btn",
      },
      size: {
        sm: "h-9 px-4 text-sm",
        md: "h-11 px-6 text-base",
        lg: "h-12 px-8 text-lg",
      },
    },
    defaultVariants: {
      intent: "primary",
      size: "md",
    },
  },
);

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, intent, size, type = "button", ...props }, ref) => (
    <button
      ref={ref}
      type={type}
      className={cn(buttonVariants({ intent, size }), className)}
      {...props}
    />
  ),
);
Button.displayName = "Button";

export { buttonVariants };
