const REDIRECT_URL = "https://realepicgamerofficial.github.io/Orbit.Search.Engine/";
const REDIRECT_RULE_ID = 1;

/**
 * Updates the declarativeNetRequest rules based on the selected mode.
 * @param {string} mode - The new mode ('miniBrowser' or 'redirect').
 */
async function updateRedirectRules(mode) {
    const removeRuleIds = [REDIRECT_RULE_ID];
    let addRules = [];

    if (mode === 'redirect') {
        addRules.push({
            id: REDIRECT_RULE_ID,
            priority: 1,
            action: {
                type: "redirect",
                redirect: { url: REDIRECT_URL }
            },
            condition: {
                // Redirects google.com domains
                urlFilter: "||google.com", 
                resourceTypes: ["main_frame"]
            }
        });
    }

    try {
        await chrome.declarativeNetRequest.updateDynamicRules({
            removeRuleIds: removeRuleIds,
            addRules: addRules
        });
        console.log("Redirect rules updated for mode:", mode);
    } catch (error) {
        console.error("Error updating redirect rules:", error);
    }
}

// On extension install, set the default mode to 'miniBrowser'
chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.sync.get('mode', ({ mode }) => {
        if (!mode) {
            chrome.storage.sync.set({ mode: 'miniBrowser' }, () => {
                updateRedirectRules('miniBrowser');
            });
        } else {
            // Ensure rules are in sync with storage on install/update
            updateRedirectRules(mode);
        }
    });
});

// Listen for messages from the popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'updateMode') {
        updateRedirectRules(request.mode);
        sendResponse({ status: "success" });
    }
    // Keep the message channel open for async response
    return true; 
});
