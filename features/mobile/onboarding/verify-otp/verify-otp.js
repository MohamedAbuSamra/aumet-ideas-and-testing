import { goToId } from "../../../../js/nav.js";

export function bindOtpInputs() {
  const boxes = [...document.querySelectorAll(".screen.active .otp-box")];
  if (!boxes.length) return;
  boxes.forEach((box, i) => {
    box.oninput = () => {
      box.value = box.value.replace(/\D/g, "").slice(0, 1);
      if (box.value && i < boxes.length - 1) boxes[i + 1].focus();
      const code = boxes.map((b) => b.value).join("");
      if (code.length === boxes.length) goToId("home");
    };
    box.onkeydown = (e) => {
      if (e.key === "Backspace" && !box.value && i > 0) boxes[i - 1].focus();
    };
  });
}
