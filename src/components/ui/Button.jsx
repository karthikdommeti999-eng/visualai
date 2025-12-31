import { cn } from '../../lib/utils';

export const Button = ({
    children,
    variant = 'primary',
    size = 'md',
    className,
    ...props
}) => {
    const variants = {
        primary: 'bg-gradient-to-r from-brand-teal to-brand-cyan text-dark-900 font-bold hover:shadow-[0_0_30px_rgba(0,240,255,0.4)] hover:scale-[1.02]',
        secondary: 'bg-white/5 border border-white/10 text-white hover:bg-white/10 hover:border-brand-teal/30 hover:shadow-[0_0_20px_rgba(0,240,255,0.1)]',
        ghost: 'text-gray-400 hover:text-white',
        outline: 'border border-brand-teal/50 text-brand-teal hover:bg-brand-teal/10',
    };

    const sizes = {
        sm: 'px-4 py-2 text-sm rounded-xl',
        md: 'px-6 py-3 text-base rounded-2xl',
        lg: 'px-8 py-4 text-lg font-bold rounded-2xl',
        icon: 'p-2 rounded-xl'
    };

    return (
        <button
            className={cn(
                'transition-all duration-300 active:scale-95 flex items-center justify-center gap-2 relative overflow-hidden',
                variants[variant],
                sizes[size],
                className
            )}
            {...props}
        >
            {children}
        </button>
    );
};
