import type React from "react";
import styles from "./styles.module.css";

type TButtonProps = {
  title: string;
} & React.ComponentProps<"button">;

export function Button({ title, ...props }: TButtonProps) {
  return (
    <button className={styles.button} {...props}>
      <span>{title}</span>
    </button>
  );
}
