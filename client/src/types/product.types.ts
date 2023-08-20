export interface IProduct {
    productName: string,
    productDescription: string,
    inStock: number,
    category: string,
    brandName: string,
    price: number,
    discount: number,
    imageUrls: Array<string>
}

export interface IGetProduct extends IProduct {
    _id: string
}

export interface IProductContext {
    product: any,
    setProduct: (product: any) => void
}