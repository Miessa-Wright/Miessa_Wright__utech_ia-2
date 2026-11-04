
document.addEventListener("DOMContentLoaded", function () {
    const savedAttendee = localStorage.getItem("codingConfAttendee");
    if (!savedAttendee) {
        window.location.replace("index.html");
        return;
    }

    let attendee;
    try {
        attendee = JSON.parse(savedAttendee);
    } catch (error) {
        localStorage.removeItem("codingConfAttendee");
        window.location.replace("index.html");
        return;
    }
    if (!attendee.fullName || !attendee.email || !attendee.githubUsername || !attendee.avatar || !attendee.ticketNumber) {
        localStorage.removeItem("codingConfAttendee");
        window.location.replace("index.html");
        return;
    }
    const githubHandle = attendee.githubUsername.replace(/^@/, "");
    const githubLink = document.querySelector("#ticket-github");
    document.querySelector("#confirmed-name").textContent = attendee.fullName;
    document.querySelector("#ticket-name").textContent = attendee.fullName;
    document.querySelector("#ticket-github-text").textContent = "@" + githubHandle;
    document.querySelector("#ticket-avatar").src = attendee.avatar;
    document.querySelector("#ticket-number").textContent = attendee.ticketNumber;

    githubLink.href = "https://github.com/" + encodeURIComponent(githubHandle);
    document.querySelector("#print-ticket").addEventListener("click", function () {
        window.print();
    });
});
