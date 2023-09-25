import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import type { ProductType } from '../../types/productType';
import useProductHooks from '../../hooks/useProductHooks';

type ProductProps = {
  product: ProductType;
};

export default function OneCard({ product }: ProductProps): JSX.Element {
  const { deleteProductHandler } = useProductHooks();
  return (
    <div>
      <div key={product.id} className="group relative">
        <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
          <img
            src={`http://localhost:3001/images/${product?.Images[0]?.url}`}
            alt={product.Image}
            className="h-full w-full object-cover object-center lg:h-full lg:w-full"
          />
        </div>
        <div className="mt-4 flex justify-between">
          <div>
            <h3 className="text-sm text-gray-700">
              <NavLink className="nav-link" to={`/products/${product.id}`}>
                <span aria-hidden="true" className="absolute inset-0" />
                {product.title}
              </NavLink>
            </h3>
            <p className="mt-1 text-sm text-gray-500">Цвет: {product.Color.title}</p>
          </div>
          <p className="text-sm font-medium text-gray-900">Цена: {product.price}</p>
        </div>
      </div>
      {/* <button
        onClick={(e) => addProductCartHandler(e, product.id)}
        type="button"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        В корзину
      </button> */}
      <button 
      type='button'
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      onClick={(e) => deleteProductHandler(e, product.id)}

      
      
      >Удалить</button>
    </div>
  );
}
