import { ObjectType } from '@nestjs/graphql';
import { SiteEntity } from '@/entities/site.entity';
import { Paginated } from './Paginated';

@ObjectType()
export class SitePaginated extends Paginated<SiteEntity>(SiteEntity) {}
