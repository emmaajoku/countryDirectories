import { Module } from '@nestjs/common';
import { JwtStrategyService } from './jwt-strategy.service';

@Module({
  providers: [JwtStrategyService],
  exports : [
    JwtStrategyService,
],
})
export class JwtStrategyModule {}
