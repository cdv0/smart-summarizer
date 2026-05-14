import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

const inputNewPassword = document.getElementById("input-forgot-password-new");
const inputConfirmPassword = document.getElementById("input-forgot-password-new-confirm");
const btnSetPassword = document.getElementById("btn-set-password");
const messageText = document.getElementById("error-login");

// Eye toggles
document.querySelectorAll(".password-toggle").forEach((button) => {
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
    messageText.textContent = "Successfully changed password";
});