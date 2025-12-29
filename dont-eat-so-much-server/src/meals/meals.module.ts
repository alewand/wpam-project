import { Module } from "@nestjs/common";
import { GuardsModule } from "src/guards/guards.module";
import { MealsOFFService } from "./services/mealsOff.service";
import { HttpModule } from "@nestjs/axios";
import { DrizzleModule } from "src/drizzle/drizzle.module";
import { MealsService } from "./services/meals.service";
import { MealsController } from "./controllers/meals.controller";
import { MealsApiService } from "./services/mealsApi.service";
import { TokensModule } from "src/tokens/tokens.module";

@Module({
  imports: [GuardsModule, HttpModule, DrizzleModule, TokensModule],
  controllers: [MealsController],
  providers: [MealsService, MealsOFFService, MealsApiService],
  exports: [MealsService, MealsOFFService, MealsApiService],
})
export class MealsModule {}
