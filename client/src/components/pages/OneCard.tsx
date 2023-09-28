import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import type { ProductType } from '../../types/productType';
import useProductHooks from '../../hooks/useProductHooks';
import { useAppSelector } from '../../hooks/reduxHooks';

type ProductProps = {
  product: ProductType;
};

export default function OneCard({ product }: ProductProps): JSX.Element {
  const { deleteProductHandler } = useProductHooks();
  const user = useAppSelector((state) => state.user);
  const isDarkMode = true;

  return (
    <div>
      <div key={product.id} className="group relative">
        <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80 ">
          <img
            src={`http://localhost:3001/images/${product?.Images[0]?.url}`}
            alt={product.Image}
            className="h-full w-full object-cover object-center lg:h-full lg:w-full"
          />
        </div>
        <div className="mt-4 flex justify-between">
          <div>
            <h3 className={`${isDarkMode ? 'text-dark' : 'text-white'} text-sm`}>
              <NavLink className="nav-link" to={`/products/${product.id}`}>
                <span aria-hidden="true" className="absolute inset-0" />
                {product.title}
              </NavLink>
            </h3>
            <p className={`${isDarkMode ? 'text-dark' : 'text-white'} mt-1 text-sm`}>
              Цвет: {product.Color.title}
            </p>
          </div>
          <p className={`${isDarkMode ? 'text-dark' : 'text-white'} font-medium`}>
            Цена: {product.price} руб.
          </p>
        </div>
      </div>
      {/* <button
        onClick={(e) => addProductCartHandler(e, product.id)}
        type="button"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        В корзину
      </button> */}
      {user.status === 'success' && user?.user?.Role?.id === 1 ? (
        <button
          type="button"
          className={`my-button ${
            isDarkMode ? 'button-dark' : 'button-white'
          } font-bold py-2 px-4 rounded-lg mt-5 mx-auto block border border-black hover:border-transparent`}
          onClick={(e) => deleteProductHandler(e, product.id)}
        >
          Удалить
        </button>
      ) : (
        false
      )}
    </div>
  );
}
