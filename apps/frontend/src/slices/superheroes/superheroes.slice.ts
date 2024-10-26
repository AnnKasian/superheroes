import { createSlice } from "@reduxjs/toolkit";

import { DataStatus } from "~/libs/enums/enums.js";
import {
  type GetAllSuperheroDto,
  type SuperheroResponseDto,
} from "~/services/superheroes/libs/types/types.js";

import { create, get, getAll, update } from "./superheroes.actions.js";

const initialState: {
  dataStatus: {
    create: DataStatus;
    delete: DataStatus;
    get: DataStatus;
    getAll: DataStatus;
    update: DataStatus;
  };
  superhero: null | SuperheroResponseDto;
  superheroes: GetAllSuperheroDto[];
  superheroesTotalCount: number;
} = {
  superhero: null,
  superheroes: [],
  superheroesTotalCount: 0,
  dataStatus: {
    get: DataStatus.IDLE,
    getAll: DataStatus.IDLE,
    create: DataStatus.IDLE,
    update: DataStatus.IDLE,
    delete: DataStatus.IDLE,
  },
};

const { reducer, actions, name } = createSlice({
  initialState,
  name: "superheroes",
  reducers: {},
  extraReducers(builder) {
    builder.addCase(get.pending, (state) => {
      state.dataStatus.get = DataStatus.PENDING;
    });
    builder.addCase(get.fulfilled, (state, action) => {
      state.superhero = action.payload;
      state.dataStatus.get = DataStatus.FULFILLED;
    });
    builder.addCase(get.rejected, (state) => {
      state.dataStatus.get = DataStatus.REJECTED;
    });

    builder.addCase(getAll.pending, (state) => {
      state.dataStatus.getAll = DataStatus.PENDING;
    });
    builder.addCase(getAll.fulfilled, (state, action) => {
      state.superheroes = action.payload.items;
      state.superheroesTotalCount = action.payload.pagination.total;
      state.dataStatus.getAll = DataStatus.FULFILLED;
    });
    builder.addCase(getAll.rejected, (state) => {
      state.dataStatus.getAll = DataStatus.REJECTED;
    });

    builder.addCase(create.pending, (state) => {
      state.dataStatus.create = DataStatus.PENDING;
    });
    builder.addCase(create.fulfilled, (state, action) => {
      state.superhero = action.payload;
      state.dataStatus.create = DataStatus.FULFILLED;
    });
    builder.addCase(create.rejected, (state) => {
      state.dataStatus.create = DataStatus.REJECTED;
    });

    builder.addCase(update.pending, (state) => {
      state.dataStatus.update = DataStatus.PENDING;
    });
    builder.addCase(update.fulfilled, (state) => {
      state.dataStatus.update = DataStatus.FULFILLED;
    });
    builder.addCase(update.rejected, (state) => {
      state.dataStatus.update = DataStatus.REJECTED;
    });
  },
});

export { actions, name, reducer };
