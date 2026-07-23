"use strict";
const input = document.getElementById("password");
const btn = document.getElementById("toggle");
if (btn && input) {
    btn.addEventListener("click", () => {
        if (input.type === "password") {
            input.type = "text";
            btn.textContent = "Hide";
        }
        else {
            input.type = "password";
            btn.textContent = "Show";
        }
    });
}
