import { useState } from 'react';
import { Guitar } from '../../components';
import { useCartContext } from '../../context';
import { db } from '../../data/db';
import { useDocumentTitle } from '../../hooks';

export const Home = () => {
  const [guitars] = useState(db);
  const { addToCart } = useCartContext();

  useDocumentTitle(`GuitarLA · ${guitars.length} guitarras`);

  return (
    <>
      <h1 className="text-center text-4xl font-black">Nuestra Colección</h1>

      <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {
          /** Guitars */
          guitars.map((guitar) => (
            <Guitar key={guitar.id} guitar={guitar} onAddToCart={addToCart} />
          ))
        }
      </div>
    </>
  );
};
