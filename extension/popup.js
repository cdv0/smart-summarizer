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

const API_URL = "http://localhost:3000";

const btnSettingsInHome = document.getElementById("btn-settings");
const btnHistoryInHome = document.getElementById("btn-history");

const btnShortLength = document.getElementById("btn-length-short");
const btnMediumLength = document.getElementById("btn-length-medium");
const btnDetailedLength = document.getElementById("btn-length-detailed");

const btnBackHistory = document.getElementById("btn-back-history");
const btnHistoryCurrent = document.getElementById("btn-history-current");
const btnSettingsInHistory = document.getElementById("btn-settings-history");

const btnBackSettings = document.getElementById("btn-back-settings");
const btnSettingsInSettings = document.getElementById("btn-settings-current");
const btnHistoryInSettings = document.getElementById("btn-history-settings");
const btnSignout = document.getElementById("btn-signout");

const btnLabelSignUp = document.getElementById("btn-label-sign-up");
const btnLabelForgotPassword = document.getElementById("btn-label-forgot-password");
const inputLoginEmail = document.getElementById("input-login-email");
const inputLoginPassword = document.getElementById("input-login-password");
const btnLogin = document.getElementById("btn-login");
const errorLogin = document.getElementById("error-login");

const btnLabelSignIn = document.getElementById("btn-label-login");
const inputSignupEmail = document.getElementById("input-signup-email");
const inputSignupPassword = document.getElementById("input-signup-password");
const inputSignupConfirmPassword = document.getElementById("input-signup-confirm-password");
const btnSignup = document.getElementById("btn-signup");
const errorSignup = document.getElementById("error-signup");

const btnLabelBackToLogin = document.getElementById("btn-label-back-to-login");
const btnSendPasswordResetLink = document.getElementById("btn-password-reset-link");
const inputForgotPasswordEmail = document.getElementById("input-forgot-password-email");
const errorForgotPassword = document.getElementById("error-forgot-password");
const successForgotPassword = document.getElementById("success-forgot-password");

const btnLabelBackToLoginFromNewPassword = document.getElementById("btn-label-back-to-login-from-password");
const btnSetNewPassword = document.getElementById("btn-set-password");
const inputNewPassword = document.getElementById("input-forgot-password-new");
const inputConfirmPassword = document.getElementById("input-forgot-password-new-confirm");
const errorNewPassword = document.getElementById("error-new-password");

const btnLabelBackToLoginFromPasswordChanged = document.getElementById("btn-label-back-to-login-from-password-changed");

versionText.textContent = version;

settingsView.style.display = "none";
historyView.style.display = "none";
homeView.style.display = "none";

function goSettings() {
  historyView.style.display = "none";
  homeView.style.display = "none";
  settingsView.style.display = "block";

  btnSettingsInSettings.classList.add("active-tab");
  btnHistoryInSettings.classList.remove("active-tab");
  btnHistoryInHome.classList.remove("active-tab");
  btnSettingsInHome.classList.remove("active-tab");
  btnHistoryCurrent.classList.remove("active-tab");
  btnSettingsInHistory.classList.remove("active-tab");
}

function goHistory() {
  homeView.style.display = "none";
  settingsView.style.display = "none";
  historyView.style.display = "block";

  btnSettingsInSettings.classList.remove("active-tab");
  btnHistoryInSettings.classList.remove("active-tab");
  btnHistoryInHome.classList.remove("active-tab");
  btnSettingsInHome.classList.remove("active-tab");
  btnHistoryCurrent.classList.add("active-tab");
  btnSettingsInHistory.classList.remove("active-tab");
}

function goHome() {
  settingsView.style.display = "none";
  historyView.style.display = "none";
  signupView.style.display = "none";
  loginView.style.display = "none";
  homeView.style.display = "block";

  btnSettingsInSettings.classList.remove("active-tab");
  btnHistoryInSettings.classList.remove("active-tab");
  btnSettingsInHome.classList.remove("active-tab");
  btnHistoryInHome.classList.remove("active-tab");
  btnHistoryCurrent.classList.remove("active-tab");
  btnSettingsInHistory.classList.remove("active-tab");
}

function goSignUp() {
  loginView.style.display = "none";
  signupView.style.display = "block";
  settingsView.style.display = "none";

  inputSignupEmail.value = inputLoginEmail.value;
  inputSignupPassword.value = inputLoginPassword.value;
}

