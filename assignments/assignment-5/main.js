window.onload = setupFunction;

var postCount = 0;

function setupFunction() {
    document.getElementById("top").innerText = "Welcome to the Forum";

    let buttons = document.getElementsByTagName("button");
    buttons[0].onclick = postFunction;
    buttons[1].onclick = clearFunction;
}

function postFunction() {
    let messageText = document.getElementById("message").value;

    if (messageText.trim() === "") {
        return;
    }

    if (postCount === 0) {
        document.getElementById("topic").innerText = messageText; 
        postCount++;
    } else if (postCount === 1) {
        document.getElementById("reply1").innerText = messageText; 
        postCount++;
    } else if (postCount === 2) {
        document.getElementById("reply2").innerText = messageText; 
        postCount++;
    }

    document.getElementById("message").value = "";
}

function clearFunction() {
    document.getElementById("topic").innerText = "";
    document.getElementById("reply1").innerText = "";
    document.getElementById("reply2").innerText = "";

    document.getElementById("message").value = "";

    postCount = 0;
}
