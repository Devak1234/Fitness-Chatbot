import './IconButton.css';

const IconButton = ({
  children,
  onClick,
  disabled = false,
  size = 'medium',
  variant = 'default',
  className = '',
  title,
  ...props
}) => {
  return (
    <button
      className={`icon-btn icon-btn-${variant} icon-btn-${size} ${className}`}
      onClick={onClick}
      disabled={disabled}
      title={title}
      {...props}
    >
      {children}
    </button>
  );
};

export default IconButton;