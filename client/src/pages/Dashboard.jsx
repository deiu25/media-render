import { Outlet, Link, useLocation } from "react-router-dom";

export default function Dashboard() {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <header className="p-4 bg-gray-800 shadow-lg">
        <h1 className="text-3xl font-bold text-center">Dashboard</h1>
      </header>

      <nav className="p-4 bg-gray-700">
        <ul className="flex justify-center space-x-4">
          <li>
            <Link to="upload" className="text-lg hover:text-gray-300">
              Upload Media
            </Link>
          </li>
          <li>
            <Link to="manage" className="text-lg hover:text-gray-300">
              Manage Media
            </Link>
          </li>
          <li>
            <Link to="view" className="text-lg hover:text-gray-300">
              View Media
            </Link>
          </li>
        </ul>
      </nav>

      <main className="p-6 mt-12">
        {location.pathname === "/" && (
          <section className="text-center mb-8">
            <h2 className="text-2xl font-semibold mb-4">Despre aplicație</h2>
            <p className="text-gray-300 mb-4">
              Aceasta este o aplicație de redare media care permite încărcarea,
              gestionarea și vizualizarea fișierelor media într-un mod simplu și
              intuitiv.
            </p>
            <ul className="text-gray-400 list-disc list-inside space-y-2">
              <li>
                <strong>Upload Media</strong>: Încarcă imagini și videoclipuri
                care pot fi stocate și gestionate în aplicație.
              </li>
              <li>
                <strong>Manage Media</strong>: Vizualizează, șterge sau
                organizează fișierele media pe care le-ai încărcat.
              </li>
              <li>
                <strong>View Media</strong>: Redă fișierele media într-o buclă,
                având opțiuni de pauză și redare pentru o experiență de
                vizualizare personalizată.
              </li>
            </ul>
          </section>
        )}
        <Outlet />
      </main>

      <footer className="p-4 text-center text-gray-500">
        © {new Date().getFullYear()} Media Loop Application
      </footer>
    </div>
  );
}
