import React from 'react';

export default function ModalSizeGuide({
    show, 
    onHide,
}): JSX.Element {
  return (
    <div className={`relative z-50  ${show ? 'block' : 'hidden'}`} aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0">
          <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
            <div style={{ backgroundColor: 'red' }} className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                  <div className="mt-2">
                    <img
                      src="/Размерная сетка.jpg"
                      alt=""
                      style={{
                      padding: '10px', 
                      display: 'block', 
                      maxWidth: '100%', 
                      maxHeight: '100%',
                      boxShadow: '0px 10px 50px  black',
                    
                    }}
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
                Закрыть
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
