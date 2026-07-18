import type React from 'react';
import styles from './styles.module.css';

type TWrapperProps = {
  children: React.ReactNode;
} & React.ComponentProps<'div'>;

export function Wrapper({ children, ...props }: TWrapperProps) {
  return (
    <div className={styles.content} {...props}>
      {children}
    </div>
  );
}
