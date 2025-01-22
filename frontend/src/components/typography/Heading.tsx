interface PHeading {
  children: React.ReactNode;
  className?: string;
}

export const H1: React.FC<PHeading> = ({ children, className = '' }) => {
  return <h1 className={'text-heading1 font-bold ' + className}>{children}</h1>;
};
export const H2: React.FC<PHeading> = ({ children, className = '' }) => {
  return <h2 className={'text-heading2 font-bold ' + className}>{children}</h2>;
};
export const H3: React.FC<PHeading> = ({ children, className = '' }) => {
  return <h3 className={'text-heading3 font-bold ' + className}>{children}</h3>;
};
export const H4: React.FC<PHeading> = ({ children, className = '' }) => {
  return <h4 className={'text-heading4 font-bold ' + className}>{children}</h4>;
};
