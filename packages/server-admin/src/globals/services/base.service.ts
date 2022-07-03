import { Repository } from 'typeorm';

export interface IPagination {
  page?: number;
  size?: number;
}
export interface IPaginationResponse<T = any> {
  list: Array<T>;
  pagination: IPagination;
  total: number;
}

export interface IPaginationOptions {
  pagination?: IPagination;
  order?: object;
  where?: object;
}

export class BaseService {
  constructor(private readonly currentRepository: Repository<any>) {}
  async findListAndPage(
    opitons: IPaginationOptions,
  ): Promise<IPaginationResponse> {
    const {
      pagination: { page = 1, size = 20 },
      order = {},
      where = {},
    } = opitons;
    const [list, total]: [Array<any>, number] =
      await this.currentRepository.findAndCount({
        take: size,
        skip: (page - 1) * size,
        order,
        where,
      });
    return {
      list,
      pagination: {
        page,
        size,
      },
      total,
    };
  }
}
