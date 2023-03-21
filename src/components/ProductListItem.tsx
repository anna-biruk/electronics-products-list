import { Product } from 'data/products';
import React, { Component } from 'react';
import _ from 'lodash';

type MyProps = {
  product: Product;
};

export class ProductListItem extends Component<MyProps> {
  render() {
    const { product } = this.props;

    return (
      <div className="max-w-sm flex flex-col bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <img className="rounded-t-lg w-full h-1/3 object-cover" src={product.thumbnail} alt="" />
        <div className="p-5 h-2/3 flex flex-col">
          <h5 className="mb-2 text-lg font-bold tracking-tight text-gray-900 dark:text-white">
            {product.title}
          </h5>
          <p className="mb-3 text-sm text-gray-700 dark:text-gray-400">
            {_.truncate(product.description, { length: 100, separator: ' ' })}
          </p>
          <h3 className="mb-2 text-xl font-semibold tracking-tight text-gray-900 dark:text-white mt-auto">
            {product.price}$
          </h3>
        </div>
      </div>
    );
  }
}
