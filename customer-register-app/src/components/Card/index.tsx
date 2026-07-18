import type React from "react";
import styles from "./styles.module.css";

type TCardProps = {
  children: React.ReactNode;
} & React.ComponentProps<"div">;

export function Card({ children, ...props }: TCardProps) {
  return (
    <div className={styles.content} {...props}>
      {children}
    </div>
  );
}
