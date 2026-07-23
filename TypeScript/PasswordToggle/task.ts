const inp = document.getElementById("password") as HTMLInputElement | null;
const button = document.getElementById("toggle") as HTMLButtonElement | null;

if (button && inp) {
  button.addEventListener("click", () => {
    if (inp.type === "password") {
      inp.type = "text";
      button.textContent = "Hide";
    } else {
      inp.type = "password";
      button.textContent = "Show";
    }
  });
}
