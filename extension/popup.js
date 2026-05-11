const version = chrome.runtime.getManifest().version;
const versionText = document.getElementById("version-text");
const homeView = document.getElementById("home-view");
const settingsView = document.getElementById("settings-view");
const historyView = document.getElementById("history-view");
const loginView = document.getElementById("login-view");
const signupView = document.getElementById("signup-view");

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

// Signup view buttons
const btnLabelSignIn = document.getElementById("btn-label-login");



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
    loginView.style.display = "block";
    signupView.style.display = "none";
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