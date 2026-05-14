import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "YOUR_SUPABASE_URL";
const supabaseAnonKey = "YOUR_SUPABASE_ANON_KEY";

const supabase = createClient(supabaseUrl, supabaseAnonKey);

const inputNewPassword = document.getElementById("input-forgot-password-new");
const inputConfirmPassword = document.getElementById("input-forgot-password-new-confirm");
const btnSetPassword = document.getElementById("btn-set-password");
const messageText = document.getElementById("error-login");

// ************ PASSWORD EYE TOGGLES *****************
const passwordToggleBtns = document.querySelectorAll(".password-toggle");

passwordToggleBtns.forEach((button) => {
    button.addEventListener("click", () => {
        const input = button.parentElement.querySelector(".password-input");
        const icon = button.querySelector(".input-icon");

        if (input.type === "password") {
            input.type = "text";
            icon.textContent = "visibility_off";
        } else {
            input.type = "password";
            icon.textContent = "visibility";
        }
    });
});

// ************ RESET PASSWORD *****************
btnSetPassword.addEventListener("click", async () => {
    const newPassword = inputNewPassword.value;
    const confirmPassword = inputConfirmPassword.value;

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
        password: newPassword
    });

    if (error) {
        messageText.textContent = error.message;
        return;
    }

    messageText.className = "success-text";
    messageText.textContent = "Successfully changed password";
});