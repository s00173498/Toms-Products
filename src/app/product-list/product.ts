//Interface
export interface IProduct{
    //declare the products that will be showen and 
    //there info
    productId: number;
    productName: string;
    productCode: string;
    releaseDate: string;
    description: string;
    price: number;
    starRating: number;
    imageStr: string;
    imageUrl: string;
}