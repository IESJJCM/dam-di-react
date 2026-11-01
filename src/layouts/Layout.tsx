import { Outlet, useNavigation } from 'react-router';

import { Footer, Header, Loading } from '../components';
import { CartProvider } from '../context';

export const Layout = () => {
  const navigation = useNavigation();
  const isLoading = navigation.state === 'loading';

  return (
    <CartProvider>
      <Header />
      <main className="mx-auto mt-10 max-w-6xl px-4" aria-busy={isLoading}>
        {isLoading && <Loading />}
        <div className={isLoading ? 'opacity-50 transition-opacity' : ''}>
          <Outlet />
        </div>
      </main>
      <Footer />
    </CartProvider>
  );
};
