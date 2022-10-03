import { Controller, Get, Req, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { SiteService } from '../site/site.service';
import { NavigationService } from '../navigation/navigation.service';
import { AuthRequest } from '../auth/dto/auth.dto';
import { Public } from '@/core/decorators/auth.decorator';

@Controller('home')
export class HomeController {
    constructor(
        private readonly userService: UserService,
        private readonly siteService: SiteService,
        private readonly navigationService: NavigationService,
    ) {}

    viewCount() {
        return Promise.resolve(0);
    }

    @Get('count')
    count(@Req() req: AuthRequest) {
        if (!req.user || !req.user.id) {
            throw new UnauthorizedException('用户没授权');
        }
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
