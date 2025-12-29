import { IsNumber, isUUID, IsUUID, Max, Min } from "class-validator";

export class EditConsumedMealDto {
  @IsUUID()
  mealId: string;

  @IsNumber()
  @Min(1)
  @Max(10000)
  amountInGrams: number;
}
