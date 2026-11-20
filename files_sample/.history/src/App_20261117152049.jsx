
import { useState } from "react";

import FolderPicker from "./components/FolderPicker";

import FileExplorer, {
  readDirectory,
} from "./components/FileExplorer";

import PropertiesPanel from "./components/PropertiesPanel";

import "./App.css";

function App() {
  const [folder, setFolder] = useState(null);
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [treeVersion, setTreeVersion] = useState(0);

  // Handle folder selection
  const handleFolderSelect = async (directoryHandle) => {
    setLoading(true);
    setError("");

    // Clear previous folder and selection
    setFolder(null);
    setItems([]);
    setSelectedItem(null);

    try {
      // Read actual folder contents
      console.log("1. Folder selected:", directoryHandle.name);

console.log("2. Starting folder scan...");

const actualItems = await readDirectory(directoryHandle);

console.log("3. Folder scan completed:", actualItems);

console.log("4. Number of items:", actualItems.length);

      // Create root folder object
      const rootFolder = {
        name: directoryHandle.name,
        kind: "directory",
        path: "",
        handle: directoryHandle,
        children: actualItems,
      };

      setFolder(rootFolder);
      setItems(actualItems);
      setSelectedItem(rootFolder);

      // Reset the expanded/collapsed tree state
      setTreeVersion((version) => version + 1);
    } catch (err) {
      setError("Unable to read this folder: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">

      {/* Header */}
      <header className="header">
        <div>
          <h1>Local File Explorer</h1>
          <p>Browse your computer's folders securely</p>
        </div>

        <FolderPicker
          onFolderSelect={handleFolderSelect}
          onError={setError}
          onLoading={setLoading}
        />
      </header>

      {/* Error message */}
      {error && (
        <div className="message">
          {error}

          <button onClick={() => setError("")}>
            Dismiss
          </button>
        </div>
      )}

      {/* Loading or main workspace */}
      {loading ? (
        <div className="status">
          Reading folder contents...
        </div>
      ) : (
        <main className="workspace">

          {/* Left sidebar */}
          <section className="sidebar">
            <div className="root-name">
              📁 {folder?.name || "No folder selected"}
            </div>

            {folder && (
              <FileExplorer
                key={treeVersion}
                items={items}
                selectedItem={selectedItem}
                onSelect={setSelectedItem}
              />
            )}

            {!folder && (
              <p className="muted">
                Click Open Folder to get started.
              </p>
            )}
          </section>

          {/* Right properties panel */}
          <section className="main-panel">
            <PropertiesPanel
              selectedItem={selectedItem}
            />
          </section>

        </main>
      )}

      {/* Footer */}
      <footer className="footer">
        Read-only access · Your files stay on your computer
      </footer>

    </div>
  );
}

export default App;
