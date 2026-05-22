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
const API_URL = "http://localhost:3001";


// Home view settings, history, summarize buttons
const btnSettingsInHome = document.getElementById("btn-settings");
const btnHistoryInHome = document.getElementById("btn-history");
const btnSummarizePage = document.getElementById("btn-summarize-page");

// Home view selectors
const btnShortLength = document.getElementById("btn-length-short");
const btnMediumLength = document.getElementById("btn-length-medium");
const btnDetailedLength = document.getElementById("btn-length-detailed");
const currentPageTitle = document.getElementById("current-page-title");
const homeResultBody = document.getElementById("home-result-body");

// History back, view settings and history buttons
const btnBackHistory = document.getElementById("btn-back-history");
const btnHistoryCurrent = document.getElementById("btn-history-current");
const btnSettingsInHistory = document.getElementById("btn-settings-history");

// Settings view back, history and settings buttons
const btnBackSettings = document.getElementById("btn-back-settings");
const btnSettingsInSettings = document.getElementById("btn-settings-current");
const btnHistoryInSettings = document.getElementById("btn-history-settings");
const btnSignout = document.getElementById("btn-signout");

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
const errorSignup = document.getElementById("error-signup");

// Forgot password email view buttons & inputs
const btnLabelBackToLogin = document.getElementById("btn-label-back-to-login");
const btnSendPasswordResetLink = document.getElementById("btn-password-reset-link");
const inputForgotPasswordEmail = document.getElementById("input-forgot-password-email");
const errorForgotPassword = document.getElementById("error-forgot-password");
const successForgotPassword = document.getElementById("success-forgot-password");

// New password view buttons
const btnLabelBackToLoginFromNewPassword = document.getElementById("btn-label-back-to-login-from-password");
const btnSetNewPassword = document.getElementById("btn-set-password");
const inputNewPassword = document.getElementById("input-forgot-password-new");
const inputConfirmPassword = document.getElementById("input-forgot-password-new-confirm");
const errorNewPassword = document.getElementById("error-new-password");

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

    // Confirmation is required, supabase may not return a session

    console.log("Signup success:", data);
    goHome();
});

// ************* FORGOT PASSWORD VIEWS *********************
btnSendPasswordResetLink.disabled = true;

inputForgotPasswordEmail.addEventListener("input", () => {
  btnSendPasswordResetLink.disabled = !inputForgotPasswordEmail.value.trim();
});

// ***************** SETTINGS VIEW ************************
btnSignout.addEventListener("click", async () => {
    const { access_token } = await chrome.storage.local.get(["access_token"]);

    const response = await fetch(`${API_URL}/signout`, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${access_token}`
        }
    })

    await chrome.storage.local.remove("access_token");
    goSignIn();
})

// *********** RESET PASSWORD *****************
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
        return;
    }

    successForgotPassword.textContent = "Reset link sent to email";

    console.log(errorForgotPassword);
})


// ************ PASSWORD EYE TOGGLES *****************
const passwordToggleBtns = document.querySelectorAll(".password-toggle");

passwordToggleBtns.forEach((button) => {
    button.addEventListener("click", () => {
        const wrapper = button.parentElement;
        const input = wrapper.querySelector(".password-input");
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
const successText = document.getElementById("success-forgot-password");
const inputs = document.querySelectorAll(".input");

inputForgotPasswordEmail.addEventListener("input", () => {
    successText.textContent = "";
    errorForgotPassword.textContent = "";
});

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



// ************* HOME VIEW **********************
// Grab and display the tab's title on the popup
async function tabTitle() {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true })
    
    currentPageTitle.textContent = tab.title;
}

document.addEventListener("DOMContentLoaded", tabTitle);

async function getPageHtml() {
  // chrome.tabs.query - returns a list of tabs
  // [tab] destructures the first item from the array
  // active: true gets the currently selected tab and currentWindow gets the current chrome window
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  // chrome.scripting.executeScript runs JS directly inside the webpage.
  // target: { tabId: tab.id } tells Chrome which tab to run the script in using the active tab's ID
  // func: () => document.documentElement.outerHTML is the function executed inside the webpage, where it grabs the entire <html> element and returns the page as a string
  const results = await chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: () => document.documentElement.outerHTML,
  });

  // executeScript returns an array of results
  return results[0].result;
}

async function summarizePage() {
    try {
        const pageHtml = await getPageHtml();
        const summaryLength = document.getElementById("default-length").value;

        homeResultBody.textContent = "Generating summary...";

        const response = await fetch(`${API_URL}/summarize`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                content: pageHtml,
                summaryLength: summaryLength
            })
        });

        const data = await response.json();

        if (!response.ok) {
            console.log("Summarize error:", data.error);
            homeResultBody.textContent = data.error;
            return;
        }

        console.log("Summarize results:", data);

        if (data.summary) {
            homeResultBody.textContent = data.summary
        } else {
            homeResultBody.textContent = "An error ocurred. Please try again"
        }

        return data;

    } catch (err) {
        console.log("Summarize error:", err);
        homeResultBody.textContent = err.message;
    }
}

// Click summarize page button
btnSummarizePage.addEventListener("click", summarizePage);