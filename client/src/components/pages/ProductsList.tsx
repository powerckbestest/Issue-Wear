import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useAppSelector } from '../../hooks/reduxHooks';
import OneCard from './OneCard';
import ModalAddProducts from '../IU/ModalAddProducts';
import ModalEditProducts from '../IU/ModalEditProducts';
import useProductHooks from '../../hooks/useProductHooks';
import type { ProductType } from '../../types/productType';

export default function MainPage(): JSX.Element {
  const [show, setShow] = useState(false);
  const [editProduct, setEditProduct] = useState<ProductType | null>(null);
  const { getProductsHandler } = useProductHooks();

  const user = useAppSelector((state) => state.user)
  console.log(user)
  const handleEditClick = (): void => {
    setShow(true);
  };

  useEffect(() => {
    getProductsHandler();
  }, []);

  const product = useAppSelector((state) => state.product.productsData.products);
  // console.log(product)
  return (
    <>
    {}
      <div className='flex items-center justify-center mt-5'>
        <button
          type="button"
          className="mt-3 w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
          onClick={handleEditClick}
        >
          Добавить товар
        </button>
      </div>
      <div className="bg-white">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <h2 className="text-4xl font-bold tracking-tight text-gray-900 text-center">
            Одежда:
          </h2>
          <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {product?.map((el) => <OneCard key={el.id} product={el} />)}
          </div>
        </div>
        <ModalAddProducts show={show} onHide={() => setShow(false)} />
        <ModalEditProducts
          show={!!editProduct}
          onHide={() => setEditProduct(null)}
          product={editProduct}
        />
      </div>
    </>
  );
}
