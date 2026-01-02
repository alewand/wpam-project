import { Module } from "@nestjs/common";
import { GuardsModule } from "src/guards/guards.module";
import { DrizzleModule } from "src/drizzle/drizzle.module";
import { MealsModule } from "src/meals/meals.module";
import { ConsumedMealsController } from "./controllers/consumedMeals.controller";
import { ConsumedMealsService } from "./services/consumedMeals.service";
import { TokensModule } from "src/tokens/tokens.module";

@Module({
  imports: [GuardsModule, DrizzleModule, MealsModule, TokensModule],
  controllers: [ConsumedMealsController],
  providers: [ConsumedMealsService],
  exports: [ConsumedMealsService],
})
export class ConsumedMealsModule {}
