import type { Guitar, NewGuitar } from '../../../types';

/**
 * Fake catalogue for the tests and Storybook: three guitars, no network.
 *
 * It only imports types: Storybook pastes this file in place of the real
 * module, so a relative import of a value would be resolved from there.
 */
export const guitars: Guitar[] = [
  {
    id: 1,
    name: 'Lukather',
    image: 'img/guitarra_01.jpg',
    description: 'Una guitarra de prueba',
    price: 299,
  },
  {
    id: 2,
    name: 'SRV',
    image: 'img/guitarra_02.jpg',
    description: 'Otra guitarra de prueba',
    price: 349,
  },
  {
    id: 3,
    name: 'Borland',
    image: 'img/guitarra_03.jpg',
    description: 'Una tercera guitarra de prueba',
    price: 329,
  },
];

const created: Guitar[] = [];

export const getGuitars = async (): Promise<Guitar[]> => [
  ...guitars,
  ...created,
];

export const getGuitar = async (id: number): Promise<Guitar | null> =>
  [...guitars, ...created].find((guitar) => guitar.id === id) ?? null;

export const createGuitar = async (input: NewGuitar): Promise<Guitar> => {
  const guitar: Guitar = {
    id: guitars.length + created.length + 1,
    name: input.name,
    description: input.description,
    price: input.price,
    image: '/img/guitarra_04.jpg',
  };
  created.push(guitar);
  return guitar;
};
