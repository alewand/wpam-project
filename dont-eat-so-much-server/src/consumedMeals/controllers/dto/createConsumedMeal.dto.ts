import { Transform } from "class-transformer";
import {
  IsDate,
  IsDateString,
  IsNumber,
  IsUUID,
  Max,
  Min,
} from "class-validator";

export class CreateConsumedMealDto {
  @IsUUID()
  mealId: string;

  @IsNumber()
  @Min(1)
  @Max(10000)
  @Transform(({ value }: { value: string }) => parseFloat(value))
  amountInGrams: number;

  @IsDateString()
  consumedAt: string;
}
