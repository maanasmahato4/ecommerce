import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { CheckoutService } from './checkout.service';
import { JwtAuthGuard } from 'src/common/guards/jwt.guard';
import { ApiTags } from '@nestjs/swagger';
import { CheckOutDto } from 'src/common/dto/checkout.dto';
import {Request} from "express";
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Role } from 'src/common/enum/roles.enum';

@ApiTags("Orders")
@Controller('checkout')
export class CheckoutController {
    constructor(
        private checkOutService: CheckoutService
    ){}

    /* @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.Employee, Role.Admin) */
    @Get("/count")
    async getOrderCount(@Req() req: Request){
        return await this.checkOutService.getOrderCount(req);
    }

    @UseGuards(JwtAuthGuard)
    @Get("/")
    async getAllOrders(){
        return await this.checkOutService.getAllOrders();
    }

    @UseGuards(JwtAuthGuard)
    @Get("/:userId")
    async getOrders(@Param('userId') id: string){
        return await this.checkOutService.getOrders(id);
    }

    @UseGuards(JwtAuthGuard)
    @Post("/")
    async checkOut(@Body() checkOutData: CheckOutDto) {
        this.checkOutService.CheckOut(checkOutData);
    }

    @UseGuards(JwtAuthGuard)
    @Put("/:id")
    async updateOrder(@Param('id') id: string, @Body() checkOutData: CheckOutDto) {
        this.checkOutService.UpdateOrder(id, checkOutData);
    }

    @UseGuards(JwtAuthGuard)
    @Delete("/:id")
    async deleteOrder(@Param('id') id: string) {
        this.checkOutService.DeleteOrder(id);
    }
}
