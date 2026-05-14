import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

const supabaseUrl = "https://jpsisquwpiavohtekurr.supabase.co"
const supabaseAnonKey = "sb_publishable_aZwACP6jETuNgXposv-ueA_BJFTfpGM"

const supabase = createClient(supabaseUrl, supabaseAnonKey);

const inputNewPassword = document.getElementById("input-forgot-password-new");
const inputConfirmPassword = document.getElementById("input-forgot-password-new-confirm");
const btnSetPassword = document.getElementById("btn-set-password");
const messageText = document.getElementById("message-text");

const passwordToggleBtns = document.querySelectorAll(".password-toggle");

passwordToggleBtns.forEach((button) => {
    button.addEventListener("click", () => {
        const wrapper = button.closest(".input-wrapper");
        const input = wrapper.querySelector(".password-input");
        const icon = button.querySelector(".material-symbols-rounded");

        input.type = input.type === "password" ? "text" : "password";
        icon.textContent = input.type === "password" ? "visibility" : "visibility_off";
    });
});

// Reset password
btnSetPassword.addEventListener("click", async () => {
    const newPassword = inputNewPassword.value.trim();
    const confirmPassword = inputConfirmPassword.value.trim();

    messageText.textContent = "";
    messageText.className = "error-text";

    if (!newPassword || !confirmPassword) {
        messageText.textContent = "Please fill out both password fields.";
        return;
    }

    if (newPassword !== confirmPassword) {
        messageText.textContent = "Passwords do not match.";
        return;
    }

    const { error } = await supabase.auth.updateUser({
        password: newPassword,
    });

    if (error) {
        messageText.textContent = error.message;
        return;
    }

    messageText.className = "success-text";
    messageText.textContent = "Password successfully changed.";
});