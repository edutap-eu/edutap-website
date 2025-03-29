import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const containerVariants = cva("container mx-auto px-4 sm:px-6 lg:px-8", {
  variants: {
    size: {
      sm: "max-w-screen-lg",
      md: "max-w-screen-xl",
      lg: "max-w-screen-2xl",
    },
  },
  defaultVariants: {
    size: "lg",
  },
});

export interface ContainerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof containerVariants> {
  as?: React.ElementType;
}

const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, size, as: Component = "div", ...props }, ref) => {
    return (
      <Component
        ref={ref}
        className={containerVariants({ size, className })}
        {...props}
      />
    );
  },
);
Container.displayName = "Container";

export { Container, containerVariants };
