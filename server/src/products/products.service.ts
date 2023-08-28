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
        // page
        let page: number = 0;
        if (typeof req.query.page == "string") {
            page = (parseInt(req.query.page) - 1) || 0;
        }

        // limit
        let limit: number = 10;
        if (typeof req.query.limit == "string") {
            limit = parseInt(req.query.limit) || 10;
        }

        // search
        const search: any = req.query.search || "";

        // sort
        let sort: any = req.query.sort || ["price"];
        if(typeof req.query.sort == "string"){
            req.query.sort ? (sort = req.query.sort.split(",")) : (sort = [sort]);
        }
        let sortBy = {};
        if(sort[1]){
            sortBy[sort[0]] = sort[1];
        } else {
            sortBy[sort[0]] = "asc";
        }

        // category
        let category = req.query.category || "all"

        // filtering
        if(search){
            page = 0;
            limit = Infinity;
        }

        let filter: any = {
            productName: new RegExp(search, "i")
        }

        if(!(category === "all")){
            filter.category = req.query.category;
        }
     
        try {
            return await this.productModel.find(filter).limit(limit).sort(sortBy).skip(page * limit);
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
