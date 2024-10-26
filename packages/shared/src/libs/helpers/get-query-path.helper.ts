import { type ExtractParameters } from "../types/types.js";

const getEndpoint = <Path extends string>(
  path: Path,
  query: Record<ExtractParameters<Path>, number | string>,
): string => {
  return Object.keys(query).reduce<string>((path, key) => {
    const keyTyped = key as ExtractParameters<Path>;

    return path.replace(`:${keyTyped}`, query[keyTyped].toString());
  }, path);
};

export { getEndpoint };
