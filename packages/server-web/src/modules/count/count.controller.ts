import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    ParseIntPipe,
    UnauthorizedException,
    Req,
} from '@nestjs/common';
import { CountService } from './count.service';
import { CreateCountDto } from './dto/create-count.dto';
import { UpdateCountDto } from './dto/update-count.dto';
import { Public } from '@/core/decorators/auth.decorator';

@Controller('counts')
export class CountController {
    constructor(private readonly countService: CountService) {}

    @Get('profile')
    findMyCount(@Req() req) {
        if (!req.user || !req.user.id) {
            throw new UnauthorizedException();
        }
        return this.countService.findOneByAuthorId(req.user.id);
    }

    @Public()
    @Get(':authorId')
    findOne(@Param('authorId', ParseIntPipe) authorId: number) {
        console.log('authorIdauthorIdauthorId', authorId);
        return this.countService.findOneByAuthorId(authorId);
    }
}
