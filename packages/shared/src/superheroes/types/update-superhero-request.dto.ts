type UpdateSuperheroRequestDto = {
  catchPhrase?: string;
  images?: File[];
  imagesToLeave?: string[];
  nickname?: string;
  originDescription?: string;
  realName?: string;
  superpowers?: string[];
};

export { type UpdateSuperheroRequestDto };
