import { Module } from "@nestjs/common";
import { GuardsModule } from "src/guards/guards.module";
import { DrizzleModule } from "src/drizzle/drizzle.module";
import { MealsModule } from "src/meals/meals.module";
import { ConsumedMealsController } from "./controllers/consumedMeals.controller";
import { ConsumedMealsService } from "./services/consumedMeals.service";

@Module({
  imports: [GuardsModule, DrizzleModule, MealsModule],
  controllers: [ConsumedMealsController],
  providers: [ConsumedMealsService],
  exports: [ConsumedMealsService],
})
export class ConsumedMealsModule {}
