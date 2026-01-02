import { Module } from "@nestjs/common";
import { AuthGuard } from "./auth.guard";
import { TokensModule } from "src/tokens/tokens.module";

@Module({
  imports: [TokensModule],
  providers: [AuthGuard],
  exports: [AuthGuard],
})
export class GuardsModule {}
