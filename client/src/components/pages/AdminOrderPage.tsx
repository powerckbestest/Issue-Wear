import React, { useEffect, useState } from 'react';
import { useAppSelector } from '../../hooks/reduxHooks';

export default function AdminOrderPage(): JSX.Element {
    const orders = useAppSelector((state) => state.order)

    const [totalPrice, setTotalPrice] = useState(0)

    console.log(orders)

    // useEffect(() => {
    //     setTotalPrice(orders.response.OrderLists?.reduce((acc, currEl) => acc + currEl.ProductSize.Product.price, 0))
    // }, [])
  return (
    <div className="mt-8 container mx-auto px-10">
      <div className="flow-root">
        <h1 className="flex justify-center items-center font-bold mb-5	text-3xl">Заказы:</h1>
        <ul role="list" className="-my-6 divide-y divide-gray-200">
          {orders?.map((order) => (
            <li key={order.id} className="flex py-6">
              <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                <img
                  src="https://avtogear-spb.ru/upload/iblock/a1d/a1dd08fd239cef4dc1be8dbc1889cb58.png"
                  alt=""
                  className="h-full w-full object-cover object-center"
                />
              </div>

              <div className="ml-4 flex flex-1 flex-col">
                <div>
                  <div className="flex justify-between text-base font-medium text-gray-900 text-xl">
                    <h3>
                      <p>Имя клиента: {order.response.User.name}</p>
                      <p>Адрес клиента: {order.response.address}</p>
                      <p>Телефон клиента: {order.response.phone}</p>
                    </h3>
                    <p className="ml-4">Общая стоимость заказа: {totalPrice} руб.</p>
                  </div>
                </div>
                <div className="flex flex-1 items-end justify-between text-sm">
                  <div className="flex mt-5">
                    <button
                      type="button"
                      className="font-medium text-indigo-600 hover:text-indigo-500"
                    >
                      Изменить статус заказа
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
