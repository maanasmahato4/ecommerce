import { Controller, Get, Post, Delete, Res, Body, Param, UseGuards } from '@nestjs/common';
import { Response } from "express";
import { CategoriesService } from './categories.service';
import { CategoryDto } from 'src/common/dto/category.dto';
import { JwtAuthGuard } from 'src/common/guards/jwt.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Role } from 'src/common/enum/roles.enum';
import { Roles } from 'src/common/decorators/roles.decorator';
import { ApiTags } from '@nestjs/swagger';

@ApiTags("categories")
@Controller('categories')
export class CategoriesController {
    constructor(
        private categoryService: CategoriesService
    ) { }

    @UseGuards(JwtAuthGuard)
    @Get("/")
    async getCategories() {
        return await this.categoryService.GetCategories();
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.Employee, Role.Admin)
    @Post("/")
    async AddCategory(@Body() categoryData: CategoryDto) {
        return await this.categoryService.AddCategory(categoryData);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.Employee, Role.Admin)
    @Delete("/:id")
    async DeleteCategory(@Param('id') id: string, @Res() res: Response) {
        return await this.categoryService.DeleteCategory(id, res);
    }
}
