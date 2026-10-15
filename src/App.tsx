import { Footer } from './components';

const App = () => {
  return (
    <>
      <header>
        <div>
          <a href="index.html">
            <img src="/img/logo.svg" alt="Logotipo de GuitarLA" />
          </a>

          <nav>
            <button type="button" aria-label="Abrir carrito">
              <img src="/img/carrito.png" alt="" />
            </button>
          </nav>
        </div>
      </header>

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

      <main>
        <h2>Nuestra Colección</h2>

        <div>
          <article>
            <img src="/img/guitarra_01.jpg" alt="Guitarra Lukather" />
            <div>
              <h3>Lukather</h3>
              <p>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sit
                quae labore odit magnam in autem nesciunt, amet deserunt.
              </p>
              <p>$299</p>
              <button type="button">Agregar al carrito</button>
            </div>
          </article>
          <article>
            <img src="/img/guitarra_02.jpg" alt="Guitarra SRV" />
            <div>
              <h3>SRV</h3>
              <p>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sit
                quae labore odit magnam in autem nesciunt, amet deserunt.
              </p>
              <p>$349</p>
              <button type="button">Agregar al carrito</button>
            </div>
          </article>
          <article>
            <img src="/img/guitarra_03.jpg" alt="Guitarra Borland" />
            <div>
              <h3>Borland</h3>
              <p>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sit
                quae labore odit magnam in autem nesciunt, amet deserunt.
              </p>
              <p>$329</p>
              <button type="button">Agregar al carrito</button>
            </div>
          </article>
          <article>
            <img src="/img/guitarra_04.jpg" alt="Guitarra VAI" />
            <div>
              <h3>VAI</h3>
              <p>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sit
                quae labore odit magnam in autem nesciunt, amet deserunt.
              </p>
              <p>$299</p>
              <button type="button">Agregar al carrito</button>
            </div>
          </article>
          <article>
            <img src="/img/guitarra_05.jpg" alt="Guitarra Thompson" />
            <div>
              <h3>Thompson</h3>
              <p>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sit
                quae labore odit magnam in autem nesciunt, amet deserunt.
              </p>
              <p>$399</p>
              <button type="button">Agregar al carrito</button>
            </div>
          </article>
          <article>
            <img src="/img/guitarra_06.jpg" alt="Guitarra White" />
            <div>
              <h3>White</h3>
              <p>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sit
                quae labore odit magnam in autem nesciunt, amet deserunt.
              </p>
              <p>$329</p>
              <button type="button">Agregar al carrito</button>
            </div>
          </article>
          <article>
            <img src="/img/guitarra_07.jpg" alt="Guitarra Cobain" />
            <div>
              <h3>Cobain</h3>
              <p>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sit
                quae labore odit magnam in autem nesciunt, amet deserunt.
              </p>
              <p>$349</p>
              <button type="button">Agregar al carrito</button>
            </div>
          </article>
          <article>
            <img src="/img/guitarra_08.jpg" alt="Guitarra Dale" />
            <div>
              <h3>Dale</h3>
              <p>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sit
                quae labore odit magnam in autem nesciunt, amet deserunt.
              </p>
              <p>$379</p>
              <button type="button">Agregar al carrito</button>
            </div>
          </article>
          <article>
            <img src="/img/guitarra_09.jpg" alt="Guitarra Krieger" />
            <div>
              <h3>Krieger</h3>
              <p>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sit
                quae labore odit magnam in autem nesciunt, amet deserunt.
              </p>
              <p>$289</p>
              <button type="button">Agregar al carrito</button>
            </div>
          </article>
          <article>
            <img src="/img/guitarra_10.jpg" alt="Guitarra Campbell" />
            <div>
              <h3>Campbell</h3>
              <p>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sit
                quae labore odit magnam in autem nesciunt, amet deserunt.
              </p>
              <p>$349</p>
              <button type="button">Agregar al carrito</button>
            </div>
          </article>
          <article>
            <img src="/img/guitarra_11.jpg" alt="Guitarra Reed" />
            <div>
              <h3>Reed</h3>
              <p>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sit
                quae labore odit magnam in autem nesciunt, amet deserunt.
              </p>
              <p>$399</p>
              <button type="button">Agregar al carrito</button>
            </div>
          </article>
          <article>
            <img src="/img/guitarra_12.jpg" alt="Guitarra Hazel" />
            <div>
              <h3>Hazel</h3>
              <p>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sit
                quae labore odit magnam in autem nesciunt, amet deserunt.
              </p>
              <p>$379</p>
              <button type="button">Agregar al carrito</button>
            </div>
          </article>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default App;
