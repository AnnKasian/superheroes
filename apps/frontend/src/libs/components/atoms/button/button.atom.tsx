import { NavLink } from "react-router-dom";

import styles from "./styles.module.css";

type Properties = {
  href?: string | undefined;
  isDisabled?: boolean;
  label: string;
  onClick?: () => void;
  type?: "button" | "submit";
};

const Button = ({
  href,
  isDisabled = false,
  label,
  onClick,
  type = "button",
}: Properties): JSX.Element => {
  if (href) {
    return (
      <NavLink className={styles["button"]} to={href}>
        {label}
      </NavLink>
    );
  }

  return (
    <button
      className={styles["button"]}
      disabled={isDisabled}
      onClick={onClick}
      type={type}
    >
      {label}
    </button>
  );
};

export { Button };
