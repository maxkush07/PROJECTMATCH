import * as React from "react"
import { cn } from "@/lib/utils"

export interface AvatarProps
  extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallback?: string
}

const Avatar = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement> & { src?: string; alt?: string; fallback?: string }>((
  { className, src, alt = "Avatar", fallback, ...props },
  ref
) => {
  const [isLoaded, setIsLoaded] = React.useState(false)

  return (
    <div
      ref={ref}
      className={cn(
        "relative inline-flex items-center justify-center h-10 w-10 rounded-full bg-card border border-border overflow-hidden",
        className
      )}
      {...props}
    >
      {src && (
        <img
          src={src}
          alt={alt}
          className={cn("h-full w-full object-cover", !isLoaded && "hidden")}
          onLoad={() => setIsLoaded(true)}
        />
      )}
      {(!src || !isLoaded) && fallback && (
        <span className="text-xs font-semibold text-foreground">{fallback}</span>
      )}
    </div>
  )
})
Avatar.displayName = "Avatar"

export { Avatar }
