import { Header, Loader } from "~/libs/components/components.js";

import styles from "./styles.module.css";

type Properties = {
  children: React.ReactNode;
  isLoading?: boolean;
};

const PageTemplate = ({
  children,
  isLoading = false,
}: Properties): JSX.Element => {
  return (
    <div className={styles["page"]}>
      <div className={styles["page-header"]}>
        <Header />
      </div>
      <div className={styles["page-body"]}>
        <main className={styles["page-content"]}>
          {isLoading ? <Loader /> : <>{children}</>}
        </main>
      </div>
    </div>
  );
};

export { PageTemplate };
