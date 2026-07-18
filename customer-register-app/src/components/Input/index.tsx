import styles from "./styles.module.css";
type TInputProps = {
  label?: string;
  id: string;
} & React.ComponentProps<"input">;

export function Input({ id, label, type, placeholder, ...props }: TInputProps) {
  return (
    <>
      {!!label && (
        <label className={styles.label} htmlFor={id}>
          {label}
        </label>
      )}
      <input
        placeholder={placeholder}
        className={styles.input}
        id={id}
        type={type}
        {...props}
      />
    </>
  );
}
