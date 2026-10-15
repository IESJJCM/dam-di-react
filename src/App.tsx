import { Footer, Guitar, Header } from './components';

const App = () => {
  return (
    <>
      <Header />

      {/* 
        <aside id="carrito">
        <div>
          <h2>Tu carrito</h2>
          <button type="button" aria-label="Cerrar carrito">
            ×
          </button>
        </div>

        <div>
          <p>El carrito está vacío</p>

          <table>
            <thead>
              <tr>
                <th>Imagen</th>
                <th>Nombre</th>
                <th>Precio</th>
                <th>Cantidad</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <img src="/img/guitarra_02.jpg" alt="Guitarra SRV" />
                </td>
                <td>SRV</td>
                <td>$299</td>
                <td>
                  <button type="button">-</button>1
                  <button type="button">+</button>
                </td>
                <td>
                  <button type="button">X</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div>
          <p>
            Total pagar: <span>$899</span>
          </p>
          <button type="button">Vaciar carrito</button>
        </div>
      </aside>
      */}

      <main>
        <h2>Nuestra Colección</h2>

        <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          <Guitar />
          <Guitar />
          <Guitar />
        </div>
      </main>

      <Footer />
    </>
  );
};

export default App;
