# AI Assistance and Debugging Documentation

## 1. Example of AI Assistance

During the development of this project, I used AI as a learning and problem-solving aid.

It helped me understand how React components work together, how props and state are used to manage data, and how the File System Access API allows users to access local folders with permission.

I also used it to learn the basics of Playwright, understand automated testing and prepare test scenarios for different application features.

I reviewed the suggestions and made changes according to my application's requirements.

## 2. Debugging Example – Folder Selection Issue

### Problem

While testing the application, I faced an issue with folder selection in Google Chrome. Sometimes, when I clicked the Open Folder button, the folder picker did not work as expected and displayed errors such as `showDirectoryPicker()` errors or `The user aborted a request`.

### How I Investigated It

I initially checked whether the issue was related to my application's folder-selection logic. I then tried selecting the same folders using Microsoft Edge.

I observed that folder selection was working correctly in Edge, while I continued to experience issues in Chrome.

### Outcome

I continued testing and used Microsoft Edge for the application demonstration because the folder-selection functionality was working there.

I have not yet identified the exact reason for the Chrome issue, so further investigation is still needed.

## 3. What I Learned

While working on this issue, I got a better understanding of browser compatibility, the File System Access API and browser permission requirements.

I also learned that an application should be tested in different browsers and that identifying the exact cause of an issue is important before deciding on a solution.