import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useAppSelector } from '../../hooks/reduxHooks';
import OneCard from './OneCard';
import ModalAddProducts from '../IU/ModalAddProducts';
import ModalEditProducts from '../IU/ModalEditProducts';
import useProductHooks from '../../hooks/useProductHooks';
import type { ProductType } from '../../types/productType';
import { getCategories, getColorService, getSizes } from '../../services/modalService';

export default function MainPage(): JSX.Element {
  const [show, setShow] = useState(false);
  const [editProduct, setEditProduct] = useState<ProductType | null>(null);
  const { getProductsHandler } = useProductHooks();

  const user = useAppSelector((state) => state.user);
  console.log(user);
  const handleEditClick = (): void => {
    setShow(true);
  };
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
    setFiltred(product);
  }, [product.length]);

  console.log(filtred.filter((el) => el.categoryId === 1));

  // console.log(product)
  return (
    <>
      {user.user.Role.id === 1 ? (
        <div className="flex items-center justify-center mt-5">
          <button
            type="button"
            className="mt-3 w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
            onClick={handleEditClick}
          >
            Добавить товар
          </button>
          <NavLink to={'/adminorders'}>
            Заказы клиентов
          </NavLink>
        </div>
      ) : (
        <></>
      )}

      <div className="bg-white">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <h2 className="text-4xl font-bold tracking-tight text-gray-900 text-center">Одежда:</h2>
          <div style={{ display: 'flex' }}>
            <select
              id="countries"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-50 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              onChange={(e) => {
                if (e.target.value !== 'all') {
                  setFilter((prev) => ({ ...prev, color: Number(e.target.value) }));
                  console.log(filter);
                  setFiltred(
                    product.filter(
                      (el) =>
                        el.colorId === Number(e.target.value) &&
                        (el.categoryId === filter.category || filter.category === 0),
                    ),
                  );
                } else setFiltred(product);
              }}
            >
              <option selected value="all">
                Цвет
              </option>
              {color.map((el) => (
                <option value={el.id}>{el.title}</option>
              ))}
            </select>
            <select
              id="countries"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-50 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              onChange={(e) => {
                if (e.target.value !== 'all') {
                  setFilter((prev) => ({ ...prev, category: Number(e.target.value) }));
                  console.log(filter);

                  setFiltred(
                    product.filter(
                      (el) =>
                        el.categoryId === Number(e.target.value) &&
                        (el.colorId === filter.color || filter.color === 0),
                    ),
                  );
                } else setFiltred(product);
              }}
            >
              <option selected value="all">
                Категория
              </option>
              {categories.map((el) => (
                <option value={el.id}>{el.title}</option>
              ))}
            </select>
          </div>
          <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {filtred?.map((el) => <OneCard key={el.id} product={el} />)}
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
