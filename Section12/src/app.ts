import _ from 'lodash';
import { Product } from './product.model';
import 'reflect-metadata';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';

console.log(_.shuffle([1, 2, 3]));
declare var GLOBAL: any;
console.log(GLOBAL);
const Products = [
  { title: 'a', price: 20.0 },
  { title: 'b', price: 10.0 }
];
//manually convert to products array
const convertedProducts: Product[] = Products.map(prd => {
  return new Product(prd.title, prd.price);
});
// convert to products array using plainToClass
const convertedProducts1 = plainToClass(Product, Products);
//loop through the array and print it
for (const prod of convertedProducts) {
  console.log(prod.getInformation());
}

//loop through the array and print it
for (const prod of convertedProducts1) {
  console.log(prod.getInformation());
}
const prod = new Product('', -5);
validate(prod).then(errors => {
  if (errors) {
    console.log('validation errors', errors);
  } else {
    console.log(prod.getInformation());
  }
});
