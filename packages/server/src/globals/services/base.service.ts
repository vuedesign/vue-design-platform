import { Repository } from 'typeorm';

export interface IPaginationResponse {
  list: Array<any>;
  pagination: {
    page: number;
    size: number;
  };
  total: number;
}

export interface IPaginationQuery {
  page?: number;
  size?: number;
  order?: object;
  where?: object;
}

export class BaseService {
  constructor(private readonly currentRepository: Repository<any>) {}
  async findListAndPage(query: IPaginationQuery): Promise<IPaginationResponse> {
    const { page = 1, size = 20, order = {}, where = {} } = query;
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