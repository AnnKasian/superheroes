import { PageTemplate, SuperheroForm } from "~/libs/components/components.js";
import { SuperheroTemplate } from "~/libs/components/templates/templates.js";
import { BACK_URL } from "~/libs/constants/constants.js";
import { AppRoute } from "~/libs/enums/app-route.enum.js";
import { DataStatus } from "~/libs/enums/enums.js";
import {
  useAppDispatch,
  useAppSelector,
  useEffect,
  useNavigate,
  useParams,
  useRef,
  useState,
} from "~/libs/hooks/hooks.js";
import { getEndpoint } from "~/services/superheroes/libs/helpers/helpers.js";
import { updateSuperheroDtoSchema } from "~/services/superheroes/libs/schemas/schemas.js";
import { type UpdateSuperheroRequestDto } from "~/services/superheroes/libs/types/types.js";
import { superheroesActions } from "~/slices/superheroes/superheroes.js";

const UpdateSuperhero = (): JSX.Element => {
  const actions = useRef<{ removeImage: (image: File) => void } | null>(null);
  const { id } = useParams<"id">();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { superhero, dataStatus } = useAppSelector(({ superheroes }) => ({
    superhero: superheroes.superhero,
    dataStatus: superheroes.dataStatus.get,
  }));

  const [imagesExisted, setImagesExisted] = useState<string[]>([]);
  const [imagesUploaded, setImagesUploaded] = useState<File[]>([]);

  const handleSubmit = (payload: UpdateSuperheroRequestDto) => {
    if (id) {
      void dispatch(
        superheroesActions.update({
          ...payload,
          id,
          imagesToLeave: imagesExisted,
        }),
      )
        .unwrap()
        .then(() => navigate(getEndpoint(AppRoute.SUPERHERO, { id })));
    }
  };

  const handleDiscard = () => {
    navigate(BACK_URL);
  };

  const handleImageRemove = (image: File | string) => {
    if (typeof image === "string") {
      setImagesExisted((images) =>
        images.filter((currentImage) => currentImage !== image),
      );
    } else {
      actions.current?.removeImage(image);
    }
  };

  useEffect(() => {
    if (id) {
      void dispatch(superheroesActions.get(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (superhero?.images) {
      setImagesExisted(superhero.images);
    }
  }, [superhero?.images]);

  const isLoading =
    dataStatus === DataStatus.PENDING || dataStatus === DataStatus.IDLE;

  return (
    <PageTemplate isLoading={isLoading}>
      {superhero && (
        <SuperheroTemplate
          images={[...imagesExisted, ...imagesUploaded]}
          nickname={superhero.nickname}
          onImageRemove={handleImageRemove}
          title="Update Superhero"
        >
          <SuperheroForm
            actions={actions}
            defaultValues={{
              catchPhrase: superhero.catchPhrase,
              nickname: superhero.nickname,
              originDescription: superhero.originDescription,
              superpowers: superhero.superpowers,
              realName: superhero.realName,
            }}
            onDiscard={handleDiscard}
            onImagesChange={setImagesUploaded}
            onSubmit={handleSubmit}
            validationSchema={updateSuperheroDtoSchema}
          />
        </SuperheroTemplate>
      )}
    </PageTemplate>
  );
};

export { UpdateSuperhero };
