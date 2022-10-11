import { ToolEntity } from './../../entities/tool.entity';
import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    Req,
    ParseIntPipe,
} from '@nestjs/common';
import { ToolService } from './tool.service';
import { CreateToolDto } from './dto/create-tool.dto';
import { Public } from '@/core/decorators/auth.decorator';
import { User } from '@/core/decorators/user.decorator';
import { LikeParam } from './dto/tool.dto';
import type { AuthUser } from '@/modules/user/dto/user.dto';

@Controller('tools')
export class ToolController {
    constructor(private readonly toolService: ToolService) {}

    @Get(':siteId')
    findOne(
        @Param('siteId', ParseIntPipe) siteId: number,
        @User('id') userId: number,
    ) {
        if (!userId || !siteId) {
            return null;
        }
        return this.toolService.findOne({
            siteId,
            authorId: userId,
        });
    }

    @Patch('like')
    like(@Body() param: LikeParam, @User() user: AuthUser) {
        if (!user || !user.id) {
            return false;
        }
        return this.toolService.like({
            ...param,
            authorId: user.id,
        });
    }
}
