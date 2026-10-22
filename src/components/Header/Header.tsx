import { useState, useEffect } from 'react';
import type { CartItem } from '../../types';
import { Cart } from '../Cart';

type HeaderProps = {
  cart: CartItem[];
  onIncrease: (id: CartItem['id']) => void;
  onDecrease: (id: CartItem['id']) => void;
  onRemove: (id: CartItem['id']) => void;
  onClear: () => void;
};

export const Header = ({
  cart,
  onIncrease,
  onDecrease,
  onRemove,
  onClear,
}: HeaderProps) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

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
            className="relative w-8 cursor-pointer transition hover:scale-110 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
            aria-label="Abrir carrito"
            aria-expanded={isCartOpen}
            aria-controls="cart"
            onClick={() => setIsCartOpen(!isCartOpen)}
          >
            <img className="w-full" src="/img/carrito.png" alt="" />
            {
              /** Show count cart if exist */
              itemCount > 0 && (
                <span
                  className="absolute -top-2 -right-2 flex size-5 items-center justify-center rounded-full bg-blue-600 text-xs font-bold text-white"
                  aria-hidden="true"
                >
                  {itemCount}
                </span>
              )
            }
          </button>
          <p className="sr-only" aria-live="polite">
            {itemCount} artículos en el carrito
          </p>
        </nav>
      </div>

      {isCartOpen && (
        <>
          <div
            className="fixed inset-0 z-20 bg-black/70"
            onClick={() => setIsCartOpen(false)}
          ></div>
          <Cart
            cart={cart}
            onClose={() => setIsCartOpen(false)}
            onIncrease={onIncrease}
            onDecrease={onDecrease}
            onRemove={onRemove}
            onClear={onClear}
          />
        </>
      )}
    </header>
  );
};
