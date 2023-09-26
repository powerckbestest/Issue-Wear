import React from 'react';
import { NavLink } from 'react-router-dom';
import type { ProductType } from '../../types/productType';

type ProductProps = {
  product: ProductType;
};

export default function OneCard({ product }: ProductProps): JSX.Element {
  return (
    <div>
      <div key={product.id} className="group relative ">
        <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80 border border-solid border-gray-700">
          <img
            src={product.imageSrc}
            alt={product.imageAlt}
            className="h-full w-full object-cover object-center lg:h-full lg:w-full"
          />
        </div>
        <div className="mt-4 flex justify-between">
          <div>
            <h3 className="text-sm text-gray-500 ">
              <NavLink className="nav-link" to={`/products/${product.id}`}>
                <span aria-hidden="true" className="absolute inset-0" />
                {product.name}
              </NavLink>
            </h3>
            <p className="mt-1 text-sm text-gray-500">{product.color}</p>
          </div>
          <p className="text-sm font-medium text-gray-500">{product.price}</p>
        </div>
      </div>
    </div>
  );
}
