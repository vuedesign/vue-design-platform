import { Injectable } from '@nestjs/common';
import { CreateCountDto } from './dto/create-count.dto';
import { UpdateCountDto } from './dto/update-count.dto';
import { BaseMicroservice } from '@/globals/services/base.microservice';

@Injectable()
export class CountService extends BaseMicroservice {
  findOneByAuthorId(authorId: number) {
    return this.send(
      { module: 'count', method: 'findOneByAuthorId' },
      authorId,
    );
  }
}
