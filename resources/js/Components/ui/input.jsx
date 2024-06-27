import * as React from "react"
import { cn } from "@/lib/utils.js"
import { cva } from "class-variance-authority";

const InputVariants = cva(
    "flex h-9 w-full rounded-md border border-input focus:border-input focus:border focus:ring-input  bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50",
    {
        variants: {
            variant: {
                default: "",
                destructive:
                    "bg-destructive text-destructive-foreground hover:bg-destructive/90",
                outline:
                    "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
                secondary:
                    "bg-secondary text-secondary-foreground hover:bg-secondary/80",
                ghost: "hover:bg-accent hover:text-accent-foreground",
                link: "text-primary underline-offset-4 hover:underline",
                activity: "text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 bg-white border-none border rounded border-gray-400 text-large shadow-md ring-1 ring-gray-200 focus-visible:border-0",
            },
            size: {
                default: "h-10 px-4 py-2",
                sm: "h-9 rounded-md px-3",
                lg: "h-11 rounded-md px-8",
                icon: "h-10 w-10",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    }
)

const Input = React.forwardRef(({ className, type, variant, size, ...props }, ref) => {
    return (
        <input
            type={type}
            className={cn(InputVariants({ variant, size, className }))}
            ref={ref}
            {...props} />
    );
})
Input.displayName = "Input"

export { Input, InputVariants }
