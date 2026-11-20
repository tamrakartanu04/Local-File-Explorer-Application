<CodeBlock language="jsx" editable>
import { useState } from "react";


import FolderPicker from "./components/FolderPicker";
import FileExplorer, {
readDirectory
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

const handleFolderSelect = async (directoryHandle) => {
setLoading(true);
setError("");

// Clear old folder and selection
setFolder(null);
setItems([]);
setSelectedItem(null);

try {
const actualItems = await readDirectory(directoryHandle);

const rootFolder = {
name: directoryHandle.name,
kind: "directory",
path: "",
handle: directoryHandle,
children: actualItems
};

setFolder(rootFolder);
setItems(actualItems);
setSelectedItem(rootFolder);
setTreeVersion(version => version + 1);
} catch (err) {
setError("Unable to read this folder: " + err.message);
} finally {
setLoading(false);
}
};

return (
<div className="app">
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

{error && (
<div className="message">
{error}
<button onClick={() => setError("")}>Dismiss</button>
</div>
)}

{loading ? (
<div className="status">Reading folder contents...</div>
) : (
<main className="workspace">
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

<section className="main-panel">
<PropertiesPanel selectedItem={selectedItem} />
</section>
</main>
)}

<footer className="footer">
Read-only access · Your files stay on your computer
</footer>
</div>
);
}

export default App;
</CodeBlock>