import { memo } from 'react';
import './Card.css';

const Card = memo(({
  children,
  className = '',
  title,
  subtitle,
  actions,
  compact = false,
  ...props
}) => {
  return (
    <div className={`card ${compact ? 'card-compact' : ''} ${className}`} {...props}>
      {(title || subtitle || actions) && (
        <div className="card-header">
          <div className="card-title-section">
            {title && <h3 className="card-title">{title}</h3>}
            {subtitle && <p className="card-subtitle">{subtitle}</p>}
          </div>
          {actions && (
            <div className="card-actions">
              {actions}
            </div>
          )}
        </div>
      )}
      <div className="card-content">
        {children}
      </div>
    </div>
  );
});

Card.displayName = 'Card';

export default Card;