import { useDocumentTitle } from '../../hooks';

export const NewGuitar = () => {
  useDocumentTitle('Nueva guitarra · GuitarLA');

  return (
    <>
      <h1 className="text-center text-4xl font-black">Nueva guitarra</h1>
      <p className="mt-6 text-center text-gray-600">
        El formulario de alta llegará en la página siguiente.
      </p>
    </>
  );
};
