import styles from "./styles.module.css";

type Properties = {
  children: React.ReactNode;
  images: (File | string)[];
  nickname?: string;
  onImageRemove?: (image: File | string) => void;
  title: string;
};

const SuperheroTemplate = ({
  children,
  title,
  nickname,
  images,
  onImageRemove,
}: Properties): JSX.Element => {
  return (
    <>
      <div className={styles["superhero-header"]}>
        <h1>{title}</h1>
      </div>
      <div className={styles["superhero-layout"]}>
        {images.length ? (
          <div className={styles["superhero-images"]}>
            {images.map((image, index) => (
              <div className={styles["superhero-image-container"]} key={index}>
                <img
                  alt={nickname ?? "Superhero"}
                  className={styles["superhero-image"]}
                  src={
                    typeof image === "string"
                      ? image
                      : URL.createObjectURL(image)
                  }
                />
                {onImageRemove && (
                  <button
                    className={styles["superhero-image-remove"]}
                    onClick={() => onImageRemove(image)}
                  >
                    X
                  </button>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className={styles["superhero-images-placeholder"]}>
            There are no superhero images
          </div>
        )}

        {children}
      </div>
    </>
  );
};

export { SuperheroTemplate };
