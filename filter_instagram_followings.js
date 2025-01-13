// Clear the current page content
document.body.innerHTML = '';
document.head.innerHTML = '';

// Add a title to the page
document.title = 'Instagram Followings Filter Tool';

// Add a basic stylesheet for better formatting
const style = document.createElement('style');
style.textContent = `
    body {
        font-family: Arial, sans-serif;
        margin: 20px;
        line-height: 1.6;
    }
    h1 {
        color: #333;
    }
    p {
        margin-bottom: 1em;
    }
    ol {
        margin-bottom: 1em;
    }
    input, button {
        margin: 5px 0;
        padding: 10px;
        font-size: 1em;
    }
    button {
        background-color: #007BFF;
        color: white;
        border: none;
        cursor: pointer;
    }
    button:disabled {
        background-color: #CCCCCC;
        cursor: not-allowed;
    }
    iframe {
        border: 1px solid #ccc;
        margin-top: 10px;
    }
    .controls {
        margin-bottom: 20px;
    }
`;
document.head.appendChild(style);

// Add instructions to the page
const instructions = document.createElement('div');
instructions.innerHTML = `
    <h1>Instagram Followings Filter Tool</h1>
    <p>
        This tool allows you to generate a new HTML file showing the profiles you follow
        on Instagram who do not follow you back. It uses two files exported from your Instagram
        account: one listing the profiles who follow you and the other listing the profiles you
        follow.
    </p>
    <h2>Usage Instructions</h2>
    <h3>Step 1: Retrieve Instagram Data Files</h3>
    <p>
        To download the required <strong>followers_1.html</strong> and <strong>following.html</strong> files from your Instagram account, follow these steps:
    </p>
    <ol>
        <li>Log into your Instagram account and go to <strong>Settings</strong>.</li>
        <li>Open Meta's <strong>Account's Centre</strong>.</li>
        <li>Navigate to <strong>Your information and permissions</strong>.</li>
        <li>Select <strong>Download your information</strong>.</li>
        <li>Click <strong>Download or transfer information</strong>.</li>
        <li>Choose the check box for <strong>Followers and following</strong> (deselect all other options).</li>
        <li>Click <strong>Download to device</strong>.</li>
        <li>For the <strong>Date range</strong> dropdown, select <strong>Last week</strong> (or the smallest date interval available) and save.</li>
        <li>For the <strong>Format</strong> dropdown, select <strong>HTML</strong> and save.</li>
        <li>For <strong>Media quality</strong>, select <strong>Low</strong> (to speed up the download) and save.</li>
        <li>Click <strong>Create files</strong> and wait for the email notification that your file is ready (might take a while).</li>
        <li>Once the status changes to <strong>Available downloads</strong>, click to download the ZIP file.</li>
        <li>Extract the downloaded ZIP file.</li>
        <li>Navigate to the <strong>connections</strong> folder, then to the <strong>followers_and_following</strong> folder.</li>
        <li>Ensure that both <strong>followers_1.html</strong> and <strong>following.html</strong> are present in this folder.</li>
    </ol>

    <h3>Step 2: Process Instagram Data Files</h3>
    <p>
        Once you have downloaded the required files, you can proceed with the following steps to filter your Instagram followings:
    </p>
    <ol>
        <li>Upload your <strong>followers_1.html</strong> file from your Instagram data export.</li>
        <li>Upload your <strong>following.html</strong> file from your Instagram data export.</li>
        <li>Click the <strong>Process Files</strong> button once both files are uploaded.</li>
        <li>View the generated HTML in the preview area.</li>
        <li>Download the filtered HTML file via the<strong>Download Filtered Following</strong> button to save locally.</li>
        <li>Open the downloaded file in a browser to view locally.</li>
    </ol>
`;
document.body.appendChild(instructions);

// Add a container for controls
const controls = document.createElement('div');
controls.className = 'controls';
document.body.appendChild(controls);

// Create input elements to load the HTML files
const inputFileFollowers = document.createElement('input');
inputFileFollowers.type = 'file';
inputFileFollowers.accept = '.html';

const labelFollowers = document.createElement('label');
labelFollowers.textContent = 'Upload Followers File (followers_1.html): ';
labelFollowers.appendChild(inputFileFollowers);

const inputFileFollowing = document.createElement('input');
inputFileFollowing.type = 'file';
inputFileFollowing.accept = '.html';

const labelFollowing = document.createElement('label');
labelFollowing.textContent = 'Upload Following File (following.html): ';
labelFollowing.appendChild(inputFileFollowing);

controls.appendChild(labelFollowers);
controls.appendChild(document.createElement('br'));
controls.appendChild(labelFollowing);
controls.appendChild(document.createElement('br'));

// Create a process button
const processButton = document.createElement('button');
processButton.textContent = 'Process Files';
processButton.disabled = true; // Initially disabled
controls.appendChild(processButton);

// Create a download button
const downloadButton = document.createElement('button');
downloadButton.textContent = 'Download Filtered Followings';
downloadButton.disabled = true; // Initially disabled
controls.appendChild(document.createElement('br'));
controls.appendChild(downloadButton);

