import { Footer, Guitar, Header } from './components';

const App = () => {
  return (
    <>
      <Header />

      <main className="mx-auto mt-10 max-w-6xl px-4">
        <h2 className="text-center text-4xl font-black">Nuestra Colección</h2>

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
