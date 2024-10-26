import { Button } from "../../components.js";
import styles from "./styles.module.css";

type Propertiess = {
  isDisabled?: boolean;
  onDiscard: () => void;
};

const FormActions = ({
  onDiscard,
  isDisabled = false,
}: Propertiess): JSX.Element => {
  return (
    <div className={styles["button-container"]}>
      <div className={styles["button"]}>
        <Button label="Discard" onClick={onDiscard} />
      </div>
      <div className={styles["button"]}>
        <Button isDisabled={isDisabled} label="Submit" type="submit" />
      </div>
    </div>
  );
};

export { FormActions };
