const version = chrome.runtime.getManifest().version;
const versionText = document.getElementById("version-text");
const homeView = document.getElementById("home-view");
const settingsView = document.getElementById("settings-view");

// Home view settings and history buttons
const btnSettingsInHome = document.getElementById("btn-settings");
const btnHistoryInHome = document.getElementById("btn-history");

// Home view length selector buttons
const btnShortLength = document.getElementById("btn-length-short");
const btnMediumLength = document.getElementById("btn-length-medium");
const btnDetailedLength = document.getElementById("btn-length-detailed");

// Settings view history and settings buttons
const btnBackSettings = document.getElementById("btn-back-settings");
const btnSettingsInSettings = document.getElementById("btn-settings-current");
const btnHistoryInSettings = document.getElementById("btn-history-settings");



// Set version text
versionText.textContent = version;


// ******* NAVIGATION TABS ************
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