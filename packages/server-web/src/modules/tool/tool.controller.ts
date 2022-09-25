import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    Req,
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

    @Post()
    create(@Body() createToolDto: CreateToolDto) {
        return this.toolService.create(createToolDto);
    }

    @Get()
    findAll() {
        return this.toolService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.toolService.findOne(+id);
    }

    // @Public()
    @Patch('like')
    like(@Body() param: LikeParam, @User() user: AuthUser) {
        console.log('req===user', user);

        if (!user || !user.id) {
            return false;
        }
        return this.toolService.like({
            ...param,
            authorId: user.id,
        });
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.toolService.remove(+id);
    }
}
