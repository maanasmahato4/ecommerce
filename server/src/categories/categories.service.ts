import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Response } from "express";
import { Model } from 'mongoose';
import { CategoryDto } from 'src/categories/category.dto';
import { Category, categoryDocument } from 'src/categories/category.schema';

@Injectable()
export class CategoriesService {
    constructor(
        @InjectModel(Category.name) private categoryModel: Model<categoryDocument>
    ) { }
    async GetCategories(): Promise<Array<Category>> {
        try {
            return await this.categoryModel.find();
        } catch (error) {
            throw new NotFoundException(error);
        }
    }

    async AddCategory(categoryData: CategoryDto) {
        try {
            const savedCategory = new this.categoryModel({...categoryData});
            return await savedCategory.save();
        } catch (error) {
            throw new BadRequestException(error);
        }
    }

    async DeleteCategory(id: string, res: Response) {
        try {
            if (!(await this.categoryModel.findById(id))) {
                throw new BadRequestException();
            }
            await this.categoryModel.findByIdAndDelete(id);
            res.status(200).json({ message: "success" });
        } catch (error) {
            throw new BadRequestException(error);
        }
    }
}
