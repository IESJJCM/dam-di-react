import { useEffect, useState } from 'react';
import { Footer, Guitar, Header } from './components';

import { db } from './data/db';
import { useCart } from './hooks';

const App = () => {
  const [guitars] = useState(db);
  const { cart, addToCart } = useCart();

  useEffect(() => {
    document.title = `GuitarLA · ${guitars.length} guitarras`;
  }, [guitars]);

  return (
    <>
      <Header cart={cart} />

      <main className="mx-auto mt-10 max-w-6xl px-4">
        <h2 className="text-center text-4xl font-black">Nuestra Colección</h2>

        <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {
            /** Guitars */
            guitars.map((guitar) => (
              <Guitar key={guitar.id} guitar={guitar} onAddToCart={addToCart} />
            ))
          }
        </div>
      </main>

      <Footer />
    </>
  );
};

export default App;
