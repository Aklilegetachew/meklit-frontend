import { ReactNode, InputHTMLAttributes } from "react"

interface InputFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  inputSize?: "sm" | "md" 
  variant?: "primary" | "outline" 
  startIcon?: ReactNode 
  endIcon?: ReactNode 
  className?: string 
}

export const InputField: React.FC<InputFieldProps> = ({
  inputSize = "md",
  variant = "primary",
  startIcon,
  endIcon,
  className = "",
  ...props
}) => {
  // Size Classes
  const sizeClasses = {
    sm: "px-3 py-2 text-sm",
    md: "px-4 py-3 text-sm",
  }

  // Variant Classes
  const variantClasses = {
    primary:
      "bg-brand-50 text-gray-900 placeholder-gray-400 border border-brand-300 focus:border-brand-500 focus:ring-1 focus:ring-brand-500 rounded-lg",
    outline:
      "bg-white text-gray-700 placeholder-gray-400 border border-gray-300 focus:border-gray-500 focus:ring-1 focus:ring-gray-500 rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:placeholder-gray-500 dark:border-gray-700 dark:focus:border-gray-500 dark:focus:ring-gray-500",
  }

  return (
    <div className={`relative flex items-center ${className}`}>
      {startIcon && (
        <span className="absolute left-3 flex items-center">{startIcon}</span>
      )}
      <input
        className={`w-full rounded-lg transition ${sizeClasses[inputSize]} ${
          variantClasses[variant]
        } ${startIcon ? "pl-10" : ""} ${endIcon ? "pr-10" : ""}`}
        {...props}
      />
      {endIcon && (
        <span className="absolute right-3 flex items-center">{endIcon}</span>
      )}
    </div>
  )
}

export default InputField
