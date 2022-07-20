import { UserEntity } from '@/entities/user.entity';
import { AuthService } from './auth.service';
import { Args, Resolver, Query, Field, Int, ObjectType } from '@nestjs/graphql';

@Resolver('auth')
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Query(() => UserEntity, { nullable: false })
  profile(): Promise<any> {
    return this.authService.findOne({ id: 4 });
  }
}
