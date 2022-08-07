import { ObjectType } from '@nestjs/graphql';
import { NavigationEntity } from '@/entities/navigation.entity';
import { Paginated } from '@/dtos/paginated.gql';

@ObjectType()
export class NavigationListPaginated extends Paginated<NavigationEntity>(
  NavigationEntity,
) {}
