import styles from "./styles.module.css";

type Properties = {
  children: React.ReactNode;
  isForm?: boolean;
  onClick?: (event: MouseEvent) => void;
  onRemove?: () => void;
};

const Badge = ({
  children,
  isForm = false,
  onRemove,
}: Properties): JSX.Element => {
  return isForm ? (
    <div className={styles["badge-form"]}>
      {children}
      <button
        className={styles["remove-icon"]}
        onClick={(event) => {
          event.preventDefault();
          onRemove?.();
        }}
      >
        x
      </button>
    </div>
  ) : (
    <div className={styles["badge"]}>{children}</div>
  );
};

export { Badge };
