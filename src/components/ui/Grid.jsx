import './Grid.css';

const Grid = ({
  children,
  columnsDesktop = 3,
  columnsTablet = 2,
  gap = 'var(--space-6)'
}) => {
  const style = {
    '--grid-columns-desktop': columnsDesktop,
    '--grid-columns-tablet': columnsTablet,
    '--grid-gap': gap,
  };

  return (
    <div className="grid" style={style}>
      {children}
    </div>
  );
};

export default Grid;