import { Transform } from "class-transformer";
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
  ValidateIf,
  Matches,
} from "class-validator";

export class CreateMealDto {
  @IsOptional()
  @IsString()
  @ValidateIf(
    (o: CreateMealDto) => o.barcode !== undefined && o.barcode !== null,
  )
  @Matches(/^\d{8}$|^\d{13}$/, { message: "Barcode must be 8 or 13 digits" })
  barcode?: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(128)
  name: string;

  @IsOptional()
  @IsString()
  @MaxLength(128)
  brand?: string;

  @IsNumber()
  @Min(0)
  @Max(9999)
  @Transform(({ value }: { value: string }) => parseFloat(value))
  energyKcalPer100g: number;

  @IsNumber()
  @Min(0)
  @Max(100)
  @Transform(({ value }: { value: string }) => parseFloat(value))
  proteinPer100g: number;

  @IsNumber()
  @Min(0)
  @Max(100)
  @Transform(({ value }: { value: string }) => parseFloat(value))
  fatPer100g: number;

  @IsNumber()
  @Min(0)
  @Max(100)
  @Transform(({ value }: { value: string }) => parseFloat(value))
  carbohydratesPer100g: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(100)
  @Transform(({ value }: { value: string }) => parseFloat(value) ?? null)
  saturatedFatPer100g?: number | null;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(100)
  @Transform(({ value }: { value: string }) => parseFloat(value) ?? null)
  sugarsPer100g?: number | null;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(100)
  @Transform(({ value }: { value: string }) => parseFloat(value) ?? null)
  fiberPer100g?: number | null;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(100)
  @Transform(({ value }: { value: string }) => parseFloat(value) ?? null)
  saltPer100g?: number | null;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(100000)
  @Transform(({ value }: { value: string }) => parseFloat(value) ?? null)
  sodiumPer100g?: number | null;
}
