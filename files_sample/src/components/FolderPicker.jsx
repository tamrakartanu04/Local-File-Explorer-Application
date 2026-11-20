
import { useRef, useState } from "react";

function FolderPicker({ onFolderSelect, onError }) {
  const [isPicking, setIsPicking] = useState(false);
  const pickerActive = useRef(false);

  const openFolder = async () => {
    if (pickerActive.current) return;

    if (!window.showDirectoryPicker) {
      onError("Your browser does not support folder selection.");
      return;
    }

    pickerActive.current = true;
    setIsPicking(true);
    onError("");

    let directoryHandle;

    // Step 1: Open the folder picker
    try {
      directoryHandle = await window.showDirectoryPicker({
        mode: "read",
      });
    } catch (error) {
      if (error.name === "AbortError") {
  console.error("Picker aborted:", error.name, error.message);

  onError(
    "Picker aborted: " + error.message
  );
} else {
        onError("Folder picker error: " + error.message);
      }

      pickerActive.current = false;
      setIsPicking(false);
      return;
    }

    // Step 2: Read the selected folder
    try {
      console.log("Selected folder:", directoryHandle.name);

      await onFolderSelect(directoryHandle);
    } catch (error) {
      console.error("Folder reading error:", error);
      onError("Unable to read folder: " + error.message);
    } finally {
      pickerActive.current = false;
      setIsPicking(false);
    }
  };

  return (
    <button
      className="open-button"
      onClick={openFolder}
      disabled={isPicking}
    >
      {isPicking ? "Opening..." : "📂 Open Folder"}
    </button>
  );
}

export default FolderPicker;
