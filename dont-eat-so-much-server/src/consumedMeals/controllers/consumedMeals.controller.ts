import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  UseGuards,
  Version,
} from "@nestjs/common";
import { ConsumedMealsService } from "../services/consumedMeals.service";
import { AuthGuard, type AuthUserPayload } from "src/guards/auth.guard";
import { CurrentUser } from "src/guards/decorators/currentUser";
import { CreateConsumedMealDto } from "./dto/createConsumedMeal.dto";
import { EditConsumedMealDto } from "./dto/editConsumedMeal.dto";
import { ParseIsoDatePipe } from "src/pipes/isoDatePipe";

@Controller("consumed-meals")
export class ConsumedMealsController {
  constructor(private consumedMealsService: ConsumedMealsService) {};

  @Version("1")
  @Get(":date")
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  async getConsumedMealsV1(
    @CurrentUser() user: AuthUserPayload,
    @Param("date", new ParseIsoDatePipe()) date: string,
  ) {
    return this.consumedMealsService.getConsumedMealsByUserIdAndDate(
      user.userId,
      date,
    );
  };

  @Version("1")
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(AuthGuard)
  async createConsumedMealV1(
    @CurrentUser() user: AuthUserPayload,
    @Body() createConsumedMealDto: CreateConsumedMealDto,
  ) {
    return this.consumedMealsService.createConsumedMeal(
      createConsumedMealDto,
      user.userId,
    );
  };

  @Version("1")
  @Put(":consumedMealId")
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(AuthGuard)
  async editConsumedMealV1(
    @CurrentUser() user: AuthUserPayload,
    @Param("consumedMealId", new ParseUUIDPipe()) consumedMealId: string,
    @Body() editConsumedMealDto: EditConsumedMealDto,
  ) {
    await this.consumedMealsService.editConsumedMeal(
      consumedMealId,
      editConsumedMealDto,
      user.userId,
    );
  };

  @Version("1")
  @Delete(":consumedMealId")
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(AuthGuard)
  async deleteConsumedMealV1(
    @CurrentUser() user: AuthUserPayload,
    @Param("consumedMealId", new ParseUUIDPipe()) consumedMealId: string,
  ) {
    await this.consumedMealsService.deleteConsumedMeal(consumedMealId, user.userId);
  };
};
