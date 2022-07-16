import { SiteEntity } from '@/entities/site.entity';
import { SiteService } from './site.service';
import { Args, Resolver, Query, Field, Int, ObjectType } from '@nestjs/graphql';
import { SitePaginated } from './dto/SitePaginated';
import { SiteListInput } from './dto/siteList.input.dto';

@Resolver((of) => SiteEntity)
export class SiteResolver {
  constructor(private readonly siteService: SiteService) {}

  @Query((returns) => SitePaginated, { nullable: true })
  sites(
    @Args('query', { nullable: true }) query?: SiteListInput,
  ): Promise<SitePaginated> {
    const { status, size, page, type, title, order } = query || {};
    return this.siteService.findList({
      where: { status, type },
      pagination: { page, size },
    });
  }

  // @ResolveField()
  // async posts(@Parent() author: Author) {
  //   const { id } = author;
  //   return this.postsService.findAll({ authorId: id });
  // }
}
