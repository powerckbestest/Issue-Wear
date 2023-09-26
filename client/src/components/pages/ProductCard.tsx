import React, { useEffect, useState } from 'react'
import { StarIcon } from '@heroicons/react/20/solid'
import { RadioGroup } from '@headlessui/react'
import { useParams } from 'react-router-dom'
import { useAppSelector } from '../../hooks/reduxHooks'
import useProductHooks from '../../hooks/useProductHooks'
// import '/styles/slider.css'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function ProductCard() : JSX.Element {
  const {productId} = useParams()

const [selectedSize, setSelectedSize] = useState(null);


  const products = useAppSelector((state) => state.product.productsData.currProduct)
  console.log(products)
  const {getCartProductHandler, addProductCartHandler} = useProductHooks()

  useEffect(() => {
    getCartProductHandler(Number(productId))
  }, [])


  // СЛАЙДЕР ДЛЯ ФОТО 
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % products.Images.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === 0 ? products.Images.length - 1 : prevSlide - 1
    );
  };

  return (
<div className="bg-white lg:flex mt-16"> {/* Added top margin */}
      <div className="lg:w-2/3">
        {/* Image gallery */}
        <div
          id="indicators-carousel"
          className="relative max-w-screen-xl mx-auto"
          data-carousel="static"
        >
          {/* Carousel wrapper */}
          <div className="relative h-56 overflow-hidden rounded-lg md:h-96">
            {products?.Images?.map((image, index) => (
              <div
                key={index}
                className={`${
                  index === currentSlide ? 'duration-700 ease-in-out' : 'hidden'
                }`}
                data-carousel-item={index === currentSlide ? 'active' : ''}
              >
                <img
                  src={`http://localhost:3001/images/${image?.url}`}
                  style={{ width: '40%', height: 'auto' }}
                  className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
                  alt={`Slide ${index + 1}`}
                />
              </div>
            ))}
          </div>
          {/* Slider indicators */}
          <div className="absolute z-30 flex space-x-3 -translate-x-1/2 bottom-5 left-1/2">
            {products?.Images?.map((_, index) => (
              <button
                key={index}
                type="button"
                className={`w-3 h-3 rounded-full ${
                  index === currentSlide ? 'bg-indigo-500' : 'bg-gray-300'
                }`}
                aria-current={index === currentSlide ? 'true' : 'false'}
                aria-label={`Slide ${index + 1}`}
                data-carousel-slide-to={index}
              />
            ))}
          </div>
          {/* Slider controls */}
          <button
            type="button"
            className="absolute top-0 left-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
            data-carousel-prev
            onClick={prevSlide}
          >
            <img src="/icons8-стрелка-влево-в-круге-2-100.png" alt="стрелка влево" />
            {/* Previous button */}
          </button>
          <button
            type="button"
            className="absolute top-0 right-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
            data-carousel-next
            onClick={nextSlide}
          >
            <img src="/icons8-стрелка-вправо-в-круге-2-50.png" alt="стрелка вправо" />
            {/* Next button */}
          </button>

          
          
        </div>
        

                {/* Description and details */}
                
    <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
    <div>
      <h3 className="sr-only">Description</h3>
      <div className="space-y-6">
        <p className="text-base text-gray-900">{products.description}</p>
      </div>
    </div>
  </div>
        
      </div>
      

      <div className="lg:w-1/3 p-8">
        {/* Product info */}
        <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
          {products.title}
        </h1>

        {/* Price */}
        <p className="text-3xl tracking-tight text-gray-900">{products.price}₽</p>

        <form className="mt-10">
          {/* Sizes */}
          <div className="mt-10">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium text-gray-900">Size</h3>
              <a
                href="#"
                className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
              >
                Size guide
              </a>
            </div>
            <RadioGroup
              value={selectedSize}
              onChange={setSelectedSize}
              className="mt-4"
            >
              <RadioGroup.Label className="sr-only">Choose a size</RadioGroup.Label>
              <div className="grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-4">
                {products?.ProductSizes?.map((size) => (
                  <RadioGroup.Option
                    key={size.Size.id}
                    value={size.Size.id}
                    className={({ active }) =>
                      classNames(
                        true
                          ? 'cursor-pointer bg-white text-gray-900 shadow-sm'
                          : 'cursor-not-allowed bg-gray-50 text-gray-200',
                        active ? 'ring-2 ring-indigo-500' : '',
                        'group relative flex items-center justify-center rounded-md border py-3 px-4 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 sm:py-6'
                      )
                    }
                  >
                    {({ active, checked }) => (
                      <>
                        <RadioGroup.Label as="span">
                          {size.Size.title}
                        </RadioGroup.Label>
                        {true ? (
                          <span
                            className={classNames(
                              active ? 'border' : 'border-2',
                              checked ? 'border-indigo-500' : 'border-transparent',
                              'pointer-events-none absolute -inset-px rounded-md'
                            )}
                            aria-hidden="true"
                          />
                        ) : (
                          <span
                            aria-hidden="true"
                            className="pointer-events-none absolute -inset-px rounded-md border-2 border-gray-200"
                          >
                            <svg
                              className="absolute inset-0 h-full w-full stroke-2 text-gray-200"
                              viewBox="0 0 100 100"
                              preserveAspectRatio="none"
                              stroke="currentColor"
                            >
                              <line
                                x1={0}
                                y1={100}
                                x2={100}
                                y2={0}
                                vectorEffect="non-scaling-stroke"
                              />
                            </svg>
                          </span>
                        )}
                      </>
                    )}
                  </RadioGroup.Option>
                ))}
              </div>
            </RadioGroup>
          </div>

          <button
            type="button"
            onClick={(e) =>
              addProductCartHandler(
                e,
                products.ProductSizes.find((el) => el.Size.id === selectedSize).id
              )
            }
            className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Добавить в корзину
          </button>
        </form>
      </div>

      

  
    </div>

    
    
  );

}



