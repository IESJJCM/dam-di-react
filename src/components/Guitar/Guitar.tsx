import type { Guitar as GuitarType } from '../../types';

type GuitarProps = {
  guitar: GuitarType;
  onAddToCart: (guitar: GuitarType) => void;
};

export const Guitar = ({ guitar, onAddToCart }: GuitarProps) => {
  const { name, image, description, price } = guitar;

  return (
    <article className="flex items-center gap-4">
      <img
        className="w-1/3 object-contain"
        src={`/img/${image}.jpg`}
        alt={`Guitarra ${name}`}
      />
      <div className="w-2/3">
        <h3 className="text-2xl font-bold text-black uppercase">{name}</h3>
        <p className="mt-2 text-gray-600">{description}</p>
        <p className="mt-2 text-3xl font-black text-blue-600">${price}</p>
        <button
          type="button"
          className="mt-3 w-full rounded bg-gray-900 px-4 py-2 font-bold text-white uppercase transition hover:bg-gray-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          onClick={() => onAddToCart(guitar)}
        >
          Agregar al carrito <span className="sr-only">{name}</span>
        </button>
      </div>
    </article>
  );
};
