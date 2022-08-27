import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CountService } from './count.service';
import { CreateCountDto } from './dto/create-count.dto';
import { UpdateCountDto } from './dto/update-count.dto';

@Controller('count')
export class CountController {
  constructor(private readonly countService: CountService) {}

  @Post()
  create(@Body() createCountDto: CreateCountDto) {
    return this.countService.create(createCountDto);
  }

  @Get()
  findAll() {
    return this.countService.findList({});
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.countService.findOneById(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCountDto: UpdateCountDto) {
    return this.countService.update(+id, updateCountDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.countService.remove(+id);
  }
}
