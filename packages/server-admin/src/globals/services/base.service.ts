import { Repository, FindManyOptions, Not } from 'typeorm';

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
    nots?: Record<keyof E, number | string>;
    userId?: number;
}

export class BaseService<E> {
    constructor(private readonly currentRepository: Repository<any>) {}
    async findListAndPage(
        options: IPaginationOptions<E>,
    ): Promise<IPaginationResponse> {
        const {
            pagination = {},
            where = {},
            nots = {},
            ...other
        } = options || {};
        const { page = 1, size = 20 } = pagination;
        Object.keys(nots).forEach((key) => {
            if (key && nots[key]) {
                where[key] = Not(nots[key]);
            }
        });
        const [list, total]: [Array<any>, number] =
            await this.currentRepository.findAndCount({
                take: size,
                skip: (page - 1) * size,
                where,
                ...other,
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
