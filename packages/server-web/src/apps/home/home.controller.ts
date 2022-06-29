import { Controller, Get, Inject, Param } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { SiteService } from '../site/site.service';
import { HomeService } from './home.service';
import { NavigationService } from '../navigation/navigation.service';
import { Public } from '@/core/decorators/auth.decorator';
import { ClientProxy } from '@nestjs/microservices';

@Controller('home')
export class HomeController {
  constructor(
    private readonly homeService: HomeService,
    private readonly userService: UserService,
    private readonly siteService: SiteService,
    private readonly navigationService: NavigationService,
  ) {}

  viewCount() {
    return Promise.resolve(22983);
  }

  @Public()
  @Get()
  home(@Param('id') id: number) {
    return this.homeService.findOneUserById(id);
  }

  @Get('count')
  count() {
    return Promise.all([
      this.userService.count(),
      this.siteService.count(),
      this.navigationService.count(),
      this.viewCount(),
    ]).then((res) => {
      const [user, site, navigation, view] = res;
      return {
        user,
        site,
        navigation,
        view,
      };
    });
  }
}
