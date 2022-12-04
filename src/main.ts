import { startGame } from "./index";

console.log("main");

const span = document.querySelector("#error_500");
if (span) {
  span.setAttribute(
    "style",
    "position: fixed;top: 0;left: 50%;transform: translateX(-50%);z-index: 100;"
  );
  const imagePath = {
    octocat:
      //@ts-ignore
      chrome?.runtime?.getURL("images/octocat.png") ??
      "/public/images/octocat.png",
    //@ts-ignore
    bug: chrome?.runtime?.getURL("images/bug.png") ?? "/public/images/bug.png",
    //@ts-ignore
    bg: chrome?.runtime?.getURL("images/bg.png") ?? "/public/images/bg.png",
  };
  console.log(imagePath);

  startGame(imagePath);
  console.log("start game ");
}
