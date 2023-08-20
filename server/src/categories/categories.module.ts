import { Module } from '@nestjs/common';
import { CategoriesController } from './categories.controller';
import { CategoriesService } from './categories.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Category, categorySchema } from 'src/common/schema/category.schema';

@Module({
  imports:[ MongooseModule.forFeature([{name: Category.name, schema: categorySchema}])],
  controllers: [CategoriesController],
  providers: [CategoriesService]
})
export class CategoriesModule {}
