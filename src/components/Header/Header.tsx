import { useState, useEffect } from 'react';
import { Cart } from '../Cart';

export const Header = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    if (!isCartOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      e.key === 'Escape' && setIsCartOpen(false);
    };

    document.addEventListener('keydown', handleKeyDown);
    document.body.classList.add('overflow-hidden');

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.classList.remove('overflow-hidden');
    };
  }, [isCartOpen]);

  return (
    <header className="relative bg-[url(/img/header.jpg)] bg-cover bg-center py-10">
      <div className="absolute inset-0 bg-black/70"></div>

      <div className="relative mx-auto flex max-w-6xl flex-col items-center gap-8 px-4 md:flex-row md:items-start md:justify-between">
        <a href="/" className="w-2/3 md:w-1/4">
          <img
            className="w-full"
            src="/img/logo.svg"
            alt="Logotipo de GuitarLA"
          />
        </a>

        <nav className="flex justify-end md:mt-10 md:w-1/2">
          <button
            type="button"
            className="w-8 cursor-pointer transition hover:scale-110 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
            aria-label="Abrir carrito"
            aria-expanded={isCartOpen}
            aria-controls="cart"
            onClick={() => setIsCartOpen(!isCartOpen)}
          >
            <img className="w-full" src="/img/carrito.png" alt="" />
          </button>
        </nav>
      </div>

      {isCartOpen && (
        <>
          <div
            className="fixed inset-0 z-20 bg-black/70"
            onClick={() => setIsCartOpen(false)}
          ></div>
          <Cart />
        </>
      )}
    </header>
  );
};
