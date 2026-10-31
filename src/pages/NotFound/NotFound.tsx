import { Link } from 'react-router';
import { useDocumentTitle } from '../../hooks';

type NotFoundProps = {
  message?: string;
};

export const NotFound = ({
  message = 'La dirección que has escrito no existe en GuitarLA.',
}: NotFoundProps) => {
  useDocumentTitle('Página no encontrada · GuitarLA');

  return (
    <div className="text-center">
      <h1 className="text-4xl font-black">Página no encontrada</h1>
      <p className="mt-6 text-gray-600">{message}</p>
      <Link
        to="/"
        className="mt-6 inline-block rounded bg-gray-900 px-6 py-3 font-bold text-white uppercase transition hover:bg-gray-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
      >
        Volver al catálogo
      </Link>
    </div>
  );
};
