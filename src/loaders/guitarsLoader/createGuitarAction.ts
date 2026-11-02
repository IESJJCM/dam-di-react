import { data, redirect, type ActionFunctionArgs } from 'react-router';
import { createGuitar } from '../../api';
import { validateNewGuitar } from '../../utils';

/**
 * Receives the new guitar form (`POST /guitars/new`).
 *
 * @returns The validation errors with a 400 status, so the page can show
 * them next to each field.
 * @throws A redirect to the detail of the new guitar when it is created.
 */
export const createGuitarAction = async ({ request }: ActionFunctionArgs) => {
  const result = validateNewGuitar(await request.formData());

  if (result.errors) {
    return data({ errors: result.errors }, { status: 400 });
  }

  const guitar = await createGuitar(result.data);

  return redirect(`/guitars/${guitar.id}`);
};
