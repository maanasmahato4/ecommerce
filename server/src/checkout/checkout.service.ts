import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CheckOut, CheckOutDocument, } from 'src/common/schema/checkOut.schema';

@Injectable()
export class CheckoutService {
    constructor(
        @InjectModel(CheckOut.name) private checkOutModel: Model<CheckOutDocument>
    ) { }
    async getOrders(id: string) {
        try {
            return await this.checkOutModel.findById(id);
        } catch (error) {
            throw new Error(error);
        }
    }
    async CheckOut(checkOutData: any) {
        try {
            const savedCheckOut = new this.checkOutModel(checkOutData);
            return await savedCheckOut.save();
        } catch (error) {
            throw new Error(error);
        }
    }
}
