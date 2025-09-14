import type { ReactNode } from 'react';

interface SectionContainerPropsI {
  children: ReactNode;
  className?: string;
}

const SectionContainer = ({ children, className = '' }: SectionContainerPropsI) => (
  <div className={`py-16 ${className}`}>
    <div className="container mx-auto px-4">{children}</div>
  </div>
);
export default SectionContainer;
