import { ReactElement, CSSProperties } from 'react';

type iconType = {
  name: string;
  className?: string;
  width?: string;
  height?: string;
  onClick?: () => void;
  style?: CSSProperties;
};

const Icon = ({
  name,
  className,
  width,
  height,
  style,
  onClick,
}: iconType): ReactElement => {
  const classes: string = className ? `icon ${className}` : 'icon'; 
  return (
    <svg style={style} className={classes} width={width} height={height} onClick={onClick}>
      <use xlinkHref={`#${name}`} />
    </svg>
  );
};

export default Icon;
