import styles from "./styles.module.css";

export type TColorOptions = {
  label: string;
  value: string;
  color: string;
};

type TSelectProps = {
  title: string;
  options: Array<TColorOptions>;
  onChange(e: React.ChangeEvent<HTMLSelectElement>): void;
  value: string;
};

export default function Select({
  title,
  options,
  onChange,
  value,
}: TSelectProps) {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(event);
  };

  return (
    <div className={styles.selectWrapper}>
      <div>
        <label htmlFor="select">{title}</label>
      </div>
      <div style={{ width: "100%" }}>
        <select
          id="select"
          value={value}
          onChange={handleChange}
          className={styles.select}
        >
          <option value="" disabled>
            Cor preferida
          </option>
          {options.map((option, i) => (
            <option key={i} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
