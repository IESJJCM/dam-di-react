import { Link, useLoaderData } from 'react-router';
import { useCartContext } from '../../context';
import { useDocumentTitle } from '../../hooks';
import type { guitarLoader } from '../../loaders';

export const GuitarDetail = () => {
  const guitar = useLoaderData<typeof guitarLoader>();
  const { addToCart } = useCartContext();

  useDocumentTitle(`${guitar.name} · GuitarLA`);

  return (
    <article className="flex flex-col items-center gap-8 md:flex-row md:items-start">
      <img
        className="w-2/3 object-contain md:w-1/3"
        src={`/img/${guitar.image}.jpg`}
        alt={`Guitarra ${guitar.name}`}
      />
      <div className="md:w-2/3">
        <h1 className="text-4xl font-black uppercase">{guitar.name}</h1>
        <p className="mt-4 text-lg text-gray-600">{guitar.description}</p>
        <p className="mt-4 text-4xl font-black text-blue-600">
          ${guitar.price}
        </p>
        <button
          type="button"
          className="mt-6 w-full rounded bg-gray-900 px-4 py-3 font-bold text-white uppercase transition hover:bg-gray-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 md:w-auto md:px-8"
          onClick={() => addToCart(guitar)}
        >
          Agregar al carrito
        </button>
        <p className="mt-6">
          <Link
            to="/"
            className="font-bold underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          >
            Volver al catálogo
          </Link>
        </p>
      </div>
    </article>
  );
};