function goSignIn() {
  loginView.style.display = "flex";
  signupView.style.display = "none";
  forgotPasswordEmailView.style.display = "none";
  newPasswordView.style.display = "none";
  passwordChangedView.style.display = "none";
  settingsView.style.display = "none";

  inputLoginEmail.value = inputSignupEmail.value;
  inputLoginPassword.value = inputSignupPassword.value;
  successForgotPassword.textContent = "";
  errorForgotPassword.textContent = "";
}

function goForgotPassword() {
  loginView.style.display = "none";
  forgotPasswordEmailView.style.display = "block";

  inputForgotPasswordEmail.value = inputLoginEmail.value ? inputLoginEmail.value : "";
}

function goPasswordChanged() {
  passwordChangedView.style.display = "block";
  newPasswordView.style.display = "none";
}

btnBackSettings.addEventListener("click", goHome);
btnBackHistory.addEventListener("click", goHome);

btnHistoryInHome.addEventListener("click", goHistory);
btnHistoryInSettings.addEventListener("click", goHistory);

btnSettingsInHistory.addEventListener("click", goSettings);
btnSettingsInHome.addEventListener("click", goSettings);

btnLabelSignUp.addEventListener("click", goSignUp);

btnLabelSignIn.addEventListener("click", goSignIn);
btnLabelBackToLogin.addEventListener("click", goSignIn);
btnLabelBackToLoginFromNewPassword.addEventListener("click", goSignIn);
btnLabelBackToLoginFromPasswordChanged.addEventListener("click", goSignIn);

btnLabelForgotPassword.addEventListener("click", goForgotPassword);

btnSetNewPassword.addEventListener("click", goPasswordChanged);

function setActiveLength(activeBtn) {
  btnShortLength.classList.remove("active-length-btn");
  btnMediumLength.classList.remove("active-length-btn");
  btnDetailedLength.classList.remove("active-length-btn");

  activeBtn.classList.add("active-length-btn");
}

btnShortLength.addEventListener("click", () => {
  setActiveLength(btnShortLength);
});

btnMediumLength.addEventListener("click", () => {
  setActiveLength(btnMediumLength);
});

btnDetailedLength.addEventListener("click", () => {
  setActiveLength(btnDetailedLength);
});

chrome.storage.local.get(["access_token"], (result) => {
    if (result.access_token) {
        goHome();
    } else {
        goSignIn();
    }
});

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
        await chrome.storage.local.set({
            access_token: data.session.access_token
        });

        const saved = await chrome.storage.local.get(["access_token"]);
        console.log("Saved token:", saved.access_token);
    }

    console.log("Login success:", data);
    goHome();
});

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
        errorSignup.textContent = data.error;
        return;
    }

    console.log("Signup success:", data);
    goHome();
});

btnSendPasswordResetLink.disabled = true;

inputForgotPasswordEmail.addEventListener("input", () => {
  btnSendPasswordResetLink.disabled = !inputForgotPasswordEmail.value.trim();
  successForgotPassword.textContent = "";
  errorForgotPassword.textContent = "";
});

btnSignout.addEventListener("click", async () => {
    const { access_token } = await chrome.storage.local.get(["access_token"]);

    const response = await fetch(`${API_URL}/signout`, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${access_token}`
        }
    });

    await chrome.storage.local.remove("access_token");
    goSignIn();
});

btnSendPasswordResetLink.addEventListener("click", async () => {
    const response = await fetch(`${API_URL}/resetPassword`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email: inputForgotPasswordEmail.value.trim()
        })
    });

    const data = await response.json();
    console.log("Reset response:", response.ok, data);

    if (!response.ok) {
        console.log("Reset password error:", data.error);
        errorForgotPassword.textContent = data.error;
        successForgotPassword.textContent = "";
        return;
    }

    errorForgotPassword.textContent = "";
    successForgotPassword.textContent = "Reset link sent to email";
});

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

const errorTexts = document.querySelectorAll(".error-text");
const inputs = document.querySelectorAll(".input");

inputs.forEach((input) => {
    input.addEventListener("input", () => {
        errorTexts.forEach((text) => {
            text.textContent = "";
        });
    });
});

function checkNewPasswordsMatch() {
    const newVal = inputNewPassword.value;
    const confirmVal = inputConfirmPassword.value;
    btnSetNewPassword.disabled = !(newVal && confirmVal && newVal === confirmVal);
}

inputNewPassword.addEventListener("input", checkNewPasswordsMatch);
inputConfirmPassword.addEventListener("input", checkNewPasswordsMatch);

btnSetNewPassword.disabled = true;