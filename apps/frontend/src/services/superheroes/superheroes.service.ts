import { type AxiosInstance } from "axios";

import { APIPath } from "~/libs/enums/enums.js";

import { SuperheroesApiPath } from "./libs/enums/enums.js";
import { getEndpoint, getFormData } from "./libs/helpers/helpers.js";
import {
  type CreateSuperheroRequestDto,
  type GetAllSuperheroesRequestDto,
  type GetAllSuperheroesResponseDto,
  type SuperheroResponseDto,
  type UpdateSuperheroRequestDto,
} from "./libs/types/types.js";

class SuperheroesService {
  private readonly baseUrl: APIPath;
  private readonly client: AxiosInstance;

  constructor(client: AxiosInstance) {
    this.client = client;
    this.baseUrl = APIPath.SUPERHEROES;
  }

  async get(id: string): Promise<SuperheroResponseDto> {
    const { data } = await this.client.get<SuperheroResponseDto>(
      getEndpoint(`${this.baseUrl}${SuperheroesApiPath.GET}`, {
        id,
      }),
    );

    return data;
  }

  async getAll(
    query: GetAllSuperheroesRequestDto,
  ): Promise<GetAllSuperheroesResponseDto> {
    const { data } = await this.client.get<GetAllSuperheroesResponseDto>(
      `${this.baseUrl}${SuperheroesApiPath.GET_ALL}`,
      { params: query },
    );

    return data;
  }

  async create(
    payload: CreateSuperheroRequestDto,
  ): Promise<SuperheroResponseDto> {
    const { data } = await this.client.post<SuperheroResponseDto>(
      `${this.baseUrl}${SuperheroesApiPath.CREATE}`,
      getFormData(payload),
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );

    return data;
  }

  async update(id: string, payload: UpdateSuperheroRequestDto): Promise<void> {
    await this.client.put(
      getEndpoint(`${this.baseUrl}${SuperheroesApiPath.UPDATE}`, {
        id,
      }),
      getFormData(payload),
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );
  }

  async delete(id: string): Promise<boolean> {
    await this.client.delete<SuperheroResponseDto>(
      getEndpoint(`${this.baseUrl}${SuperheroesApiPath.DELETE}`, {
        id,
      }),
    );

    return true;
  }
}

export { SuperheroesService };
