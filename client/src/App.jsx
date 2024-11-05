import { Routes, Route } from "react-router-dom";
import MediaUploader from "./pages/MediaUploader";
import MediaManager from "./pages/MediaManager";
import MediaView from "./pages/MediaView";
import Dashboard from "./pages/Dashboard";
import Settings from "./pages/Settings";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />}>
        <Route path="upload" element={<MediaUploader />} />
        <Route path="manage" element={<MediaManager />} />
        <Route path="/settings" element={<Settings />} />
      </Route>
      <Route path="view" element={<MediaView />} />
    </Routes>
  );
}

export default App;
