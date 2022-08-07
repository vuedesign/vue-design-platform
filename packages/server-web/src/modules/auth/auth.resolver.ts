import { UserEntity } from '@/entities/user.entity';
import { AuthService } from './auth.service';
import { Args, Resolver, Query, Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
class NotLogin {
  @Field()
  logIn: string;
}

@Resolver('auth')
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Query(() => UserEntity, { nullable: true })
  profile(): Promise<any> {
    return this.authService.findOne({ id: 4 });
  }
}
