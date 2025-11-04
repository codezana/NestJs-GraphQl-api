// users/users.resolver.ts
import { Resolver, Query, Args, Int } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../common/guards/gql-auth.guard';
import { User } from './user.entity';
import { UsersService } from './users.service';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/decorators/roles.decorator';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(GqlAuthGuard,RolesGuard)
  @Roles('admin')
  @Query(() => [User], { name: 'IndexUsers' })
  async allUsers(){
    return this.usersService.findAll();
  }

  @UseGuards(GqlAuthGuard,RolesGuard)
  @Roles('admin')
  @Query(() => User, { name: 'ShowUser' })
  async findOne(@Args('id', { type: () => Int }) id: number){
    return this.usersService.findOne(id);
  }
}

// ✅ A protected query to return all users (for admin).