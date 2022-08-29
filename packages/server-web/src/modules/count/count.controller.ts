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
import { Public } from '@/core/decorators/auth.decorator';

@Controller('counts')
export class CountController {
  constructor(private readonly countService: CountService) {}

  @Public()
  @Get('/:authorId')
  findOne(@Param('authorId', ParseIntPipe) authorId: number) {
    console.log('authorIdauthorIdauthorId', authorId);
    return this.countService.findOneByAuthorId(authorId);
  }
}
