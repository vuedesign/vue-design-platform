import { PartialType } from '@nestjs/swagger';
import { CreateCountDto } from './create-count.dto';

export class UpdateCountDto extends PartialType(CreateCountDto) {}
