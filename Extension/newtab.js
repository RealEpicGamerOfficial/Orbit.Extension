// This script checks the mode and redirects the new tab accordingly.

chrome.storage.sync.get('mode', ({ mode }) => {
    const currentMode = mode || 'miniBrowser';

    if (currentMode === 'redirect') {
        // Redirect to Orbit Search
        location.href = "https://realepicgamerofficial.github.io/Orbit.Search.Engine/";
    } else {
        // Redirect to the default Chrome new tab page
        location.href = "chrome-native://newtab";
    }
});
