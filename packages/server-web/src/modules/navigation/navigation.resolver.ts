import { NavigationEntity } from '@/entities/navigation.entity';
import { NavigationService } from './navigation.service';
import { Args, Resolver, Query, Field, Int, ObjectType } from '@nestjs/graphql';
import { NavigationListPaginated } from './dto/navigationList.paginated.gql';
import { NavigationListInput } from './dto/navigationList.input.dto';
import { Public } from '@/core/decorators/auth.decorator';

@Resolver((of) => NavigationEntity)
export class NavigationResolver {
  constructor(private readonly navigationService: NavigationService) {}

  @Public()
  @Query((returns) => NavigationListPaginated, { nullable: true })
  navigations(): // @Args('query', { nullable: true }) query?: NavigationListInput,
  Promise<NavigationListPaginated> {
    const query: NavigationListInput = {};
    const { status, size, page, title, order } = query || {};
    return this.navigationService.findList({
      where: { status },
      pagination: { page, size },
    });
  }

  // @ResolveField()
  // async posts(@Parent() author: Author) {
  //   const { id } = author;
  //   return this.postsService.findAll({ authorId: id });
  // }
}
