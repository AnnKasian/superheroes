import styles from "./styles.module.css";

type Properties = {
  message?: string;
};

const ErrorMessage = ({ message }: Properties): JSX.Element => {
  return message ? (
    <div className={styles["error-message"]}>{message}</div>
  ) : (
    <></>
  );
};

export { ErrorMessage };
