import { Routes, Route } from "react-router-dom";
import MediaUploader from "./components/MediaUploader";
import MediaManager from "./components/MediaManager";
import MediaView from "./pages/MediaView";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />}>
        <Route path="upload" element={<MediaUploader />} />
        <Route path="manage" element={<MediaManager />} />
      </Route>
      <Route path="view" element={<MediaView />} />

    </Routes>
  );
}

export default App;
