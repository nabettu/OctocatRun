import { startGame } from "./index";

interface Window {
  chrome: any;
}
declare var window: Window;

const errorDom = document.querySelector("#error_500");
if (errorDom) {
  errorDom.setAttribute(
    "style",
    "position: fixed;top: 0;left: 50%;transform: translateX(-50%);z-index: 100;"
  );
  const imagePath = {
    octocat:
      window.chrome?.runtime?.getURL("images/octocat.png") ??
      "/public/images/octocat.png",
    bug:
      window.chrome?.runtime?.getURL("images/bug.png") ??
      "/public/images/bug.png",
    bg:
      window.chrome?.runtime?.getURL("images/bg.png") ??
      "/public/images/bg.png",
  };
  startGame(imagePath);
}
