import { HttpException, ArgumentsHost, Logger, Catch } from "@nestjs/common";
import { BaseExceptionFilter } from "@nestjs/core";
import { ZodSerializationException } from "nestjs-zod";
import { ZodError } from "zod";

@Catch(HttpException)
export class HttpExceptionFilter extends BaseExceptionFilter {
  private logger = new Logger(HttpExceptionFilter.name);

  catch(exception: HttpException, host: ArgumentsHost) {
    if (exception instanceof ZodSerializationException) {
      const zodError = exception.getZodError();

      if (zodError instanceof ZodError) {
        this.logger.error(`ZodSerializationException: ${zodError.message}`);
      }
    }

    // oxlint-disable-next-line promise/valid-params promise/prefer-await-to-then
    super.catch(exception, host);
  }
}
