import { Badge, Button, PageTemplate } from "~/libs/components/components.js";
import { SuperheroTemplate } from "~/libs/components/templates/templates.js";
import { AppRoute, DataStatus } from "~/libs/enums/enums.js";
import {
  useAppDispatch,
  useAppSelector,
  useEffect,
  useNavigate,
  useParams,
} from "~/libs/hooks/hooks.js";
import { getEndpoint } from "~/services/superheroes/libs/helpers/helpers.js";
import { superheroesActions } from "~/slices/superheroes/superheroes.js";

import styles from "./styles.module.css";

const Superhero = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { id: superheroId } = useParams<{ id: string }>();

  const { dataStatus, superhero } = useAppSelector(({ superheroes }) => ({
    superhero: superheroes.superhero,
    dataStatus: superheroes.dataStatus.get,
  }));

  useEffect(() => {
    if (superheroId) {
      void dispatch(superheroesActions.get(superheroId));
    }
  }, [dispatch, superheroId]);

  let path: string | undefined = undefined;

  if (superheroId) {
    path = getEndpoint(AppRoute.SUPERHERO_UPDATE, { id: superheroId });
  }

  const handleDeleteClick = () => {
    if (superhero) {
      void dispatch(superheroesActions.remove(superhero.id))
        .unwrap()
        .then(() => {
          navigate(AppRoute.SUPERHEROES);
        });
    }
  };

  const isLoading =
    dataStatus === DataStatus.PENDING || dataStatus === DataStatus.IDLE;

  return (
    <PageTemplate isLoading={isLoading}>
      {superhero && (
        <SuperheroTemplate
          images={superhero.images}
          nickname={superhero.nickname}
          title={superhero.nickname}
        >
          <div>
            <h3 className={styles["superhero-description-title"]}>Real name</h3>
            <p className={styles["superhero-description"]}>
              {superhero.realName}
            </p>
            <h3 className={styles["superhero-description-title"]}>
              Origin description
            </h3>
            <p className={styles["superhero-description"]}>
              {superhero.originDescription}
            </p>
            <h3 className={styles["superhero-description-title"]}>
              Superpowers
            </h3>
            <div className={styles["superhero-description-layout"]}>
              {superhero.superpowers.map((superpower, index) => (
                <div key={index}>
                  <Badge>{superpower} </Badge>
                </div>
              ))}
            </div>

            <h3 className={styles["superhero-description-title"]}>
              Catch phrase
            </h3>
            <p className={styles["superhero-description"]}>
              {superhero.catchPhrase}
            </p>
            <div className={styles["button-container"]}>
              <div className={styles["button"]}>
                <Button href={path} label="Edit" type="button" />
              </div>
              <div className={styles["button"]}>
                <Button
                  label="Delete"
                  onClick={handleDeleteClick}
                  type="button"
                />
              </div>
            </div>
          </div>
        </SuperheroTemplate>
      )}
    </PageTemplate>
  );
};

export { Superhero };
