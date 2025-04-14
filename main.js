document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const cookie = document.getElementById('cookie').value;

    // Store the cookie securely
    localStorage.setItem('robloxCookie', cookie);

    // Show the post section
    document.getElementById('postSection').style.display = 'block';
    document.getElementById('loginSection').style.display = 'none';
});

document.getElementById('postForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const groupLink = document.getElementById('link').value;
    const message = document.getElementById('message').value;
    const cookie = localStorage.getItem('robloxCookie');

    // Call the function to post the message
    postToGroupWall(groupLink, message, cookie);
});

async function postToGroupWall(groupLink, message, cookie) {
    const groupId = extractGroupIdFromLink(groupLink); // Extract group ID from the link

    if (!groupId) {
        document.getElementById('status').textContent = 'Invalid group link.';
        return;
    }

    const response = await fetch(`https://groups.roblox.com/v1/groups/${groupId}/wall/posts`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Cookie': `.ROBLOSECURITY=${cookie}` // Use the cookie for authentication
        },
        body: JSON.stringify({
            message: message
        })
    });

    const result = await response.json();
    const statusDiv = document.getElementById('status');

    if (response.ok) {
        statusDiv.textContent = 'Post successful!';
    } else {
        statusDiv.textContent = `Error: ${result.message}`;
    }
}

function extractGroupIdFromLink(link) {
    // Extract the group ID from the provided link
    const match = link.match(/groups\/(\d+)/);
    return match ? match[1] : null;
}
