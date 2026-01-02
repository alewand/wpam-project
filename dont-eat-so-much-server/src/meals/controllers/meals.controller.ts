import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  UseGuards,
  Version,
} from "@nestjs/common";
import { AuthGuard } from "src/guards/auth.guard";
import { MealsApiService } from "../services/mealsApi.service";

@Controller("meals")
export class MealsController {
  constructor(private mealsApiService: MealsApiService) {}

  @Version("1")
  @Get("barcode/:barcode")
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  async getMealByBarcodeV1(@Param("barcode") barcode: string) {
    return this.mealsApiService.getMealByBarcode(barcode);
  }

  // @Post()
  // @HttpCode(HttpStatus.CREATED)
  // @UseGuards(AuthGuard)
  // async createMeal(
  //   @CurrentUser() user: AuthUserPayload,
  //   @Body() createMealDto: CreateMealDto,
  // ) {
  //   return this.mealsApiService.createMeal(createMealDto, user.userId);
  // }

  // @Get("latest/:page")
  // @HttpCode(HttpStatus.OK)
  // @UseGuards(AuthGuard)
  // async getLatestMealsByUser(
  //   @CurrentUser() user: AuthUserPayload,
  //   @Param("page") page: number,
  // ) {
  //   return this.mealsApiService.getLatestMealsByUser(user.userId, page);
  // }
}
