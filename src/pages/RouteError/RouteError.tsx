import { isRouteErrorResponse, Link, useRouteError } from 'react-router';
import { useDocumentTitle } from '../../hooks';

export const RouteError = () => {
  const error = useRouteError();
  useDocumentTitle('Algo ha fallado · GuitarLA');

  const message = isRouteErrorResponse(error)
    ? `${error.status} ${error.statusText}`
    : error instanceof Error
      ? error.message
      : 'Error desconocido';

  return (
    <div className="text-center">
      <h1 className="text-4xl font-black">Algo ha fallado</h1>
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
