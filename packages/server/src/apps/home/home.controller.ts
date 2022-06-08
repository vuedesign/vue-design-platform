import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
// import { HomeService } from './home.service';
import { UserService } from '../user/user.service';
import { SiteService } from '../site/site.service';
import { NavigationService } from '../navigation/navigation.service';
import { CreateHomeDto } from './dto/create-home.dto';
import { UpdateHomeDto } from './dto/update-home.dto';
import { Public } from '../../core/decorators/auth.decorator';

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

  @Public()
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
