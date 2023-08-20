import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import {} from "express";
import { CheckoutService } from './checkout.service';
import { JwtAuthGuard } from 'src/common/guards/jwt.guard';
import { ApiTags } from '@nestjs/swagger';

@ApiTags("Orders")
@Controller('checkout')
export class CheckoutController {

    constructor(
        private checkOutService: CheckoutService
    ){}

    @UseGuards(JwtAuthGuard)
    @Get("/")
    async getOrders(@Param('userId') id: string){
        return await this.checkOutService.getOrders(id);
    }

    @UseGuards(JwtAuthGuard)
    @Post("/")
    async checkOut(@Body() checkOutData: any) {
        this.checkOutService.CheckOut(checkOutData);
    }
}
