type ExtractParameters<T extends string> = T extends
  | `${string}/:${infer U}/${string}`
  | `${string}/:${infer U}`
  | `/:${infer U}/${string}`
  ? ExtractParameters<U>
  : T;

export { type ExtractParameters };
