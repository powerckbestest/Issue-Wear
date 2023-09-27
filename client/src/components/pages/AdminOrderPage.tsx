import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import useProductHooks from '../../hooks/useProductHooks';
import { getStatusesService } from '../../services/productService';

export default function AdminOrderPage(): JSX.Element {
  const orders = useAppSelector((state) => state.order);
  const { getOrdersHandler, changeOrderStatusHandler } = useProductHooks();
  const [statuses, setStatuses] = useState([]);
  const [input, setInput] = useState(1)

  const [show, setShow] = useState(false);

  console.log(orders);

  useEffect(() => {
    getOrdersHandler();
    getStatusesService()
      .then((data) => setStatuses(data))
      .catch((err) => console.log(err));
  }, []);

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
                      <p>Имя клиента: {order?.User?.name}</p>
                      <p>Адрес клиента: {order?.address}</p>
                      <p>Телефон клиента: {order?.phone}</p>
                      <p>Статус заказа: {order?.Status?.title}</p>
                    </h3>
                    <p className="ml-4">
                      Общая стоимость заказа:{' '}
                      {order?.OrderLists.reduce(
                        (acc, el) => acc + el?.ProductSize?.Product?.price,
                        0,
                      )}{' '}
                      руб.
                    </p>
                    <p className="ml-4">Номер заказа: {order?.id}</p>
                  </div>
                </div>
                <div className="flex flex-1 items-end justify-between text-sm">
                  <div className="flex mt-5">
                    {show ? (
                      <form
                        onSubmit={(e) => {
                          changeOrderStatusHandler
                          (order.id, input);
                          setShow((prev) => !prev);
                        }}
                      >
                        <select
                          id="countries"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-50 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            onChange={(e) => setInput(e.currentTarget.value)}
                        >
                          <option selected value="all">
                            Статус
                          </option>
                          {statuses?.map((el) => (
                            <option value={el.id} key={el.id}>
                              {' '}
                              {el.title}
                            </option>
                          ))}
                        </select>
                        <button
                          type="submit"
                          className="font-medium text-indigo-600 hover:text-indigo-500"
                        >
                          Сохранить
                        </button>
                      </form>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setShow((prev) => !prev)}
                        className="font-medium text-indigo-600 hover:text-indigo-500"
                      >
                        Изменить статус заказа
                      </button>
                    )}
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
