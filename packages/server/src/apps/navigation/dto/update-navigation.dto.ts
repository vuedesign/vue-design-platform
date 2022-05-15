import { PartialType } from '@nestjs/swagger';
import { CreateNavigationDto } from './create-navigation.dto';

export class UpdateNavigationDto extends PartialType(CreateNavigationDto) {}
