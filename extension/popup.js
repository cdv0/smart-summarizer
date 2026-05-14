const version = chrome.runtime.getManifest().version;
const versionText = document.getElementById("version-text");
const homeView = document.getElementById("home-view");
const settingsView = document.getElementById("settings-view");
const historyView = document.getElementById("history-view");
const loginView = document.getElementById("login-view");
const signupView = document.getElementById("signup-view");
const forgotPasswordEmailView = document.getElementById("forgot-password-email-view");
const newPasswordView = document.getElementById("new-password-view");
const passwordChangedView = document.getElementById("password-changed-view");

// CONSTANTS
const API_URL = "http://localhost:3000";


// Home view settings and history buttons
const btnSettingsInHome = document.getElementById("btn-settings");
const btnHistoryInHome = document.getElementById("btn-history");

// Home view length selector buttons
const btnShortLength = document.getElementById("btn-length-short");
const btnMediumLength = document.getElementById("btn-length-medium");
const btnDetailedLength = document.getElementById("btn-length-detailed");

// History back, view settings and history buttons
const btnBackHistory = document.getElementById("btn-back-history");
const btnHistoryCurrent = document.getElementById("btn-history-current");
const btnSettingsInHistory = document.getElementById("btn-settings-history");

// Settings view back, history and settings buttons
const btnBackSettings = document.getElementById("btn-back-settings");
const btnSettingsInSettings = document.getElementById("btn-settings-current");
const btnHistoryInSettings = document.getElementById("btn-history-settings");

// Login view buttons
const btnLabelSignUp = document.getElementById("btn-label-sign-up");
const btnLabelForgotPassword = document.getElementById("btn-label-forgot-password");
const inputLoginEmail = document.getElementById("input-login-email");
const inputLoginPassword = document.getElementById("input-login-password");
const btnLogin = document.getElementById("btn-login");
const errorLogin = document.getElementById("error-login");

// Signup view buttons
const btnLabelSignIn = document.getElementById("btn-label-login");
const inputSignupEmail = document.getElementById("input-signup-email");
const inputSignupPassword = document.getElementById("input-signup-password");
const inputSignupConfirmPassword = document.getElementById("input-signup-confirm-password");
const btnSignup = document.getElementById("btn-signup");

// Forgot password email view buttons & inputs
const btnLabelBackToLogin = document.getElementById("btn-label-back-to-login");
const btnSendPasswordResetLink = document.getElementById("btn-password-reset-link",);
const inputForgotPasswordEmail = document.getElementById("input-forgot-password-email");

// New password view buttons
const btnLabelBackToLoginFromNewPassword = document.getElementById("btn-label-back-to-login-from-password");
const btnSetNewPassword = document.getElementById("btn-set-password");

// Password changed view buttons
const btnLabelBackToLoginFromPasswordChanged = document.getElementById("btn-label-back-to-login-from-password-changed");

// Set version text
versionText.textContent = version;

// ******* NAVIGATION TABS ************
// Set initial view
settingsView.style.display = "none";
historyView.style.display = "none";
homeView.style.display = "none";

// Navigation Helper Functions
function goSettings() {
  historyView.style.display = "none";
  homeView.style.display = "none";
  settingsView.style.display = "block";

  // Settings buttons
  btnSettingsInSettings.classList.add("active-tab");
  btnHistoryInSettings.classList.remove("active-tab");
  // Home buttons
  btnHistoryInHome.classList.remove("active-tab");
  btnSettingsInHome.classList.remove("active-tab");
  // History buttons
  btnHistoryCurrent.classList.remove("active-tab");
  btnSettingsInHistory.classList.remove("active-tab");
}

function goHistory() {
  homeView.style.display = "none";
  settingsView.style.display = "none";
  historyView.style.display = "block";

  // Settings buttons
  btnSettingsInSettings.classList.remove("active-tab");
  btnHistoryInSettings.classList.remove("active-tab");
  // Home buttons
  btnHistoryInHome.classList.remove("active-tab");
  btnSettingsInHome.classList.remove("active-tab");
  // History buttons
  btnHistoryCurrent.classList.add("active-tab");
  btnSettingsInHistory.classList.remove("active-tab");
}

function goHome() {
  settingsView.style.display = "none";
  historyView.style.display = "none";
  signupView.style.display = "none";
  loginView.style.display = "none";
  homeView.style.display = "block";

  // Settings buttons
  btnSettingsInSettings.classList.remove("active-tab");
  btnHistoryInSettings.classList.remove("active-tab");

  // Home buttons
  btnSettingsInHome.classList.remove("active-tab");
  btnHistoryInHome.classList.remove("active-tab");

  // History buttons
  btnHistoryCurrent.classList.remove("active-tab");
  btnSettingsInHistory.classList.remove("active-tab");
}