// Create a preview section
const previewContainer = document.createElement('div');
previewContainer.style.marginTop = '20px';
document.body.appendChild(previewContainer);
previewContainer.innerHTML = '<h3>Preview:</h3>';
const iframe = document.createElement('iframe');
iframe.style.width = '100%';
iframe.style.height = '400px';
previewContainer.appendChild(iframe);
iframe.style.display = 'block'

let followersHtml = '';
let followingHtml = '';
let filteredHtml = '';

// Reset display buttons and preview, as well as input states if specified
function resetDisplay(resetInputs = false) {
    processButton.disabled = true;
    downloadButton.disabled = true;
    iframe.srcdoc = '';
    filteredHtml = '';
    if (resetInputs) {
        inputFileFollowers.value = '';
        inputFileFollowing.value = '';
        followersHtml = '';
        followingHtml = '';
    }
}

// Handle followers file input
function handleFileSelectionFollowers(event) {
    resetDisplay(false);
    try {
        const file = event.target.files[0];
        if (file && file.name === 'followers_1.html') {
            const reader = new FileReader();
            reader.onload = function (e) {
                followersHtml = e.target.result;
                checkFilesUploaded();
            };
            reader.readAsText(file);
        } else {
            throw new Error('Invalid file. Please upload the correct file: followers_1.html');
        }
    } catch (error) {
        console.error('Error during file selection:', error);
        alert(error.message);
        // Reset inputs
        inputFileFollowers.value = '';
        followersHtml = '';
    }
}

// Handle following file input
function handleFileSelectionFollowing(event) {
    resetDisplay(false);
    try {
        const file = event.target.files[0];
        if (file && file.name === 'following.html') {
            const reader = new FileReader();
            reader.onload = function (e) {
                followingHtml = e.target.result;
                checkFilesUploaded();
            };
            reader.readAsText(file);
        } else {
            throw new Error('Invalid file. Please upload the correct file: following.html');
        }
    } catch (error) {
        console.error('Error during file selection:', error);
        alert(error.message);
        // Reset inputs
        inputFileFollowing.value = '';
        followingHtml = '';
    }
}

// Check if both files are uploaded
function checkFilesUploaded() {
    if (followersHtml && followingHtml) {
        processButton.disabled = false;
    }
}

// Add event listeners to the file inputs
inputFileFollowers.addEventListener('click', () => inputFileFollowers.value = '');
inputFileFollowing.addEventListener('click', () => inputFileFollowing.value = '');
inputFileFollowers.addEventListener('change', handleFileSelectionFollowers);
inputFileFollowing.addEventListener('change', handleFileSelectionFollowing);


// Custom Error class for missing content
class MissingContentError extends Error {
    constructor(message) {
        super(message);
        this.name = 'MissingContentError';
    }
}

// Process files when the button is clicked
processButton.addEventListener('click', function () {
    try {
        if (!followersHtml.includes('<html>') || !followingHtml.includes('<html>')) {
            throw new Error('Invalid file format. Please upload a valid HTML file.');
        }

        if (followersHtml && followingHtml) {
            // Parse the followers HTML
            const parser = new DOMParser();
            const followersDoc = parser.parseFromString(followersHtml, 'text/html');
            const followerLinks = followersDoc.querySelectorAll('a');
            const followers = new Set([...followerLinks].map(link => link.textContent.trim()));

            // Ensure followers are present
            if (followerLinks.length === 0) {
                throw new MissingContentError('No followers found in the followers file.');
            }

            // Parse the following HTML
            const followingDoc = parser.parseFromString(followingHtml, 'text/html');
            const followingEntries = followingDoc.querySelectorAll('.pam');

            // Ensure expected classes are present
            if (followingEntries.length === 0) {
                throw new MissingContentError('No followings found in the following file.');
            }

            // Filter for followings not in followers
            followingEntries.forEach(entry => {
                const link = entry.querySelector('a');
                if (link && followers.has(link.textContent.trim())) {
                    entry.remove();
                }
            });

            // Rename title and subtitle
            const title = followingDoc.querySelector('._a70e');
            if (title) {
                title.textContent = 'Following (Not Followers)';
            }

            const subtitle = followingDoc.querySelector('._a70f');
            if (subtitle) {
                subtitle.textContent = 'Profiles you choose to see content from who don\'t follow you back';
            }

            // Generate new HTML from the modified following document
            filteredHtml = followingDoc.documentElement.outerHTML;

            // Update the preview
            iframe.srcdoc = filteredHtml;

            // Enable and configure the download button
            downloadButton.disabled = false;
        }
    } catch (error) {
        if (error instanceof MissingContentError) {
            alert(error.message);
        } else {
            console.error('Error during file processing:', error);
            alert('An error occurred while processing the files. Please try again.');
        }
        // Reset all inputs
        resetDisplay(true);
    }
});

// Download files when the button is clicked
downloadButton.addEventListener('click', function () {
    try {
        const blob = new Blob([filteredHtml], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'filtered_following.html';
        link.click();
    } catch (error) {
        console.error('Error during file download:', error);
        alert('An error occurred while downloading the files. Please try again.');
        // Reset all inputs
        resetDisplay(true);
    }
});
