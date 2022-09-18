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
import { UpdateToolDto } from './dto/update-tool.dto';
import { LikeParam } from './dto/tool.dto';

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

    @Patch('like')
    like(@Body() param: LikeParam, @Req() req) {
        if (!req.user || !req.user.id) {
            return false;
        }
        return this.toolService.like({
            ...param,
            authorId: req.user.id,
        });
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.toolService.remove(+id);
    }
}
