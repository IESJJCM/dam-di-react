import { data, type LoaderFunctionArgs } from 'react-router';
import { db } from '../../data/db';
import type { Guitar } from '../../types';

/**
 * Finds the guitar whose id is in the URL (`/guitars/:id`).
 *
 * @throws A 404 response when there is no guitar with that id, so the
 * route shows the not found page.
 */
export const guitarLoader = ({ params }: LoaderFunctionArgs): Guitar => {
  const guitar = db.find((item) => item.id === Number(params.id));

  if (!guitar) {
    throw data(`No existe ninguna guitarra con el id ${params.id}.`, {
      status: 404,
    });
  }

  return guitar;
};
