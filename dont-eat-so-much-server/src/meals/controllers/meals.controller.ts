import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard, type AuthUserPayload } from 'src/guards/auth.guard';
import { CurrentUser } from 'src/guards/decorators/currentUser';
import { CreateMealDto } from './dto/create-product.dto';
import { MealsApiService } from '../services/mealsApi.service';

@Controller('meals')
export class MealsController {
  constructor(private mealsApiService: MealsApiService) {}

  @Post('barcode/:barcode')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  async getMealByBarcode(@Param('barcode') barcode: string) {
    return this.mealsApiService.getMealByBarcode(barcode);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(AuthGuard)
  async createMeal(
    @CurrentUser() user: AuthUserPayload,
    @Body() createMealDto: CreateMealDto,
  ) {
    return this.mealsApiService.createMeal(createMealDto, user.userId);
  }

  @Get('latest/:page')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  async getLatestMealsByUser(
    @CurrentUser() user: AuthUserPayload,
    @Param('page') page: number,
  ) {
    return this.mealsApiService.getLatestMealsByUser(user.userId, page);
  }
}
