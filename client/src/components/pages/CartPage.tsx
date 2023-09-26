/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/no-redundant-roles */
import React, { useEffect, useState } from 'react';
import { useAppSelector } from '../../hooks/reduxHooks';
import useProductHooks from '../../hooks/useProductHooks';
import type { ProductType } from '../../types/productType';
import ModalMakeOrder from '../IU/ModalMakeOrder';

export default function CartPage(): JSX.Element {
  const { getProductsCartHandler, deleteProductCartHandler } = useProductHooks();
  const productsInCart = useAppSelector((state) => state.product.productsData.cartProducts);
  const [totalPrice, setTotalPrice] = useState<number | ProductType>(0);
  const [show, setShow] = useState(false)

  const openModal = ():void => {setShow(true)}
  const closeModal = ():void => {setShow(false)}

  useEffect(() => {
    setTotalPrice(
      productsInCart?.reduce(
        (acc, curProductValue) => acc + curProductValue.ProductSize.Product.price,
        0,
      ),
    );
  }, [productsInCart]);

  useEffect(() => {
    getProductsCartHandler();
  }, []);
  console.log(productsInCart);

  return (
    <div className="mt-8 container mx-auto px-10">
      <div className="flow-root">
        <h1 className="flex justify-center items-center font-bold	text-3xl">Корзина:</h1>
        <ModalMakeOrder show={show} closeModal={closeModal} />
        <ul role="list" className="-my-6 divide-y divide-gray-200">
          {productsInCart?.map((product) => (
            <li key={product.id} className="flex py-6">
              <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                <img
                  src={`http://localhost:3001/images/${product.ProductSize.Product.Images[0]?.url}`}
                  alt=""
                  className="h-full w-full object-cover object-center"
                />
              </div>

              <div className="ml-4 flex flex-1 flex-col">
                <div>
                  <div className="flex justify-between text-base font-medium text-gray-900 text-xl">
                    <h3>
                      <a href="#">{product.ProductSize.Product.title}</a>
                    </h3>
                    <p className="ml-4">Цена: {product.ProductSize.Product.price} руб.</p>
                  </div>
                  <p className="mt-1 text-sm text-gray-500">
                    Цвет: {product.ProductSize?.Product.Color.title}
                  </p>
                </div>
                <div className="flex flex-1 items-end justify-between text-sm">
                  <p className="text-gray-500">Размер: {product.ProductSize.Size.title}</p>

                  <div className="flex">
                    <button
                      type="button"
                      className="font-medium text-indigo-600 hover:text-indigo-500"
                      onClick={(e) => {
                        console.log(product.id);
                        deleteProductCartHandler(e, product.id);
                      }}
                    >
                      Убрать из корзины
                    </button>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
        <div className="flex justify-center items-center m-5">
          <h1 className="font-bold	text-3xl">ИТОГО: {totalPrice} руб.</h1>
        </div>
        <div className="flex justify-center items-center">
          <button
            type="button"
            onClick={() => openModal()}
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Оформить заказ
          </button>
        </div>
      </div>
    </div>
  );
}
