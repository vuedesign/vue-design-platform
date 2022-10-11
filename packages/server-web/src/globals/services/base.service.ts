import { Repository, FindOptionsRelations, FindManyOptions } from 'typeorm';

export interface IPagination {
    page?: number;
    size?: number;
}

export interface IPaginationResponse<T = any> {
    list: Array<T>;
    pagination: IPagination;
    total: number;
}

export interface IPaginationOptions<E> extends FindManyOptions<E> {
    pagination?: IPagination;
    nots?: object;
    userId?: number;
}

export class BaseService<E> {
    constructor(private readonly currentRepository: Repository<any>) {}
    async findListAndPage(
        options: IPaginationOptions<E>,
    ): Promise<IPaginationResponse> {
        const {
            pagination = { page: 1, size: 20 },
            order = {},
            where = {},
            relations = {},
            select = {},
        } = options || {};
        const { page, size } = pagination;
        const [list, total]: [Array<any>, number] =
            await this.currentRepository.findAndCount({
                take: size,
                skip: (page - 1) * size,
                order,
                where,
                relations,
                select,
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
