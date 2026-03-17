// components/common/Button.jsx
import { motion } from 'framer-motion'

const variants = {
  primary: 'bg-primary hover:bg-primary-dark text-white',
  outline: 'border border-primary text-primary hover:bg-primary hover:text-white',
  ghost: 'text-white hover:text-primary',
  dark: 'bg-[#1A1A1A] hover:bg-[#252525] text-white border border-[rgba(255,255,255,0.08)]',
}

const sizes = {
  sm: 'px-4 py-2 text-xs',
  md: 'px-5 py-2.5 text-sm',
  lg: 'px-7 py-3.5 text-base',
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  as: Tag = 'button',
  href,
  onClick,
  fullWidth,
  ...props
}) {
  const base = `inline-flex items-center justify-center gap-2 font-body font-600 rounded-2xl transition-all duration-200 cursor-pointer`
  const cls = `${base} ${variants[variant]} ${sizes[size]} ${fullWidth ? 'w-full' : ''} ${className}`

  if (href) {
    return (
      <motion.a
        href={href}
        className={cls}
        whileTap={{ scale: 0.97 }}
        target="_blank"
        rel="noopener noreferrer"
        {...props}
      >
        {children}
      </motion.a>
    )
  }

  return (
    <motion.button
      className={cls}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      {...props}
    >
      {children}
    </motion.button>
  )
}
