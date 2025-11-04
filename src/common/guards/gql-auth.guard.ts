// common/guards/gql-auth.guard.ts
import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class GqlAuthGuard extends AuthGuard('jwt') {
  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req;
  }

  handleRequest(err: any, user: any) {
    if (err || !user) {
      throw new UnauthorizedException('تۆکنەکە نادروستە یان بەسەرچووە. تکایە دووبارە بچۆرەوە ژوورەوە');
    }
    return user;
  }
}

// ✅ Enables @UseGuards(GqlAuthGuard) for protecting GraphQL resolvers.
