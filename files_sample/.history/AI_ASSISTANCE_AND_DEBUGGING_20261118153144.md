# AI Assistance and Debugging Documentation

## 1. Example of AI Assistance

AI assistance was used during development to:

- Understand React components, props and state management.
- Understand the File System Access API.
- Learn Playwright configuration and automated testing.
- Prepare test scenarios for folder selection, nested folders and file properties.
- Understand browser security restrictions.

The suggested solutions were reviewed and adapted to the application's actual implementation.

## 2. Debugging Example – Folder Selection Issue

### Problem

During manual testing, selecting folders in Google Chrome sometimes resulted in folder-picker errors, including:

- `showDirectoryPicker()` errors.
- `The user aborted a request`.
- Folder selection being cancelled unexpectedly.

### Investigation

- Checked the folder-selection functionality in the application.
- Tested the same functionality in Microsoft Edge.
- Compared the observed behaviour across browsers.
- Confirmed that folder selection worked successfully in Microsoft Edge.

### Outcome

Microsoft Edge was used for the application's demonstration and further testing.

Chrome compatibility remains an issue requiring additional investigation. The exact root cause has not yet been established.

## 3. Learning Outcome

This experience helped me understand:

- Browser compatibility.
- The File System Access API.
- Secure-context requirements.
- Browser permission handling.
- The importance of testing applications across browsers.
