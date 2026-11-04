
document.addEventListener("DOMContentLoaded", function () {

    // Get the form elements
    const form = document.querySelector("#registration-form");
    const fullNameInput = document.querySelector("#full-name");
    const emailInput = document.querySelector("#email");
    const githubInput = document.querySelector("#github-username");
    const avatarInput = document.querySelector("#avatar-upload");

    // Get the avatar upload elements
    const uploadArea = document.querySelector("#upload-area");
    const uploadIcon = document.querySelector("#upload-icon");
    const avatarPreview = document.querySelector("#avatar-preview");
    const uploadInstruction = document.querySelector("#upload-instruction");
    const uploadActions = document.querySelector("#upload-actions");

    // Get the avatar buttons
    const chooseAvatarButton = document.querySelector("#choose-avatar");
    const changeAvatarButton = document.querySelector("#change-avatar");
    const removeAvatarButton = document.querySelector("#remove-avatar");

    // Set the maximum avatar file size to 500KB
    const MAX_FILE_SIZE = 500 * 1024;

    // Regular expressions for form validation
    const namePattern =
        /^[\p{L}]+(?:[ '\u2019-][\p{L}]+)*$/u;

    const emailPattern =
        /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

    const githubPattern =
        /^@[A-Za-z0-9](?:[A-Za-z0-9-]{0,37}[A-Za-z0-9])?$/;

    let selectedAvatarData = "";
    let selectedAvatarName = "";

    // Hide avatar preview and action buttons initially
    avatarPreview.hidden = true;
    uploadActions.hidden = true;


    // Display an error message
    function showError(input, errorId, message) {

        const errorElement = document.querySelector("#" + errorId);

        errorElement.textContent = message;

        input.setAttribute("aria-invalid", "true");
        input.classList.add("input-error");
    }


    // Clear an error message
    function clearError(input, errorId) {

        const errorElement = document.querySelector("#" + errorId);

        errorElement.textContent = "";

        input.removeAttribute("aria-invalid");
        input.classList.remove("input-error");
    }


    // Reset the avatar preview
    function resetAvatarPreview() {

        selectedAvatarData = "";
        selectedAvatarName = "";

        avatarInput.value = "";

        avatarPreview.removeAttribute("src");
        avatarPreview.hidden = true;

        uploadIcon.hidden = false;
        uploadInstruction.hidden = false;
        uploadActions.hidden = true;

        uploadArea.classList.remove("upload-invalid");
    }


    // Validate the selected avatar file
    function validateAvatarFile(file) {

        const avatarError = document.querySelector("#avatar-error");

        avatarError.textContent = "";
        uploadArea.classList.remove("upload-invalid");

        resetAvatarPreview();

        if (!file) {
            return;
        }

        // Only allow JPEG and PNG images
        const allowedTypes = ["image/jpeg", "image/png"];

        if (!allowedTypes.includes(file.type)) {

            avatarError.textContent =
                "Only JPG and PNG image files are accepted.";

            uploadArea.classList.add("upload-invalid");
            return;
        }

        // Check that the image is smaller than 500KB
        if (file.size >= MAX_FILE_SIZE) {

            avatarError.textContent =
                "Your image must be smaller than 500KB.";

            uploadArea.classList.add("upload-invalid");
            return;
        }

        // Read the selected image
        const reader = new FileReader();

        reader.onload = function () {

            selectedAvatarData = reader.result;
            selectedAvatarName = file.name;

            avatarPreview.src = selectedAvatarData;
            avatarPreview.hidden = false;

            uploadIcon.hidden = true;
            uploadInstruction.hidden = true;
            uploadActions.hidden = false;

            uploadArea.classList.remove("upload-invalid");
        };

        reader.onerror = function () {

            avatarError.textContent =
                "The image could not be read. Please choose another file.";

            resetAvatarPreview();
            uploadArea.classList.add("upload-invalid");
        };

        reader.readAsDataURL(file);
    }


    // Handle avatar file selection
    avatarInput.addEventListener("change", function () {

        const file = avatarInput.files[0];

        if (file) {
            validateAvatarFile(file);
        }
    });


    // Open the file selection window
    chooseAvatarButton.addEventListener("click", function (event) {

        event.preventDefault();
        avatarInput.click();
    });


    // Change the selected avatar
    changeAvatarButton.addEventListener("click", function (event) {

        event.preventDefault();
        avatarInput.click();
    });


    // Remove the selected avatar
    removeAvatarButton.addEventListener("click", function (event) {

        event.preventDefault();

        resetAvatarPreview();

        document.querySelector("#avatar-error").textContent = "";
    });


    // Handle drag over the upload area
    uploadArea.addEventListener("dragover", function (event) {

        event.preventDefault();

        uploadArea.classList.add("drag-over");
    });


    // Remove the drag-over effect
    uploadArea.addEventListener("dragleave", function () {

        uploadArea.classList.remove("drag-over");
    });


    // Handle dropping an image into the upload area
    uploadArea.addEventListener("drop", function (event) {

        event.preventDefault();

        uploadArea.classList.remove("drag-over");

        const file = event.dataTransfer.files[0];

        if (file) {

            const transfer = new DataTransfer();

            transfer.items.add(file);

            avatarInput.files = transfer.files;

            validateAvatarFile(file);
        }
    });


    // Validate the full name while typing
    fullNameInput.addEventListener("input", function () {

        if (namePattern.test(fullNameInput.value.trim())) {

            clearError(fullNameInput, "name-error");
        }
    });


    // Validate the email while typing
    emailInput.addEventListener("input", function () {

        if (emailPattern.test(emailInput.value.trim())) {

            clearError(emailInput, "email-error");
        }
    });


    // Validate the GitHub username while typing
    githubInput.addEventListener("input", function () {

        if (githubPattern.test(githubInput.value.trim())) {

            clearError(githubInput, "github-error");
        }
    });


    // Handle form submission
    form.addEventListener("submit", function (event) {

        event.preventDefault();

        let isValid = true;


        // FULL NAME VALIDATION
        if (fullNameInput.value.trim() === "") {

            showError(
                fullNameInput,
                "name-error",
                "Please enter your full name."
            );

            isValid = false;

        } else if (!namePattern.test(fullNameInput.value.trim())) {

            showError(
                fullNameInput,
                "name-error",
                "Your name can only contain letters, spaces, hyphens and apostrophes."
            );

            isValid = false;

        } else {

            clearError(fullNameInput, "name-error");
        }


        // EMAIL VALIDATION
        if (!emailPattern.test(emailInput.value.trim())) {

            showError(
                emailInput,
                "email-error",
                "Enter a valid email address, such as name@example.com."
            );

            isValid = false;

        } else {

            clearError(emailInput, "email-error");
        }


        // GITHUB USERNAME VALIDATION
        if (!githubPattern.test(githubInput.value.trim())) {

            showError(
                githubInput,
                "github-error",
                "Enter a GitHub username beginning with @ (letters, numbers or hyphens only)."
            );

            isValid = false;

        } else {

            clearError(githubInput, "github-error");
        }


        // AVATAR VALIDATION
        if (!selectedAvatarData) {

            document.querySelector("#avatar-error").textContent =
                "Please upload a JPG or PNG avatar smaller than 500KB.";

            uploadArea.classList.add("upload-invalid");

            isValid = false;
        }


        // Stop submission if any validation fails
        if (!isValid) {

            const firstInvalid =
                form.querySelector("[aria-invalid='true']") || fullNameInput;

            firstInvalid.focus();

            return;
        }


        // Store attendee information
        const attendee = {

            fullName: fullNameInput.value.trim(),

            email: emailInput.value.trim(),

            githubUsername: githubInput.value.trim(),

            avatar: selectedAvatarData,

            avatarName: selectedAvatarName,

            ticketNumber:
                "#" + String(Math.floor(10000 + Math.random() * 90000))
        };


        // Save registration information in localStorage
        try {

            localStorage.setItem(
                "codingConfAttendee",
                JSON.stringify(attendee)
            );

            // Redirect to the ticket page
            window.location.href = "ticket.html";

        } catch (error) {

            document.querySelector("#avatar-error").textContent =
                "Your browser could not save this ticket. Please use a smaller image or clear some browser storage and try again.";
        }

    });

});
