import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
    catch(exception: any, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const status = exception instanceof HttpException
            ? exception.getStatus()
            : 500;

        const errorResponse = {
            statusCode: status,
            message: exception.message || 'Internal server error',
            ...(process.env.NODE_ENV === 'development' && { stack: exception.stack }),
        };

        response.status(status).json(errorResponse);
    }
}
