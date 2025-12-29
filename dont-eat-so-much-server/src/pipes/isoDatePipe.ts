import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from "@nestjs/common";
import { DateTime } from "luxon";
import { ErrorType } from "src/errors/types";

export interface ParseIsoDatePipeOptions {
  message?: string;
}

@Injectable()
export class ParseIsoDatePipe implements PipeTransform<string, string> {
  constructor(private readonly options: ParseIsoDatePipeOptions = {}) {}

  transform(value: string, _metadata: ArgumentMetadata): string {
    const validatedDate = DateTime.fromISO(value);

    if (!validatedDate.isValid) {
      throw new BadRequestException(
        this.options.message ?? ErrorType.INVALID_DATE_FORMAT,
      );
    }

    return validatedDate.toISODate();
  }
}
