import { AxiosError } from "axios";

const handleError = () => {
  return (error: unknown) => {
    if (error instanceof AxiosError && error.response) {
      const data = error.response.data as unknown;

      if (
        typeof data === "object" &&
        data &&
        "message" in data &&
        typeof data.message === "string"
      ) {
        throw new Error(data.message);
      }
    }

    throw new Error("Unknown error");
  };
};

export { handleError };
