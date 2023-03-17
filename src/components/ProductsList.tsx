import React, { Component } from 'react';
import { Header } from './Header';
import { Product, products } from '../data/products';
import { ProductListItem } from './ProductListItem';

type State = {
  search: string;
  filteredItems: Product[];
  products: Product[];
};

type Props = object;

export class ProductsList extends Component<Props, State> {
  state = {
    search: localStorage.getItem('search') || '',
    filteredItems: products,
    products,
  };
  componentDidMount() {
    if (this.state.search) {
      const filteredItems = products.filter((p: Product) =>
        p.title.toLowerCase().includes(this.state.search.toLowerCase())
      );
      this.setState({ filteredItems });
    }
  }

  handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ search: event.target.value });
  };

  handleSearchSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    const result = products.filter((item) => {
      return item.title.toLowerCase().includes(this.state.search.toLowerCase());
    });
    localStorage.setItem('search', this.state.search);
    this.setState({ filteredItems: result });
  };

  render() {
    const { search, filteredItems } = this.state;
    return (
      <div className="max-w-7xl mx-auto">
        <Header
          search={search}
          handleSearch={this.handleSearch}
          handleSearchSubmit={this.handleSearchSubmit}
        />
        <div className="grid grid-cols-4 auto-rows-[300px] gap-6 mt-10 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 sm:justify-items-center ">
          {filteredItems.map((product: Product) => {
            return <ProductListItem key={product.id} product={product} />;
          })}
        </div>
      </div>
    );
  }
}
