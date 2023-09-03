import { Module } from '@nestjs/common';
import { CheckoutController } from './checkout.controller';
import { CheckoutService } from './checkout.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CheckOut, CheckOutSchema } from 'src/checkout/checkOut.schema';

@Module({
  imports: [MongooseModule.forFeature([{name: CheckOut.name, schema: CheckOutSchema}])],
  controllers: [CheckoutController],
  providers: [CheckoutService]
})
export class CheckoutModule {}
