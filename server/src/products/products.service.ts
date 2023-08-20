import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Response, Request } from "express";
import { Model } from 'mongoose';
import { ProductDto } from 'src/common/dto/product.dto';
import { Product, ProductDocument } from 'src/common/schema/product.schema';

@Injectable()
export class ProductsService {
    constructor(
        @InjectModel(Product.name) private productModel: Model<ProductDocument>
    ) { }
    async GetProduct(id: string): Promise<Array<Product>> {
        try {
            return await this.productModel.findById(id);
        } catch (err) {
            throw new Error(err);
        }
    }

    async GetProducts(req: Request): Promise<Array<Product>> {
        try {
            if (req.query.category == "all") {
                return await this.productModel.find();
            }
            else if (req.query.category != "all") {
                return await this.productModel.find({ category: req.query.category });
            }
        } catch (err) {
            throw new Error(err);
        }
    }

    async AddProduct(productData: ProductDto) {
        try {
            const newProduct = new this.productModel({ ...productData });
            return await newProduct.save();
        } catch (err) {
            throw new Error(err);
        }
    }


    async UpdateProduct(uProductData: ProductDto, id: string): Promise<Product> {
        try {
            if (!(await this.productModel.findById(id))) {
                throw new BadRequestException();
            }
            const UpdateProductData = {
                ...uProductData
            }
            const updatedProduct = this.productModel.findByIdAndUpdate(id, UpdateProductData, {
                new: true
            });
            return await updatedProduct;
        } catch (err) {
            throw new Error(err);
        }
    }

    async DeleteProduct(id: string, res: Response) {
        try {
            if (!(await this.productModel.findById(id))) {
                throw new BadRequestException();
            }

            await this.productModel.findByIdAndDelete(id);
            res.status(200).json({ message: "deleted" })
        } catch (err) {
            throw new Error(err);
        }
    }
}
