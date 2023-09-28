import React, { useState } from 'react';

function Accordion({ order }): JSX.Element {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`accordion ${isOpen ? 'open' : ''}`}>
      <button
        style={{ textAlign: 'center' }}
        type="button"
        className="accordion-toggle"
        onClick={toggle}
      >
        {isOpen ? '⬆️ Скрыть детали заказа ⬆️' : '⬇️ Подробнее о заказе ⬇️'}
      </button>
      <div className="accordion-content">
        {isOpen && (
          <ul>
            {order.OrderLists?.map((el) => (
              <li key={el.id} className="flex py-6">
                <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                  <img
                    src={`http://localhost:3001/images/${el.ProductSize.Product.Images[0].url}`}
                    alt="img"
                    className="h-full w-full object-cover object-center"
                  />
                </div>
                <div style={{ marginLeft: '20px' }}>
                  <p>Название: {el.ProductSize.Product.title}</p>
                  <p>Цвет: {el.ProductSize.Product.Color.title}</p>
                  <p>Категория: {el.ProductSize.Product.Category.title}</p>
                  <p>Цена: {el.ProductSize.Product.price} ₽</p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Accordion;
