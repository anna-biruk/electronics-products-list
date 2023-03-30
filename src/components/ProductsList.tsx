import React, { useEffect, useState } from 'react';
import { Header } from './Header';
import { Product, products } from '../data/products';
import { ProductListItem } from './ProductListItem';

export const ProductsList = () => {
  const [search, setSearch] = useState(localStorage.getItem('search') || '');
  const [filteredItems, setFilteredItems] = useState<Product[]>([]);

  useEffect(() => {
    const filteredItems = products.filter((item) => {
      return item.title.toLowerCase().includes(search.toLowerCase());
    });
    setFilteredItems(filteredItems);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const handleSearchSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    const result = products.filter((item) => {
      return item.title.toLowerCase().includes(search.toLowerCase());
    });
    localStorage.setItem('search', search);
    setFilteredItems(result);
  };

  return (
    <div className="max-w-7xl mx-auto">
      <Header search={search} handleSearch={handleSearch} handleSearchSubmit={handleSearchSubmit} />
      <div className="grid grid-cols-4 auto-rows-[300px] gap-6 mt-10 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 sm:justify-items-center ">
        {filteredItems?.map((product: Product) => {
          return <ProductListItem key={product.id} product={product} />;
        })}
      </div>
    </div>
  );
};
