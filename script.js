

experience.addEventListener("input", (event) => {
    let yearsOf = experience.value;
    if (yearsOf > 49) { yearsOf = yearsOf + "+" }
    years.innerHTML = yearsOf;
});

cardNum.addEventListener("input", function () {
    // Remove any non-numeric characters
    this.value = this.value.replace(/[^0-9]/g, '');
});

cvv.addEventListener("input", function (event) {
    // Remove any non-numeric characters
    this.value = this.value.replace(/[^0-9]/g, '');
});


document.addEventListener("DOMContentLoaded", () => {
    let currentTab = 0; // Set the initial tab to display
    showTab(currentTab); // Display the current tab

    function showTab(n) {
        const tabs = document.getElementsByClassName("tab");

        // Hide all tabs initially
        for (let i = 0; i < tabs.length; i++) {
            tabs[i].style.display = "none";
        }

        // Show the selected tab
        tabs[n].style.display = "block";

        // Control the visibility of navigation buttons
        const prevBtn = tabs[n].querySelector(".prevBtn");
        const nextBtn = tabs[n].querySelector(".nextBtn");

        if (prevBtn) prevBtn.style.display = n === 0 ? "none" : "inline";
        if (nextBtn) nextBtn.innerHTML = n === (tabs.length - 1) ? "Submit" : "Next";

        fixStepIndicator(n);
    }

    function nextPrev(n) {
        const tabs = document.getElementsByClassName("tab");

        if (n === 1 && !validateForm()) return false;

        tabs[currentTab].style.display = "none";
        currentTab += n;

        if (currentTab >= tabs.length) {
            // Show thank you message instead of submitting
            showThankYouMessage();
            return false;
        }

        showTab(currentTab);
    }

    function showThankYouMessage() {
        // Hide the entire form
        document.getElementById("regForm").style.display = "none"; // Change from "form" to "regForm"
        
        // Show the thank you message
        const thankYouMessage = document.getElementById("thankYouMessage");
        thankYouMessage.style.display = "block";
    }

    function validateForm() {
        let valid = true;
        const currentTabElements = document.getElementsByClassName("tab")[currentTab];
        const inputs = currentTabElements.getElementsByTagName("input");
        const selects = currentTabElements.getElementsByTagName("select");
        const ranges = currentTabElements.querySelectorAll('input[type="range"]');
    
        // Validate input fields (except range inputs)
        for (let i = 0; i < inputs.length; i++) {
            if (inputs[i].type !== "range" && inputs[i].value === "") {
                inputs[i].classList.add("invalid");
                inputs[i].setCustomValidity("Please fill in this field");
                valid = false;
            } else {
                inputs[i].classList.remove("invalid");
                inputs[i].setCustomValidity("");
            }
    
            // Show validation error if present
            inputs[i].reportValidity();
        }
    
        // Validate select fields
        for (let i = 0; i < selects.length; i++) {
            if (selects[i].value === "") {
                selects[i].classList.add("invalid");
                selects[i].setCustomValidity("Please select an option");
                valid = false;
            } else {
                selects[i].classList.remove("invalid");
                selects[i].setCustomValidity("");
            }
    
            // Show validation error if present
            selects[i].reportValidity();
        }
    
        // Validate range inputs to ensure they've been moved from the minimum value
        for (let range of ranges) {
            if (range.value === range.min) { // assumes default value is the minimum
                range.classList.add("invalid");
                range.setCustomValidity("Please adjust this slider");
                valid = false;
            } else {
                range.classList.remove("invalid");
                range.setCustomValidity("");
            }
    
            // Show validation error if present
            range.reportValidity();
        }
    
        // Validate terms and conditions checkbox (only on final tab)
        if (currentTab === 2) { // assuming the checkbox is on the last (3rd) tab
            const agreementCheckbox = document.getElementById("agreement");
            if (!agreementCheckbox.checked) {
                agreementCheckbox.classList.add("invalid");
                agreementCheckbox.setCustomValidity("Please accept terms and conditions");
                valid = false;
            } else {
                agreementCheckbox.classList.remove("invalid");
                agreementCheckbox.setCustomValidity("");
            }
    
            // Show validation error if present
            agreementCheckbox.reportValidity();
        }
    
        return valid;
    }
    

    

    function fixStepIndicator(n) {
        const steps = document.getElementsByClassName("step");
        for (let i = 0; i < steps.length; i++) {
            steps[i].className = steps[i].className.replace(" active", "");
        }
        steps[n].className += " active";
    }

    // Attach event listeners to buttons
    const nextButtons = document.getElementsByClassName("nextBtn");
    const prevButtons = document.getElementsByClassName("prevBtn");

    for (let btn of nextButtons) {
        btn.addEventListener("click", () => nextPrev(1));
    }

    for (let btn of prevButtons) {
        btn.addEventListener("click", () => nextPrev(-1));
    }
});
