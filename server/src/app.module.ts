import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ProductsModule } from './products/products.module';
import { CategoriesModule } from './categories/categories.module';
import { MongooseModule } from "@nestjs/mongoose";
import { CheckoutModule } from './checkout/checkout.module';
@Module({
  imports: [
    UserModule, AuthModule, ProductsModule, CategoriesModule,
    MongooseModule.forRoot("mongodb+srv://maanasmahato456:maanas@cluster0.lqte84g.mongodb.net/?retryWrites=true&w=majority"),
    CheckoutModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
