document.getElementById('open-apps').addEventListener('click', function() {
    chrome.tabs.create({ url: 'edge://apps' });
});

document.getElementById('open-serviceworker').addEventListener('click', function() {
    chrome.tabs.create({ url: 'edge://serviceworker-internals/' });
});

document.getElementById('open-inspect').addEventListener('click', function() {
    chrome.tabs.create({ url: 'edge://inspect/#devices' });
});

document.getElementById('open-cookies').addEventListener('click', function() {
    chrome.tabs.create({ url: 'edge://settings/content/cookies/siteData?searchSubpage' });
});

// Copy the command to unregister all service workers to clipboard
document.getElementById('unregister-sws').addEventListener('click', function() {
    const command = 'document.querySelectorAll(".unregister").forEach(item => item.click())';

    // Copy to clipboard
    navigator.clipboard.writeText(command).then(() => {
        showNotification('Command copied to clipboard');
    }).catch(err => {
        showNotification('Failed to copy the command');
        console.error('Error copying text: ', err);
    });
});

// Function to show a notification
function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.position = 'fixed';
    notification.style.bottom = '20px';
    notification.style.left = '50%';
    notification.style.transform = 'translateX(-50%)';  // Center the notification
    notification.style.backgroundColor = '#323232';
    notification.style.color = 'white';
    notification.style.padding = '12px 20px';
    notification.style.borderRadius = '8px';
    notification.style.boxShadow = '0px 4px 6px rgba(0, 0, 0, 0.4)';
    notification.style.fontSize = '14px';
    notification.style.zIndex = '10000';  // Ensure it's above other elements

    // Ensure the notification is contained within the width of the popup
    notification.style.maxWidth = '80%';  // Set max width to 80% of the popup's width
    notification.style.width = 'auto';    // Allow width to adjust based on content

    notification.innerText = message;

    // Append the notification to the body
    document.body.appendChild(notification);

    // Fade out the notification after 3 seconds
    setTimeout(() => {
        notification.style.opacity = '0';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 500);  // Remove after fade-out
    }, 3000);
}
