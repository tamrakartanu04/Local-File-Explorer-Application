import { useEffect, useState } from "react";

// Read only the immediate contents of a folder
export async function readDirectory(directoryHandle, parentPath = "") {
  const items = [];

  for await (const entry of directoryHandle.values()) {
    const relativePath = parentPath
      ? `${parentPath}/${entry.name}`
      : entry.name;

    if (entry.kind === "directory") {
      items.push({
        name: entry.name,
        kind: "directory",
        path: relativePath,
        handle: entry,
        children: null,
      });
    } else {
      items.push({
        name: entry.name,
        kind: "file",
        path: relativePath,
        handle: entry,
      });
    }
  }

  // Display folders first, then files
  items.sort((a, b) => {
    if (a.kind !== b.kind) {
      return a.kind === "directory" ? -1 : 1;
    }

    return a.name.localeCompare(b.name);
  });

  return items;
}

// Count currently loaded files and folders
export function countItems(items = []) {
  let files = 0;
  let folders = 0;

  for (const item of items) {
    if (item.kind === "file") {
      files++;
    } else {
      folders++;

      const nested = countItems(item.children || []);
      files += nested.files;
      folders += nested.folders;
    }
  }

  return { files, folders };
}

// Update a folder inside the tree
function updateTree(items, targetPath, children) {
  return items.map((item) => {
    if (item.path === targetPath) {
      return { ...item, children };
    }

    if (item.kind === "directory" && item.children) {
      return {
        ...item,
        children: updateTree(
          item.children,
          targetPath,
          children
        ),
      };
    }

    return item;
  });
}

function FileExplorer({ items, selectedItem, onSelect }) {
  const [treeItems, setTreeItems] = useState(items);
  const [expanded, setExpanded] = useState({});
  const [loadingPaths, setLoadingPaths] = useState({});

  useEffect(() => {
    setTreeItems(items);
    setExpanded({});
  }, [items]);

  // Expand or collapse a folder
  const handleFolderClick = async (item) => {
    const isExpanded = expanded[item.path];

    if (isExpanded) {
      setExpanded((previous) => ({
        ...previous,
        [item.path]: false,
      }));

      onSelect(item);
      return;
    }

    // Load folder contents only when first expanded
    if (item.children === null) {
      setLoadingPaths((previous) => ({
        ...previous,
        [item.path]: true,
      }));

      try {
        const children = await readDirectory(
          item.handle,
          item.path
        );

        setTreeItems((previous) =>
          updateTree(previous, item.path, children)
        );

        const updatedItem = {
          ...item,
          children,
        };

        onSelect(updatedItem);
      } catch (error) {
        console.error("Folder loading error:", error);
        return;
      } finally {
        setLoadingPaths((previous) => ({
          ...previous,
          [item.path]: false,
        }));
      }
    } else {
      onSelect(item);
    }

    setExpanded((previous) => ({
      ...previous,
      [item.path]: true,
    }));
  };

  // Display files and folders recursively
  const renderItems = (list, depth = 0) => {
    return list.map((item) => {
      const isFolder = item.kind === "directory";
      const isExpanded = expanded[item.path];
      const isSelected = selectedItem?.path === item.path;
      const isLoading = loadingPaths[item.path];

      return (
        <div key={item.path}>
          <div
            className={`tree-item ${isSelected ? "selected" : ""}`}
            style={{ paddingLeft: `${12 + depth * 18}px` }}
          >
            <button
              className="tree-button"
              onClick={() => {
                if (isFolder) {
                  handleFolderClick(item);
                } else {
                  onSelect(item);
                }
              }}
            >
              <span>
                {isLoading
                  ? "⏳"
                  : isFolder
                    ? isExpanded
                      ? "📂"
                      : "📁"
                    : "📄"}
              </span>

              {item.name}
            </button>
          </div>

          {isFolder && isExpanded && (
            <div>
              {item.children?.length > 0 ? (
                renderItems(item.children, depth + 1)
              ) : (
                <div
                  className="empty-folder"
                  style={{
                    paddingLeft: `${36 + depth * 18}px`,
                  }}
                >
                  {isLoading
                    ? "Loading..."
                    : "Empty folder"}
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

      {treeItems.length === 0 ? (
        <p className="muted">This folder is empty.</p>
      ) : (
        renderItems(treeItems)
      )}
    </div>
  );
}

export default FileExplorer;
