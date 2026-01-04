import { memo } from 'react';
import Button from './Button';
import './ButtonGroup.css';

const ButtonGroup = memo(({
  buttons = [],
  className = '',
  ...props
}) => {
  return (
    <div className={`button-group ${className}`} {...props}>
      {buttons.map((button, index) => (
        <Button
          key={index}
          variant={button.variant || 'outline'}
          size={button.size || 'small'}
          onClick={button.onClick}
          disabled={button.disabled}
          aria-label={button.ariaLabel}
          className={button.className}
        >
          {button.children}
        </Button>
      ))}
    </div>
  );
});

ButtonGroup.displayName = 'ButtonGroup';

export default ButtonGroup;