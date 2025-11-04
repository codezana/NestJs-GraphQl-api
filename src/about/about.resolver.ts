// src/about/about.resolver.ts
import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { AboutService } from './about.service';
import { About } from './entities/about.entity';
import { CreateAboutInput } from './dto/create-about.input';
import { UpdateAboutInput } from './dto/update-about.input';
import { AboutResponse, SocialResponse } from 'src/response/responses';
import { SocialMediaService } from './social.service';
import { CreateSocialMediaInput } from './dto/create-soical.input';
import { SocialMedia } from './entities/social-media.entity';
import { UpdateSocialMediaInput } from './dto/update-soical.input';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/common/guards/gql-auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/decorators/roles.decorator';

@Resolver(() => About)
export class AboutResolver {
  constructor(
    private readonly aboutService: AboutService,
    private readonly socialMediaService: SocialMediaService,
  ) {}

  @UseGuards(GqlAuthGuard,RolesGuard)
  @Roles('admin')
  @Mutation(() => AboutResponse)
  async createAbout(@Args('input') input: CreateAboutInput) {
    try {
      const result = await this.aboutService.create(input);
      return {
        status: result.status,
        message: result.message,
        data: result.data,
      };
    } catch (error) {
      return {
        status: 500,
        message: 'Internal server error: ' + error.message,
      };
    }
  }


  @UseGuards(GqlAuthGuard,RolesGuard)
  @Roles('admin','user')
  @Query(() => [About], { name: 'IndexAbout' })
  findAll() {
    return this.aboutService.findAll();
  }


  @UseGuards(GqlAuthGuard,RolesGuard)
  @Roles('admin')
  @Query(() => About, { name: 'ShowAbout' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.aboutService.findOne(id);
  }

  @UseGuards(GqlAuthGuard,RolesGuard)
  @Roles('admin')
  @Mutation(() => AboutResponse)
  async updateAbout(@Args('id', { type: () => Int }) id: number, @Args('input') input: UpdateAboutInput) {
    try {
      const result = await this.aboutService.update(id, input);
      return {
        status: result.status,
        message: result.message,
        data: result.data,
      };
    } catch (error) {
      return {
        status: 500,
        message: 'Internal server error: ' + error.message,
      };
    }
  }

  @UseGuards(GqlAuthGuard,RolesGuard)
  @Roles('admin')
  @Mutation(() => AboutResponse)
  async removeAbout(@Args('id', { type: () => Int }) id: number) {
    try {
      const result = await this.aboutService.remove(id);
      return {
        status: result.status,
        message: result.message,
      };
    } catch (error) {
      return {
        status: 500,
        message: 'Internal server error: ' + error.message,
      };
    }
  }

  // SocialMedia CRUD Operations

  @UseGuards(GqlAuthGuard,RolesGuard)
  @Roles('admin')
  @Mutation(() => SocialResponse)
  async createSocialMedia(@Args('input') input: CreateSocialMediaInput) {
    try{
   const result =await this.socialMediaService.create(input);
 
   return {
     status: result.status,
     message: result.message,
     data: result.data,
   }

  } catch (error) {
    return {
      status: 500,
      message: 'Internal server error: ' + error.message,
    };
  }

  }

  @UseGuards(GqlAuthGuard,RolesGuard)
  @Roles('admin')
  @Query(() => [SocialMedia], { name: 'IndexSocialMedia' })
  async socialMedia() {
    const findall= await this.socialMediaService.findAll();
    return findall;
  }

  @UseGuards(GqlAuthGuard,RolesGuard)
  @Roles('admin')
  @Query(() => About, { name: 'ShowSocialMedia' })
  socialOne(@Args('id', { type: () => Int }) id: number) {
    return this.socialMediaService.findOne(id);
  }

  @UseGuards(GqlAuthGuard,RolesGuard)
  @Roles('admin')
  @Mutation(() => SocialResponse)
  async updatesocial(@Args('id', { type: () => Int }) id: number, @Args('input') input: UpdateSocialMediaInput) {
    try {
      const result = await this.socialMediaService.update(id, input);
      return {
        status: result.status,
        message: result.message,
        data: result.data,
      };
    } catch (error) {
      return {
        status: 500,
        message: 'Internal server error: ' + error.message,
      };
    }
  }

  @UseGuards(GqlAuthGuard,RolesGuard)
  @Roles('admin')
  @Mutation(() => SocialResponse)
  async removeSocialMedia(@Args('id', { type: () => Int }) id: number) {
    try {
   const result= await this.socialMediaService.remove(id);
   
   return {
    status: result.status,
    message: result.message,
   }

  } catch (error) {
    return {
      status: 500,
      message: 'Internal server error: ' + error.message,
    };
  }
  }


}
