import React, { useEffect } from 'react'
import { useAppSelector } from '../../hooks/reduxHooks'
import useProductHooks from '../../hooks/useProductHooks'

export default function MyOrdersPage(): JSX.Element {
    const orders = useAppSelector((state) => state.order)

    const {getOrdersHandler, cancelOrderHandler} = useProductHooks()

    useEffect(() => {
        getOrdersHandler()
    }, [])
    console.log(orders)
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
                    <p>Указанный адрес: {order?.address}</p>
                    <p>Указанный телефон: {order?.phone}</p>
                    <p>Статус: {order?.Status?.title}</p>
                    <p style={{fontSize: '14px'}}>Примечание: вы можете отменить заказ, если его статус: "Оформлено"</p>
                  </h3>
                  <p className="ml-4">
                    Общая стоимость заказа:{' '}
                    {order?.OrderLists?.reduce(
                      (acc, el) => acc + el?.ProductSize?.Product?.price,
                      0,
                    )}{' '}
                    руб.
                  </p>
                  <p className="ml-4">Номер заказа: №000{order?.id}</p>
                </div>
              </div>
              <div style={{display: 'flex', justifyContent: 'end'}}>
                        {order?.Status?.title === 'оформлено'? ( <button
                        
                        type="button" 
                        onClick={() => cancelOrderHandler(order.id)}
                        className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      >
                        Отменить заказ
                      </button>): <></>}
              </div>
            </div>
            
          </li>
        ))}
      </ul>
    </div>
  </div>
  )
}
