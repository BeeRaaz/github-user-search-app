interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
}

function Button({ children, className, ...props }: ButtonProps) {
  return (
    <button
      {...props}
      className={`inline-flex justify-center items-center gap-5 py-2 px-5 bg-black text-white border border-black rounded-sm text-lg font-medium transition-all duration-300 ${className}
        ${props.disabled 
          ? 'opacity-50 cursor-not-allowed hover:bg-black hover:text-white' 
          : 'cursor-pointer hover:bg-transparent hover:text-black'
        }`}
    >
      {children}
    </button>
  );
}

export default Button;
