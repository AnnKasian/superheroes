import { PageTemplate, SuperheroForm } from "~/libs/components/components.js";
import { SuperheroTemplate } from "~/libs/components/templates/templates.js";
import { BACK_URL } from "~/libs/constants/constants.js";
import { AppRoute } from "~/libs/enums/enums.js";
import {
  useAppDispatch,
  useNavigate,
  useRef,
  useState,
} from "~/libs/hooks/hooks.js";
import { getEndpoint } from "~/services/superheroes/libs/helpers/helpers.js";
import { createSuperheroDtoSchema } from "~/services/superheroes/libs/schemas/schemas.js";
import { type CreateSuperheroRequestDto } from "~/services/superheroes/libs/types/types.js";
import { superheroesActions } from "~/slices/superheroes/superheroes.js";

const CreateSuperhero = (): JSX.Element => {
  const actions = useRef<{ removeImage: (image: File) => void } | null>(null);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [imagesUploaded, setImagesUploaded] = useState<File[]>([]);

  const handleSubmit = (payload: CreateSuperheroRequestDto) => {
    void dispatch(superheroesActions.create(payload))
      .unwrap()
      .then(({ id }) => {
        navigate(getEndpoint(AppRoute.SUPERHERO, { id }));
      });
  };

  const handleDiscard = () => {
    navigate(BACK_URL);
  };

  const handleImageRemove = (image: File | string) => {
    if (image instanceof File) {
      actions.current?.removeImage(image);
    }
  };

  return (
    <PageTemplate>
      <SuperheroTemplate
        images={[...imagesUploaded]}
        onImageRemove={handleImageRemove}
        title="Create Superhero"
      >
        <SuperheroForm<CreateSuperheroRequestDto>
          actions={actions}
          onDiscard={handleDiscard}
          onImagesChange={setImagesUploaded}
          onSubmit={handleSubmit}
          required
          validationSchema={createSuperheroDtoSchema}
        />
      </SuperheroTemplate>
    </PageTemplate>
  );
};

export { CreateSuperhero };
