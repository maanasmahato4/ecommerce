import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { CheckoutService } from './checkout.service';
import { JwtAuthGuard } from 'src/common/guards/jwt.guard';
import { ApiTags } from '@nestjs/swagger';
import { CheckOutDto } from 'src/common/dto/checkout.dto';

@ApiTags("Orders")
@Controller('checkout')
export class CheckoutController {
    constructor(
        private checkOutService: CheckoutService
    ){}

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
