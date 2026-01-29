import { HashRouter, Routes, Route, Link } from 'react-router-dom';
import { Home } from './pages/Home';

const About = () => (
  <div className="flex flex-col items-center justify-center min-h-[80vh] p-10 text-center">
    <div className="bg-white p-8 rounded-3xl shadow-xl max-w-md">
      <h2 className="text-3xl font-bold text-gray-800">O projekcie</h2>
      <p className="mt-4 text-gray-600 leading-relaxed">
        Smart Todo List to aplikacja do pilnowania zadań, stworzona w React/Typescript.
      </p>
      <Link to="/" className="mt-6 inline-block bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition">
        Powrót do zadań
      </Link>
    </div>
  </div>
);

function App() {
  return (
    <HashRouter>
      <div className="min-h-screen w-full bg-gray-100 flex flex-col">
        <nav className="bg-gray-800 text-white p-4 shadow-md flex gap-6 justify-center">
          <Link to="/" className="hover:text-blue-400 font-medium transition">Zadania</Link>
          <Link to="/about" className="hover:text-blue-400 font-medium transition">O nas</Link>
        </nav>

        <main className="flex-1 w-full flex justify-center items-start pt-10">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </main>
      </div>
    </HashRouter>
  );
}

export default App;