export const Guitar = () => {
  return (
    <article className="flex items-center gap-4">
      <img
        className="w-1/3 object-contain"
        src="/img/guitarra_01.jpg"
        alt="Guitarra Lukather"
      />
      <div className="w-2/3">
        <h3 className="text-2xl font-bold text-black uppercase">Lukather</h3>
        <p className="mt-2 text-gray-600">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sit quae
          labore odit magnam in autem nesciunt, amet deserunt.
        </p>
        <p className="mt-2 text-3xl font-black text-blue-600">$299</p>
        <button
          type="button"
          className="mt-3 w-full rounded bg-gray-900 px-4 py-2 font-bold text-white uppercase transition hover:bg-gray-700"
        >
          Agregar al carrito
        </button>
      </div>
    </article>
  );
};
