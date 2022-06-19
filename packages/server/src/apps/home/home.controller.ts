import { Controller, Get } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { SiteService } from '../site/site.service';
import { NavigationService } from '../navigation/navigation.service';

@Controller('home')
export class HomeController {
  constructor(
    private readonly userService: UserService,
    private readonly siteService: SiteService,
    private readonly navigationService: NavigationService,
  ) {}

  viewCount() {
    return Promise.resolve(22983);
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
