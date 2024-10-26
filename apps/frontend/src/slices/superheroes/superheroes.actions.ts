import { createAsyncThunk } from "@reduxjs/toolkit";

import { type AsyncThunkConfig } from "~/providers/store/store.js";
import {
  type CreateSuperheroRequestDto,
  type GetAllSuperheroesRequestDto,
  type GetAllSuperheroesResponseDto,
  type SuperheroResponseDto,
  type UpdateSuperheroRequestDto,
} from "~/services/superheroes/libs/types/types.js";

import { name } from "./superheroes.slice.js";

const get = createAsyncThunk<SuperheroResponseDto, string, AsyncThunkConfig>(
  `${name}/get`,
  async (payload, { extra }) => {
    const { superheroesService } = extra;

    return await superheroesService.get(payload);
  },
);

const getAll = createAsyncThunk<
  GetAllSuperheroesResponseDto,
  GetAllSuperheroesRequestDto,
  AsyncThunkConfig
>(`${name}/get-all`, async (query, { extra }) => {
  const { superheroesService } = extra;

  return await superheroesService.getAll(query);
});

const create = createAsyncThunk<
  SuperheroResponseDto,
  CreateSuperheroRequestDto,
  AsyncThunkConfig
>(`${name}/create`, async (payload, { extra }) => {
  const { superheroesService } = extra;

  return await superheroesService.create(payload);
});

const update = createAsyncThunk<
  void,
  { id: string } & UpdateSuperheroRequestDto,
  AsyncThunkConfig
>(`${name}/update`, async ({ id, ...payload }, { extra }) => {
  const { superheroesService } = extra;

  await superheroesService.update(id, payload);
});

const remove = createAsyncThunk<boolean, string, AsyncThunkConfig>(
  `${name}/delete`,
  async (payload, { extra }) => {
    const { superheroesService } = extra;

    return await superheroesService.delete(payload);
  },
);

export { create, get, getAll, remove, update };
