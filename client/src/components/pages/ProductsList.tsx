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
  const isDarkMode = 'true';

  // console.log(product)
  return (
    <>
      {}
      <div className="flex items-center justify-center mt-5">
        <button
          type="button"
          className={`my-button ${
            isDarkMode ? 'button-dark' : 'button-white'
          } font-bold py-2 px-4 rounded-lg mt-5 mx-auto block border border-black hover:border-transparent`}
          onClick={handleEditClick}
        >
          Добавить товар
        </button>
      </div>
      <div className="bg-grey">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <h2
            className={`${
              isDarkMode ? 'text-dark' : 'text-white'
            } text-5xl font-bold tracking-tight text-center mb-20`}
          >
            Одежда:
          </h2>
          <div style={{ display: 'flex' }}>
            <select
              id="countries"
              className={`my-button ${isDarkMode ? 'button-dark' : 'button-white'}   
              
               font-boilb py-2 px-4 rounded block border border-black hover:border-transparent text-sm rounded-lg focus:ring-white-500 focus:border-blue-500 block w-50 p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500`}
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
                Choose a color
              </option>
              {color.map((el) => (
                <option value={el.id}>{el.title}</option>
              ))}
            </select>
            <select
              id="countries"
              className={`my-button ${isDarkMode ? 'button-dark' : 'button-white'}   
              
              font-boilb py-2 ml-2 px-4 rounded block border border-black hover:border-transparent text-sm rounded-lg focus:ring-white-500 focus:border-blue-500 block w-50 p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500`}
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
                Choose a category
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
