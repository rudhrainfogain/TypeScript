import { IsNotEmpty, IsNumber, IsPositive } from 'class-validator';

export class Product {
  @IsNotEmpty()
  title: string;
  @IsNumber()
  @IsPositive()
  price: number;

  constructor(title: string, price: number) {
    this.price = price;
    this.title = title;
  }
  getInformation() {
    return [this.title, `$${this.price}`];
  }
}
