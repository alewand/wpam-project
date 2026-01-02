import { Transform } from "class-transformer";
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  Length,
  Max,
  MaxLength,
  Min,
} from "class-validator";

export class CreateMealDto {
  @IsOptional()
  @IsString()
  @Length(13)
  barcode?: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(96)
  name: string;

  @IsOptional()
  @IsString()
  @MaxLength(96)
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

  @IsOptional()
  @IsString()
  @IsUUID(4)
  addedBy?: string | null;
}
