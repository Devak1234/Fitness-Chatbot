import { memo } from 'react';
import Card from './Card';
import ButtonGroup from './ButtonGroup';
import './DayCard.css';

const DayCard = memo(({
  dayName,
  metaText,
  isExpanded = false,
  onView,
  onRegenerate,
  onEdit,
  children,
  className = '',
  ...props
}) => {
  const buttons = [
    {
      children: isExpanded ? 'Hide Exercises' : 'View Exercises',
      onClick: onView,
      ariaLabel: isExpanded ? `Hide exercises for ${dayName}` : `View exercises for ${dayName}`,
      variant: 'outline'
    },
    {
      children: '🔄 Regenerate',
      onClick: onRegenerate,
      ariaLabel: `Regenerate exercises for ${dayName}`,
      variant: 'outline'
    },
    {
      children: '✏️ Edit',
      onClick: onEdit,
      ariaLabel: `Edit exercises for ${dayName}`,
      variant: 'outline'
    }
  ];

  return (
    <Card
      className={`day-card ${className}`}
      title={dayName}
      subtitle={metaText}
      actions={<ButtonGroup buttons={buttons} />}
      {...props}
    >
      {children}
    </Card>
  );
});

DayCard.displayName = 'DayCard';

export default DayCard;