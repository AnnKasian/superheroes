import { NavLink } from "react-router-dom";

import { AppRoute } from "~/libs/enums/enums.js";

import styles from "./styles.module.css";

const Title = (): JSX.Element => {
  return (
    <NavLink className={styles["logo"]} to={AppRoute.ROOT}>
      <img alt="Superheroes" height={40} src="/favicon.png" width={40} />
      <span className={styles["logo-link"]}>Superheroes</span>
    </NavLink>
  );
};

export { Title };
