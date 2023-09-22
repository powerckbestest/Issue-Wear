import React from 'react';

type LoaderProps = {
  children: React.ReactElement;
  isLoading: boolean;
};

export default function Loader({ children, isLoading }: LoaderProps): JSX.Element {
  if (isLoading)
    return (
      <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50">
        <div className="pulsating-image">
          <img
            className="h-8 w-auto animate-pulse"
            src="../../../public/fire.jpg"
            alt="Your Company"
            style={{ width: '400px', height: '300px' }}
          />
        </div>
      </div>
    );
  return children;
}
