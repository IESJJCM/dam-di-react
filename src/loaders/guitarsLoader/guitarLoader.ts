import { data, type LoaderFunctionArgs } from 'react-router';
import { getGuitar } from '../../api';

/**
 * Loads the guitar whose id is in the URL (`/guitars/:id`).
 *
 * @throws A 404 response when there is no guitar with that id, so the
 * route shows the not found page.
 */
export const guitarLoader = async ({ params }: LoaderFunctionArgs) => {
  const guitar = await getGuitar(Number(params.id));

  if (!guitar) {
    throw data(`No existe ninguna guitarra con el id ${params.id}.`, {
      status: 404,
    });
  }

  return guitar;
};
