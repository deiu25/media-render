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
            <Link to="settings" className="text-lg hover:text-gray-300">
              Settings
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
            <h2 className="text-2xl font-semibold mb-4">
              About the Application
            </h2>
            <p className="text-gray-300 mb-4">
              This is a media playback application that enables uploading,
              organizing, and viewing media files in an efficient and
              customizable way, offering an intuitive experience for users.
            </p>
            <ul className="text-gray-400 list-disc list-inside space-y-2">
              <li>
                <strong>Upload Media</strong>: Upload images and videos directly
                into the application. Each media file is saved and available for
                playback and further organization.
              </li>
              <li>
                <strong>Organize Media</strong>: Manage and organize media files
                through an intuitive drag-and-drop interface, allowing you to
                arrange files in the desired order. You also have options to
                delete files and modify playback settings.
              </li>
              <li>
                <strong>Media Playback</strong>: Play media files in a
                continuous loop, with pause and play options to control the
                viewing experience. The application supports a personalized view
                and a seamless flow of media content.
              </li>
            </ul>
            <h3 className="text-lg font-semibold text-gray-300 mt-6 mb-2">
              Additional Features
            </h3>
            <ul className="text-gray-400 list-disc list-inside space-y-2">
              <li>
                <strong>Playback Settings</strong>: Adjust the playback
                interval, with settings automatically saved for a continuous
                experience.
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
