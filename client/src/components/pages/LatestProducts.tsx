import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useAppSelector } from '../../hooks/reduxHooks';
import OneCard from './OneCard';
import ModalAddProducts from '../IU/ModalAddProducts';
import ModalEditProducts from '../IU/ModalEditProducts';
import useProductHooks from '../../hooks/useProductHooks';
import type { ProductType } from '../../types/productType';
import { getCategories, getColorService, getSizes } from '../../services/modalService';

export default function LatestProductList({showLastN}): JSX.Element {
  const { getProductsHandler } = useProductHooks();

  const [sortedProducts, setSortedProducts] = useState([]);

  const user = useAppSelector((state) => state.user);
  
  const [color, setColor] = useState([]);
  const [categories, setCategory] = useState([]);
  const [filter, setFilter] = useState({ color: 0, category: 0 });
  const product = useAppSelector((state) => state.product.productsData.products);
  const [filtred, setFiltred] = useState(product);
  
  
  useEffect(() => {
    getProductsHandler();
    getColorService()
      .then((data) => setColor(data))
      .catch((err) => console.log(err));
    getCategories()
      .then((data) => setCategory(data))
      .catch((err) => console.log(err));
      const sorted = [...product].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setSortedProducts(sorted);
  }, [product.length]);

  return (
    <div style={{marginTop:'150px'}}>
      <div className="bg-white">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {sortedProducts?.map((el) => <OneCard key={el.id} product={el} />)}
          </div>
        </div>
      </div>
    </div>
  );
}
