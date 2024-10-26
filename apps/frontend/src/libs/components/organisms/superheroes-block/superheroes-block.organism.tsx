import { Button } from "~/libs/components/components.js";
import { SuperheroCard } from "~/libs/components/molecules/molecules.js";
import { AppRoute } from "~/libs/enums/app-route.enum.js";
import { useAppSelector } from "~/libs/hooks/hooks.js";

import { PagePagination } from "../organisms.js";
import styles from "./styles.module.css";

type Properties = {
  onPageChange: (page: number) => void;
  page: number;
  pageSize: number;
  totalItemsCount: number;
};

const SuperheroesBlock = ({
  onPageChange,
  page,
  pageSize,
  totalItemsCount,
}: Properties): JSX.Element => {
  const { superheroes } = useAppSelector(({ superheroes }) => ({
    superheroes: superheroes.superheroes,
    dataStatus: superheroes.dataStatus.getAll,
    superheroesTotalCount: superheroes.superheroesTotalCount,
  }));

  return (
    <div>
      {superheroes.length ? (
        <div className={styles["superheroes-cards"]}>
          {superheroes.map((superhero) => (
            <SuperheroCard key={superhero.id} superhero={superhero} />
          ))}
        </div>
      ) : (
        <div className={styles["superheroes-placeholder"]}>
          There are no superheroes
        </div>
      )}

      <div className={styles["pagination"]}>
        <div className={styles["button"]}>
          <Button
            href={AppRoute.SUPERHERO_CREATE}
            label="Create New"
            type="button"
          />
        </div>
        <PagePagination
          onPageChange={onPageChange}
          page={page}
          pageSize={pageSize}
          totalItemsCount={totalItemsCount}
        />
      </div>
    </div>
  );
};

export { SuperheroesBlock };
