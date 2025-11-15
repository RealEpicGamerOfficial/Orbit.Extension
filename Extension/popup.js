document.addEventListener('DOMContentLoaded', () => {
    const toggleSwitch = document.getElementById('mode-toggle');
    const toggleLabel = document.getElementById('toggle-label');
    const miniBrowserView = document.getElementById('mini-browser-view');
    const redirectView = document.getElementById('redirect-view');
    const iframe = document.getElementById('orbit-iframe');
    const orbitUrl = "https://realepicgamerofficial.github.io/Orbit.Search.Engine/";

    // Load the saved state
    chrome.storage.sync.get('mode', ({ mode }) => {
        const currentMode = mode || 'miniBrowser'; // Default to miniBrowser
        updateUI(currentMode);
    });

    // Handle toggle switch change
    toggleSwitch.addEventListener('change', () => {
        const newMode = toggleSwitch.checked ? 'redirect' : 'miniBrowser';
        
        // Save the new mode
        chrome.storage.sync.set({ mode: newMode }, () => {
            // Send message to background script to update rules
            chrome.runtime.sendMessage({ action: 'updateMode', mode: newMode });
            
            // Update the popup UI
            updateUI(newMode);
        });
    });

    /**
     * Updates the popup UI based on the selected mode.
     * @param {string} mode - The current mode ('miniBrowser' or 'redirect').
     */
    function updateUI(mode) {
        if (mode === 'redirect') {
            toggleSwitch.checked = true;
            toggleLabel.textContent = 'Redirect';
            miniBrowserView.style.display = 'none';
            redirectView.style.display = 'flex';
        } else {
            toggleSwitch.checked = false;
            toggleLabel.textContent = 'Mini-Browser';
            miniBrowserView.style.display = 'flex';
            redirectView.style.display = 'none';
            
            // Reload iframe if its src is not set (e.g., on first open)
            if (iframe.src !== orbitUrl) {
                iframe.src = orbitUrl;
            }
        }
    }
});
