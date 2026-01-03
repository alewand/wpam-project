import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Query,
  UseGuards,
  Version,
} from "@nestjs/common";
import { AuthGuard, type AuthUserPayload } from "src/guards/auth.guard";
import { CurrentUser } from "src/guards/decorators/currentUser";
import { MealsApiService } from "../services/mealsApi.service";
import { CreateCustomMealDto } from "./dto/createCustomMeal.dto";

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

  @Version("1")
  @Get("search")
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  async searchMealsV1(
    @Query("q") query: string,
    @Query("page") page?: string,
    @Query("limit") limit?: string,
    @Query("onlyMyMeals") onlyMyMeals?: string,
    @CurrentUser() user?: AuthUserPayload,
  ) {
    const pageNumber = page ? parseInt(page, 10) : undefined;
    const limitNumber = limit ? parseInt(limit, 10) : undefined;
    const onlyMyMealsBool = onlyMyMeals === "true";
    return this.mealsApiService.searchMeals(
      query || "",
      pageNumber,
      limitNumber,
      onlyMyMealsBool ? user?.userId : undefined,
    );
  }

  @Version("1")
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(AuthGuard)
  async createMealV1(
    @CurrentUser() user: AuthUserPayload,
    @Body() createCustomMealDto: CreateCustomMealDto,
  ) {
    return this.mealsApiService.createCustomMeal(
      createCustomMealDto,
      user.userId,
    );
  }
}
