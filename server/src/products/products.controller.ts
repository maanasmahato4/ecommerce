import { Controller, Post, Get, Put, Delete, Param, Res, Req, Body, UseGuards } from '@nestjs/common';
import { ProductsService } from './products.service';
import { Response, Request, Express } from "express";
import { ProductDto } from 'src/products/product.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/enum/roles.enum';
import { ApiTags } from '@nestjs/swagger';

@ApiTags("Product")
@Controller('product')
export class ProductsController {
    constructor(
        private productsService: ProductsService
    ) { }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.Employee, Role.Admin)
    @Get("/count")
    async getProductsCount(@Req() req: Request) {
        return await this.productsService.GetProductsCount(req);
    }

    @UseGuards(JwtAuthGuard)
    @Get("/:id")
    async getProduct(@Param("id") id: string) {
        return await this.productsService.GetProduct(id);
    }

    @UseGuards(JwtAuthGuard)
    @Get("/")
    async getProducts(@Req() req: Request) {
        return await this.productsService.GetProducts(req);
    }


    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.Employee, Role.Admin)
    @Post('/')
    async addProduct(@Body() productData: ProductDto) {
        return await this.productsService.AddProduct(productData);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.Employee, Role.Admin)
    @Put("/:id")
    async updateProduct(@Param('id') id: string, @Body() uProductData: ProductDto) {
        return await this.productsService.UpdateProduct(uProductData, id);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.Employee, Role.Admin)
    @Delete("/:id")
    async deleteProduct(@Param('id') id: string, @Res() res: Response) {
        return await this.productsService.DeleteProduct(id, res);
    }

}
