import { NavLink } from "react-router-dom";

import { AppRoute } from "~/libs/enums/enums.js";
import { getEndpoint } from "~/services/superheroes/libs/helpers/helpers.js";
import { type GetAllSuperheroDto } from "~/services/superheroes/libs/types/types.js";

import styles from "./styles.module.css";

type SuperheroCardProperties = {
  superhero: GetAllSuperheroDto;
};

const SuperheroCard = ({ superhero }: SuperheroCardProperties): JSX.Element => {
  return (
    <NavLink
      className={styles["superhero"]}
      to={getEndpoint(AppRoute.SUPERHERO, {
        id: superhero.id,
      })}
    >
      <div className={styles["superhero-container"]}>
        <img
          alt={superhero.nickname}
          className={styles["superhero-image"]}
          src={superhero.image}
        />
        <span className={styles["superhero-nickname"]}>
          {superhero.nickname}
        </span>
      </div>
    </NavLink>
  );
};

export { SuperheroCard };
