import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

const inputNewPassword = document.getElementById("input-forgot-password-new");
const inputConfirmPassword = document.getElementById("input-forgot-password-new-confirm");
const btnSetPassword = document.getElementById("btn-set-password");
const messageText = document.getElementById("message-text");

<<<<<<< HEAD
const passwordToggleBtns = document.querySelectorAll(".password-toggle");

passwordToggleBtns.forEach((button) => {
=======
// Eye toggles
document.querySelectorAll(".password-toggle").forEach((button) => {
>>>>>>> 34069348f8473f2f8eabc129cdfc81273e10b955
    button.addEventListener("click", () => {
        const wrapper = button.closest(".input-wrapper");
        const input = wrapper.querySelector(".password-input");
        const icon = button.querySelector(".material-symbols-rounded");

        input.type = input.type === "password" ? "text" : "password";
        icon.textContent = input.type === "password" ? "visibility" : "visibility_off";
    });
});

<<<<<<< HEAD
function checkPasswordsMatch() {
    const newVal = inputNewPassword.value;
    const confirmVal = inputConfirmPassword.value;
    btnSetPassword.disabled = !(newVal && confirmVal && newVal === confirmVal);
}

inputNewPassword.addEventListener("input", checkPasswordsMatch);
inputConfirmPassword.addEventListener("input", checkPasswordsMatch);

=======
// Reset password
>>>>>>> 34069348f8473f2f8eabc129cdfc81273e10b955
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