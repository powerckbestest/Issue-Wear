/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/no-redundant-roles */
import React, { useEffect } from 'react';
import { useAppSelector } from '../../hooks/reduxHooks';
import useProductHooks from '../../hooks/useProductHooks';

export default function CartPage(): JSX.Element {
  const { getProductsCartHandler, deleteProductCartHandler } = useProductHooks();
  const productsInCart = useAppSelector((state) => state.product.productsData.cartProducts);

  useEffect(() => {
    getProductsCartHandler();
  }, []);
  
  return (
    <div className="mt-8">
      <div className="flow-root">
        <h1>Shopping cart</h1>
        <ul role="list" className="-my-6 divide-y divide-gray-200">
          {productsInCart?.map((product) => (
            <li key={product.id} className="flex py-6">
              <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                <img src="" alt="" className="h-full w-full object-cover object-center" />
              </div>

              <div className="ml-4 flex flex-1 flex-col">
                <div>
                  <div className="flex justify-between text-base font-medium text-gray-900">
                    <h3>
                      <a href="#">{product?.title}</a>
                    </h3>
                    <p className="ml-4">{product?.price}</p>
                  </div>
                  <p className="mt-1 text-sm text-gray-500">{product?.Color?.title}</p>
                </div>
                <div className="flex flex-1 items-end justify-between text-sm">
                  <p className="text-gray-500">Qty </p>

                  <div className="flex">
                    <button
                      type="button"
                      className="font-medium text-indigo-600 hover:text-indigo-500"
                      onClick={(e) => deleteProductCartHandler(e, product.id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
