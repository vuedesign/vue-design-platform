import { ObjectType } from '@nestjs/graphql';
import { SiteEntity } from '@/entities/site.entity';
import { Paginated } from '@/dtos/paginated.gql';

@ObjectType()
export class SiteListPaginated extends Paginated<SiteEntity>(SiteEntity) {}
