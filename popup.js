const version = chrome.runtime.getManifest().version;
const versionText = document.getElementById("version-text");
const homeView = document.getElementById("home-view");
const settingsView = document.getElementById("settings-view");

// Home view settings and history buttons
const btnSettingsInHome = document.getElementById("btn-settings");
const btnHistoryInHome = document.getElementById("btn-history");

// Settings view history and settings buttons
const btnBackSettings = document.getElementById("btn-back-settings");
const btnSettingsInSettings = document.getElementById("btn-settings-current");
const btnHistoryInSettings = document.getElementById("btn-history-settings");

// Set version text
versionText.textContent = version;

// Set initial view
settingsView.style.display = "none";
homeView.style.display = "block";

// Go to settings
btnSettingsInHome.addEventListener("click", () => {
    homeView.style.display = "none";
    settingsView.style.display = "block";

    btnSettingsInSettings.classList.add("active-tab");
    btnHistoryInSettings.classList.remove("active-tab");
    btnHistoryInHome.classList.remove("active-tab");
    btnSettingsInHome.classList.remove("active-tab");
});

// Back to home
btnBackSettings.addEventListener("click", () => {
    settingsView.style.display = "none";
    homeView.style.display = "block";

    btnSettingsInSettings.classList.remove("active-tab");
    btnHistoryInSettings.classList.remove("active-tab");
    btnSettingsInHome.classList.remove("active-tab");
    btnHistoryInHome.classList.remove("active-tab");
});