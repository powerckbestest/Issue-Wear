import React, { Fragment, useEffect, useRef, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import axios from 'axios';
import useProductHooks from '../../hooks/useProductHooks';
import { getCategories, getColorService, getSizes } from '../../services/modalService';

export default function ModalAddProducts({
  show,
  onHide,
}: {
  show: boolean;
  onHide: () => void;
}): JSX.Element {
  const [open, setOpen] = useState(true);

  const [colors, setColors] = useState([]);
  const [categories, setCategory] = useState([]);
  const [sizes, setSize] = useState([]);
  const [images, setImages] = useState([]);
  const [imageWardrobe, setImageWardrobe] = useState([]);

  const changeImg = (e) => {
    setImages((prev) => [e.target.files[0], ...prev]);
  };
  const deleteImg = (index) => {
    setImages((prev) => prev.filter((el, i) => index !== i));
  };

  const changeImgWardrobe = (e) => {
    setImageWardrobe((prev) => [e.target.files[0], ...prev]);
  };
  const deleteImgWardrobe = (index) => {
    setImageWardrobe((prev) => prev.filter((el, i) => index !== i));
  };
  useEffect(() => {
    getColorService()
      .then((data) => setColors(data))
      .catch((err) => console.log(err));
    getCategories()
      .then((data) => setCategory(data))
      .catch((err) => console.log(err));
    getSizes()
      .then((data) => setSize(data))
      .catch((err) => console.log(err));
  }, []);

  const imageInputRef = useRef(null);
const wardrobeInputRef = useRef(null);


  const { addProductHandler } = useProductHooks();

  return (
    <Transition.Root show={show} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setOpen}>
        <form onSubmit={(e) => addProductHandler(e, images, imageWardrobe)}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                  <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start">
                      <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                        <Dialog.Title
                          as="h3"
                          className="text-base font-semibold leading-6 text-gray-900"
                        >
                          Добавление нового товара
                        </Dialog.Title>

                        {/* Инпут для названия товара */}
                        <div className="mt-2">
                          Название товара
                          <input
                            type="text"
                            name="title"
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                          />
                        </div>

                        {/* Инпут для цены товара */}
                        <div className="mt-2">
                          Цена товара
                          <input
                            type="text"
                            name="price"
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                          />
                        </div>

                        {/* Инпут для цвета товара */}
                        <div className="mt-2">
                          Цвет товара
                          <select
                            name="colorId"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          >
                            <option value="">Выберите цвет</option>
                            {colors.map((color) => (
                              <option key={color.id} value={color.id}>
                                {color.title}
                              </option>
                            ))}
                          </select>
                        </div>

                        {/* Инпут для описания товара */}
                        <div className="mt-2">
                          {' '}
                          Описание
                          <textarea
                            type="text"
                            name="description"
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                          />
                        </div>

                        {/* Инпут для категории товара */}
                        <div className="mt-2">
                          Категория товара
                          <select
                            name="categoryId"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          >
                            <option value="">Выбери категорию</option>
                            {categories.map((category) => (
                              <option key={category.id} value={category.id}>
                                {category.title}
                              </option>
                            ))}
                          </select>
                        </div>

                        {/* Инпут для размеров товара */}
                        <div className="mt-2">
                          <input
                            placeholder="Количество товара"
                            type="text"
                            name="size"
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                          />
                        </div>

                        <div>
                          Изображение товара для карточки
                          <input 
                          name="file" 
                          type="file" 
                          multiple 
                          onChange={changeImg} 
                          
                          />
                          {images
                            ? images?.map((el, index) => (
                                <div className="col" key={index}>
                                  <div className="card">
                                    <img
                                      src={URL.createObjectURL(el)}
                                      className="card-img-top"
                                      alt="..."
                                    />
                                    <div className="card-body">
                                      <button
                                        onClick={() => deleteImg(index)}
                                        type="button"
                                        className="btn btn-primary"
                                      >
                                        delete
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              ))
                            : false}
                        </div>

                        <br />
                        <div>
                          {' '}
                          Изображение для гардероба
                          <input
                            type="file"
                            name="cover"
                            multiple
                            onChange={changeImgWardrobe}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    <button
                      type="button"
                      className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                      onClick={() => onHide()}
                    >
                      Отменить
                    </button>

                    <button
                      type="submit"
                      className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                      onClick={() => {
                        console.log('Button clicked');
                        onHide() 
                        
                
                      }}
                    >
                      Сохранить
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </form>
      </Dialog>
    </Transition.Root>
  );
}
