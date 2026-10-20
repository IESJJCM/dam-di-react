import type { CartItem } from '../../types';

type CartProps = {
  cart: CartItem[];
  onClose: () => void;
};

export const Cart = ({ cart, onClose }: CartProps) => {
  const isEmpty = cart.length === 0;
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <aside
      id="cart"
      aria-labelledby="cart-title"
      className="fixed inset-y-0 right-0 z-30 flex w-full max-w-md flex-col bg-white shadow-2xl"
    >
      <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
        <h2 id="cart-title" className="text-2xl font-black">
          Tu carrito
        </h2>
        <button
          type="button"
          className="size-8 rounded-full text-xl font-bold text-gray-500 transition hover:bg-gray-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          aria-label="Cerrar carrito"
          autoFocus
          onClick={onClose}
        >
          ×
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-6 py-4">
        {isEmpty ? (
          <p className="text-center text-gray-500">El carrito está vacío</p>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200 text-left">
                <th className="py-2">Imagen</th>
                <th className="py-2">Nombre</th>
                <th className="py-2">Precio</th>
                <th className="py-2">Cantidad</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item) => (
                <tr key={item.id} className="border-b border-gray-100">
                  <td className="py-3">
                    <img
                      className="w-10"
                      src={`/img/${item.image}.jpg`}
                      alt={`Guitarra ${item.name}`}
                    />
                  </td>
                  <td>{item.name}</td>
                  <td className="font-bold">${item.price}</td>
                  <td>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        className="size-6 rounded bg-gray-900 text-white"
                        aria-label={`Quitar una unidad de ${item.name}`}
                      >
                        -
                      </button>
                      {item.quantity}
                      <button
                        type="button"
                        className="size-6 rounded bg-gray-900 text-white"
                        aria-label={`Añadir una unidad de ${item.name}`}
                      >
                        +
                      </button>
                    </div>
                  </td>
                  <td>
                    <button
                      type="button"
                      className="size-6 rounded-full bg-red-600 text-xs font-bold text-white"
                      aria-label={`Eliminar ${item.name} del carrito`}
                    >
                      X
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <div className="border-t border-gray-200 px-6 py-4">
        <p className="text-right text-lg">
          Total pagar: <span className="font-black">${total}</span>
        </p>
        <button
          type="button"
          className="mt-3 w-full rounded bg-gray-900 p-3 font-bold text-white uppercase transition hover:bg-gray-700 disabled:cursor-not-allowed disabled:bg-gray-400"
          disabled={isEmpty}
        >
          Vaciar carrito
        </button>
      </div>
    </aside>
  );
};
