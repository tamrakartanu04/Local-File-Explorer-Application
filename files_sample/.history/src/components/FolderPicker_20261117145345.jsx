
function FolderPicker({ onFolderSelect, onError, onLoading }) {
  const openFolder = async () => {
    if (!window.showDirectoryPicker) {
      onError(
        "Your browser does not support folder selection. Please use Chrome or Edge."
      );
      return;
    }

    try {
      onLoading(true);
      onError("");

      const directoryHandle =
        await window.showDirectoryPicker({
          mode: "read",
        });

      await onFolderSelect(directoryHandle);

    } catch (error) {
      if (error.name === "AbortError") {
        onError("Folder selection was cancelled.");
      } else {
        onError("Unable to open folder: " + error.message);
      }
    } finally {
      onLoading(false);
    }
  };

  return (
    <button className="open-button" onClick={openFolder}>
      📂 Open Folder
    </button>
  );
}

export default FolderPicker;
