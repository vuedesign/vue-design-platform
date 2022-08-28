import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { CountService } from './count.service';
import { CreateCountDto } from './dto/create-count.dto';
import { UpdateCountDto } from './dto/update-count.dto';

@Controller('counts')
export class CountController {
  constructor(private readonly countService: CountService) {}

  @Get(':authorId')
  findOne(@Param('authorId', ParseIntPipe) authorId: number) {
    return this.countService.findOneByAuthorId(authorId);
  }
}
