import { isRouteErrorResponse, Link, useRouteError } from 'react-router';
import { useDocumentTitle } from '../../hooks';
import { NotFound } from '../NotFound';

const describeError = (error: unknown) => {
  if (isRouteErrorResponse(error)) {
    return typeof error.data === 'string'
      ? error.data
      : `${error.status} ${error.statusText}`;
  }
  return error instanceof Error ? error.message : 'Error desconocido';
};

const ErrorPage = ({ message }: { message: string }) => {
  useDocumentTitle('Algo ha fallado · GuitarLA');

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

export const RouteError = () => {
  const error = useRouteError();
  const isNotFound = isRouteErrorResponse(error) && error.status === 404;

  if (isNotFound) return <NotFound message={describeError(error)} />;

  return <ErrorPage message={describeError(error)} />;
};
