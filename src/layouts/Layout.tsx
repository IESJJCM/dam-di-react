import { Outlet } from 'react-router';

import { Footer, Header } from '../components';
import { CartProvider } from '../context';

export const Layout = () => {
  return (
    <CartProvider>
      <Header />
      <main className="mx-auto mt-10 max-w-6xl px-4">
        <Outlet />
      </main>
      <Footer />
    </CartProvider>
  );
};
