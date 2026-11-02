import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { renderApp } from '../../test';

const image = new File(['x'], 'foto.jpg', { type: 'image/jpeg' });

// Submitting the form (validation messages, focus and the redirect to the new
// guitar) cannot run under jsdom, whose FormData the Node Request does not
// read; the e2e tests cover it.
describe('NewGuitar', () => {
  it('previews the chosen image', async () => {
    const user = userEvent.setup();
    renderApp('/guitars/new');

    await user.upload(await screen.findByLabelText('Imagen'), image);

    expect(
      screen.getByRole('img', { name: 'Vista previa de la imagen elegida' })
    ).toBeInTheDocument();
  });
});