function goSignUp() {
  loginView.style.display = "none";
  signupView.style.display = "block";
}

function goSignIn() {
  loginView.style.display = "flex";
  signupView.style.display = "none";
  forgotPasswordEmailView.style.display = "none";
  newPasswordView.style.display = "none";
  passwordChangedView.style.display = "none";
}

function goForgotPassword() {
  loginView.style.display = "none";
  forgotPasswordEmailView.style.display = "block";
}

function goNewPassword() {
  forgotPasswordEmailView.style.display = "none";
  newPasswordView.style.display = "block";
}

function goPasswordChanged() {
  passwordChangedView.style.display = "block";
  newPasswordView.style.display = "none";
}

// Go home
btnBackSettings.addEventListener("click", goHome);
btnBackHistory.addEventListener("click", goHome);

// Go history
btnHistoryInHome.addEventListener("click", goHistory);
btnHistoryInSettings.addEventListener("click", goHistory);

// Go settings
btnSettingsInHistory.addEventListener("click", goSettings);
btnSettingsInHome.addEventListener("click", goSettings);

// Go signup
btnLabelSignUp.addEventListener("click", goSignUp);

// Go signin
btnLabelSignIn.addEventListener("click", goSignIn);
btnLabelBackToLogin.addEventListener("click", goSignIn);
btnLabelBackToLoginFromNewPassword.addEventListener("click", goSignIn);
btnLabelBackToLoginFromPasswordChanged.addEventListener("click", goSignIn);

// Go forgot password email view
btnLabelForgotPassword.addEventListener("click", goForgotPassword);

// Go new password view
btnSendPasswordResetLink.addEventListener("click", goNewPassword);

// Go password changed view
btnSetNewPassword.addEventListener("click", goPasswordChanged);

// ****** HOME VIEW: CLICK LENGTH BUTTONS *******
// Helper function
function setActiveLength(activeBtn) {
  btnShortLength.classList.remove("active-length-btn");
  btnMediumLength.classList.remove("active-length-btn");
  btnDetailedLength.classList.remove("active-length-btn");

  activeBtn.classList.add("active-length-btn");
}

// click handlers
btnShortLength.addEventListener("click", () => {
  setActiveLength(btnShortLength);
});

btnMediumLength.addEventListener("click", () => {
  setActiveLength(btnMediumLength);
});

btnDetailedLength.addEventListener("click", () => {
  setActiveLength(btnDetailedLength);
});

// ************** POP UP OPENS *******************
chrome.storage.local.get(["access_token"], (result) => {
    if (result.access_token) {
        goHome();
    } else {
        goSignIn();
    }
})


// ************* SIGN IN VIEW *********************
// function updateLoginButton() {
//     btnLogin.disabled =
//         !inputLoginEmail.value.trim() ||
//         !inputLoginPassword.value.trim();
// }

// btnLogin.disabled = true;

// inputLoginEmail.addEventListener("input", updateLoginButton);
// inputLoginPassword.addEventListener("input", updateLoginButton);

// LOG IN
btnLogin.addEventListener("click", async () => {
    const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email: inputLoginEmail.value.trim(),
            password: inputLoginPassword.value,
        })
    });

    const data = await response.json();

    if (!response.ok) {
        console.log("Login error:", data.error);
        errorLogin.textContent = data.error;
        return;
    }

    if (data.session) {
        // Store session token using chrome local storage for chrome extensions
        await chrome.storage.local.set({
            access_token: data.session.access_token
        })

        const saved = await chrome.storage.local.get(["access_token"]);
        console.log("Saved token:", saved.access_token);    
    }

    console.log("Login success:", data);
    goHome();
})


// ************* SIGN UP VIEW *********************
// SIGN UP
btnSignup.addEventListener("click", async () => {
    const response = await fetch(`${API_URL}/signup`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email: inputSignupEmail.value.trim(),
            password: inputSignupPassword.value,
            confirmPassword: inputSignupConfirmPassword.value,
        }),
    });

    const data = await response.json();

    if (!response.ok) {
        console.log("Signup error:", data.error);
        return;
    }

    // Confirmation is required, supabase may not return a session

    console.log("Signup success:", data);
    goHome();
});

// ************* FORGOT PASSWORD VIEWS *********************
btnSendPasswordResetLink.disabled = true;

inputForgotPasswordEmail.addEventListener("input", () => {
  btnSendPasswordResetLink.disabled = !inputForgotPasswordEmail.value.trim();
});

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


// ***************** CLEAR ALL ERROR MESSAGE DISPLAY ************************
const errorTexts = document.querySelectorAll(".error-text");
const inputs = document.querySelectorAll(".input");

inputs.forEach((input) => {
    input.addEventListener("input", () => {

        errorTexts.forEach((text) => {
            text.textContent = "";
        });

    });
});