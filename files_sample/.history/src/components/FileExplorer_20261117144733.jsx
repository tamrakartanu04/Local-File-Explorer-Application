<CodeBlock language="jsx" editable>
import { useState } from "react";


// Read actual directory contents recursively
export async function readDirectory(directoryHandle, parentPath = "") {
const items = [];

for await (const entry of directoryHandle.values()) {
const relativePath = parentPath
? $DIL0/$DIL1
: entry.name;

if (entry.kind === "directory") {
      const children = await readDirectory(entry, relativePath);

items.push({
        name: entry.name,
        kind: "directory",
        path: relativePath,
        handle: entry,
        children
      });
    } else {
      items.push({
        name: entry.name,
        kind: "file",
        path: relativePath,
        handle: entry
      });
    }
  }

// Sort folders before files
  items.sort((a, b) => {
    if (a.kind !== b.kind) {
      return a.kind === "directory" ? -1 : 1;
    }
    return a.name.localeCompare(b.name);
  });

return items;
}

// Count files and folders recursively
export function countItems(items) {
  let files = 0;
  let folders = 0;

for (const item of items) {
    if (item.kind === "file") {
      files++;
    } else {
      folders++;
      const nested = countItems(item.children);
      files += nested.files;
      folders += nested.folders;
    }
  }

return { files, folders };
}

function FileExplorer({
  items,
  selectedItem,
  onSelect
}) {
  const [expanded, setExpanded] = useState({});

const toggleFolder = (path) => {
    setExpanded(previous => ({
      ...previous,
      [path]: !previous[path]
    }));
  };

const renderItems = (list, depth = 0) => {
    return list.map(item => {
      const isFolder = item.kind === "directory";
      const isExpanded = expanded[item.path];
      const isSelected = selectedItem?.path === item.path;

return (

  <div key={item.path}>
    <div
      className={`tree-item $DIL0`}
      style={{ paddingLeft: `$DIL1px` }}
    >
      <button
        className="tree-button"
        onClick={() => {
          if (isFolder) {
            toggleFolder(item.path);
          }
          onSelect(item);
        }}
      >
        <span>
          {isFolder
            ? isExpanded ? "📂" : "📁"
            : "📄"}
        </span>


{item.name}
            </button>
          </div>

{isFolder && isExpanded && (
<div>
{item.children.length > 0 ? (
renderItems(item.children, depth + 1)
) : (
<div
className="empty-folder"
style={{ paddingLeft: $DIL0px }}
>
Empty folder
</div>
)}
</div>
)}
</div>
);
});
};

return (
    <div className="explorer">
      <h3>EXPLORER</h3>

{items.length === 0 ? (
        <p className="muted">This folder is empty.</p>
      ) : (
        renderItems(items)
      )}
    </div>
  );
}

export default FileExplorer;
</CodeBlock>