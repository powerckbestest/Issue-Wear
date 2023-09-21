import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useAppSelector } from '../../hooks/reduxHooks'
import OneCard from './OneCard'
import ModalAddProducts from '../IU/ModalAddProducts'

export default function MainPage(): JSX.Element {

  const [show, setShow] = useState(false);
  const [selectedNoteId, setSelectedNoteId] = useState(null);

  const handleEditClick = (noteId: number): void => {
    setSelectedNoteId(noteId);
    setShow(true);
  };

    const products = [
        {
          id: 1,
          name: 'Basic Tee',
          href: '#',
          imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
          imageAlt: "Front of men's Basic Tee in black.",
          price: '$35',
          color: 'Black',
        },
        {
          id: 2,
          name: 'Basic Tee',
          href: '#',
          imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
          imageAlt: "Front of men's Basic Tee in black.",
          price: '$35',
          color: 'Black',
        },
        {
          id: 3,
          name: 'Basic Tee',
          href: '#',
          imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
          imageAlt: "Front of men's Basic Tee in black.",
          price: '$35',
          color: 'Black',
        },
        {
          id: 4,
          name: 'Basic Tee',
          href: '#',
          imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
          imageAlt: "Front of men's Basic Tee in black.",
          price: '$35',
          color: 'Black',
        },
        
        
        
      ]

      // const product = useAppSelector((state) => state.product.productsData.products)
      
  return (
    <>
      <button 
      type='button' 
      className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
      onClick={handleEditClick}
      >
        
        Добавить товар</button>
  <div className="bg-white">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">Customers also purchased</h2>
          <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {products.map((el) => (
            <OneCard key={el.id} product={el}/>
            ))}
            </div>
        </div>
        <ModalAddProducts show={show} onHide={() => setShow(false)}/>
      </div>  
    </>
    )
}
