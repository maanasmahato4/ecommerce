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

export interface ICartProduct extends IGetProduct {
    quantity: number;
}

export interface IProductContext {
    cartItems: Array<IGetProduct>,
    setCartItem: (cartItem: any) => void,
    searchData: string,
    setSearchData: (searchData: string) => void,
    product: any,
    setProduct: (product: any) => void
}