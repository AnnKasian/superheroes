import { ICON_SIZE } from "~/libs/constants/constants.js";

import { Icon } from "../../atoms/atoms.js";
import { type IconName } from "../../atoms/icon/libs/types/types.js";
import styles from "./styles.module.css";

type Properties = {
  iconName: IconName;
  isDisabled?: boolean;
  label: string;
  onClick: () => void;
};

const IconButton = ({
  iconName,
  onClick,
  label,
  isDisabled = false,
}: Properties): JSX.Element => {
  return (
    <button
      aria-label={label}
      className={styles["icon-button"]}
      disabled={isDisabled}
      onClick={onClick}
      type="button"
    >
      <Icon height={ICON_SIZE} name={iconName} width={ICON_SIZE} />
    </button>
  );
};

export { IconButton };
