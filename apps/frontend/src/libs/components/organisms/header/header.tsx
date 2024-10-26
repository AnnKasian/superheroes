import { Title } from "~/libs/components/components.js";

import styles from "./styles.module.css";

const Header = (): JSX.Element => {
  return (
    <header className={styles["header"]}>
      <Title />
    </header>
  );
};

export { Header };
