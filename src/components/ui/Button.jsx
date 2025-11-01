import React from 'react';

const Button = ({ 
  children, 
  onClick, 
  variant = 'primary',
  size = 'medium',
  className = '',
  disabled = false,
  type = 'button',
  ...props 
}) => {
  const baseClasses = 'group relative overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-all duration-300 ease-out font-semibold tracking-wide';
  
  const variants = {
    primary: 'bg-gradient-to-r from-gray-700 to-gray-800 text-gray-100 hover:from-purple-600 hover:to-indigo-600',
    secondary: 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:from-gray-700 hover:to-gray-800',
    ghost: 'bg-transparent border border-gray-600 text-gray-300 hover:border-purple-500 hover:text-purple-400'
  };
  
  const sizes = {
    small: 'px-4 py-2 text-sm',
    medium: 'px-6 py-3 text-base',
    large: 'px-8 py-4 text-lg'
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        ${baseClasses}
        ${variants[variant]}
        ${sizes[size]}
        ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
        ${className}
      `}
      {...props}
    >
      <span className="relative z-10 group-hover:text-white transition-colors duration-300">
        {children}
      </span>
      {variant === 'primary' && (
        <span className="absolute inset-0 bg-gradient-to-r from-purple-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      )}
    </button>
  );
};

export default Button;