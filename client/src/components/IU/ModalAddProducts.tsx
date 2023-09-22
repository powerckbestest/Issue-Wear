import React, { Fragment, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import useProductHooks from '../../hooks/useProductHooks';

export default function ModalAddProducts({ show, onHide }: { show: boolean; onHide: () => void }): JSX.Element {
  const [open, setOpen] = useState(true)

  const {addProductHandler} = useProductHooks()

  const cancelButtonRef = useRef(null)

  // State для полей ввода
  const [productName, setProductName] = useState('')
  const [productPrice, setProductPrice] = useState('')
  const [productColor, setProductColor] = useState('')
  const [productDescription, setProductDescription] = useState('')
  const [productCategory, setProductCategory] = useState('')

  // Обработчики изменения значений полей ввода
  const handleProductNameChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setProductName(event.target.value)
  }

  const handleProductPriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setProductPrice(event.target.value)
  }

  const handleProductColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setProductColor(event.target.value)
  }

  const handleProductDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setProductDescription(event.target.value)
  }

  const handleProductCategoryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setProductCategory(event.target.value)
  }


  return (
    <form onSubmit={addProductHandler}>
      <Transition.Root show={show} as={Fragment}>
        <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setOpen}>
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
                        <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                          Добавление нового товара
                        </Dialog.Title>

                        {/* Инпут для названия товара */}
                        <div className="mt-2">
                          <label htmlFor="product-name" className="block text-sm font-medium text-gray-700">
                            Название товара
                          </label>
                          <input
                            type="text"
                            id="product-name"
                            name="product-name"
                            value={productName}
                            onChange={handleProductNameChange}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                          />
                        </div>

                        {/* Инпут для цены товара */}
                        <div className="mt-2">
                          <label htmlFor="product-price" className="block text-sm font-medium text-gray-700">
                            Цена товара
                          </label>
                          <input
                            type="text"
                            id="product-price"
                            name="product-price"
                            value={productPrice}
                            onChange={handleProductPriceChange}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                          />
                        </div>

                        {/* Инпут для цвета товара */}
                        <div className="mt-2">
                          <label htmlFor="product-color" className="block text-sm font-medium text-gray-700">
                            Цвет товара
                          </label>
                          <input
                            type="text"
                            id="product-color"
                            name="product-color"
                            value={productColor}
                            onChange={handleProductColorChange}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                          />
                        </div>

                        {/* Инпут для описания товара */}
                        <div className="mt-2">
                          <label htmlFor="product-description" className="block text-sm font-medium text-gray-700">
                            Описание товара
                          </label>
                          <input
                            type="text"
                            id="product-description"
                            name="product-description"
                            value={productDescription}
                            onChange={handleProductDescriptionChange}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                          />
                        </div>

                        {/* Инпут для категории товара */}
                        <div className="mt-2">
                          <label htmlFor="product-category" className="block text-sm font-medium text-gray-700">
                            Категория товара
                          </label>
                          <input
                            type="text"
                            id="product-category"
                            name="product-category"
                            value={productCategory}
                            onChange={handleProductCategoryChange}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
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
                      type="button"
                      className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                      ref={cancelButtonRef}
                      onClick={
                        addProductHandler}
                    >
                      Сохранить
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </form>
  )
}
