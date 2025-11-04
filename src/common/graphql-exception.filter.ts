import {
    ArgumentsHost,
    BadRequestException,
    Catch,
    ExceptionFilter,
  } from '@nestjs/common';
  import { GqlArgumentsHost } from '@nestjs/graphql';
  import { GraphQLError } from 'graphql';
  
  @Catch(BadRequestException)
  export class GqlBadRequestExceptionFilter implements ExceptionFilter {
    catch(exception: BadRequestException, host: ArgumentsHost) {
      const gqlHost = GqlArgumentsHost.create(host);
      const response = exception.getResponse();
      const message =
        (response as any).message || 'Bad Request';
  
      // ✅ THROW instead of return, and avoid default stacktrace
      throw new GraphQLError('Validation error', {
        extensions: {
          code: 'VALIDATION_ERROR',
          statusCode: 400,
          messages: Array.isArray(message) ? message : [message],
        },
      });
    }
  }
  