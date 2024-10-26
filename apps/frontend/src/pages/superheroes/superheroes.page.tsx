import {
  PageTemplate,
  SuperheroesBlock,
} from "~/libs/components/components.js";
import { DataStatus } from "~/libs/enums/enums.js";
import {
  useAppDispatch,
  useAppSelector,
  useCallback,
  useEffect,
  usePagination,
} from "~/libs/hooks/hooks.js";
import { superheroesActions } from "~/slices/superheroes/superheroes.js";

const Superheroes = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const { dataStatus, superheroesTotalCount } = useAppSelector(
    ({ superheroes }) => ({
      dataStatus: superheroes.dataStatus.getAll,
      superheroesTotalCount: superheroes.superheroesTotalCount,
    })
  );

  const {
    onPageChange: onSuperheroesPageChange,
    page: SuperheroesPage,
    pageSize: SuperheroesPageSize,
  } = usePagination({
    totalItemsCount: superheroesTotalCount,
    queryParameterPrefix: "",
  });

  const handleLoadSuperheroes = useCallback(() => {
    void dispatch(
      superheroesActions.getAll({
        page: SuperheroesPage,
        limit: SuperheroesPageSize,
      })
    );
  }, [dispatch, SuperheroesPageSize, SuperheroesPage]);

  useEffect(() => {
    handleLoadSuperheroes();
  }, [handleLoadSuperheroes, SuperheroesPage, SuperheroesPageSize]);

  const isLoading =
    dataStatus === DataStatus.IDLE || dataStatus === DataStatus.PENDING;

  return (
    <PageTemplate isLoading={isLoading}>
      <div>
        <SuperheroesBlock
          onPageChange={onSuperheroesPageChange}
          page={SuperheroesPage}
          pageSize={SuperheroesPageSize}
          totalItemsCount={superheroesTotalCount}
        />
      </div>
    </PageTemplate>
  );
};

export { Superheroes };
