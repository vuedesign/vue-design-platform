import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
} from '@nestjs/common';
import { ToolService } from './tool.service';
import { CreateToolDto } from './dto/create-tool.dto';
import { UpdateToolDto } from './dto/update-tool.dto';
import { LikeParam } from './dto/tool.dto';

@Controller('tool')
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
    like(@Body() param: LikeParam) {
        if (param.type === 'down') {
            // down
        } else if (param.type === 'top') {
            // top
        }
        console.log('param', param);
        return 'xxx'; // this.toolService.update(+id, updateToolDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.toolService.remove(+id);
    }
}
