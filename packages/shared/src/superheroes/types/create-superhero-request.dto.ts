type CreateSuperheroRequestDto = {
  catchPhrase?: string;
  images?: File[];
  nickname: string;
  originDescription: string;
  realName: string;
  superpowers: string[];
};

export { type CreateSuperheroRequestDto };
