<CodeBlock language="jsx" editable>
import { useEffect, useState } from "react";
import { countItems } from "./FileExplorer";

function formatSize(bytes) {
if (bytes < 1024) return $DIL0 Bytes;
if (bytes < 1024 * 1024) {
return $DIL1 KB;
}
return $DIL2 MB;
}

function PropertiesPanel({ selectedItem }) {
const [fileDetails, setFileDetails] = useState(null);
const [error, setError] = useState("");

useEffect(() => {
let active = true;

async function loadProperties() {
setFileDetails(null);
setError("");

if (!selectedItem || selectedItem.kind !== "file") {
return;
}

try {
const file = await selectedItem.handle.getFile();

if (active) {
const dotIndex = file.name.lastIndexOf(".");
const extension =
dotIndex > 0 ? file.name.slice(dotIndex + 1) : "No extension";

setFileDetails({
name: file.name,
size: formatSize(file.size),
modified: new Date(file.lastModified).toLocaleString(),
type: file.type || "Unknown",
extension
});
}
} catch (err) {
if (active) {
setError("Unable to read file properties.");
}
}
}

loadProperties();

return () => {
active = false;
};
}, [selectedItem]);

if (!selectedItem) {
return (
<div className="properties">
<h3>PROPERTIES</h3>
<p className="muted">Select a file or folder to see its properties.</p>
</div>
);
}

const isFolder = selectedItem.kind === "directory";
const counts = isFolder
? countItems(selectedItem.children || [])
: null;

return (
<div className="properties">
<h3>PROPERTIES</h3>

<div className="property-card">
<h2>{isFolder ? "📁" : "📄"} {selectedItem.name}</h2>

<div className="property-row">
<span>Name</span>
<strong>{selectedItem.name}</strong>
</div>

<div className="property-row">
<span>Type</span>
<strong>{isFolder ? "Folder" : fileDetails?.type || "Loading..."}</strong>
</div>

<div className="property-row">
<span>Relative Path</span>
<strong>{selectedItem.path || "."}</strong>
</div>

{isFolder ? (
<>
<div className="property-row">
<span>Files</span>
<strong>{counts.files}</strong>
</div>

<div className="property-row">
<span>Subfolders</span>
<strong>{counts.folders}</strong>
</div>
</>
) : (
<>
{error ? (
<p className="error">{error}</p>
) : (
<>
<div className="property-row">
<span>Extension</span>
<strong>{fileDetails?.extension || "Loading..."}</strong>
</div>

<div className="property-row">
<span>Size</span>
<strong>{fileDetails?.size || "Loading..."}</strong>
</div>

<div className="property-row">
<span>Modified</span>
<strong>{fileDetails?.modified || "Loading..."}</strong>
</div>
</>
)}
</>
)}
</div>
</div>
);
}

export default PropertiesPanel;
</CodeBlock>