const courseBuyBtn = document.getElementById("course-buy-btn");
const page1 = document.getElementById("page-1");
const page2 = document.getElementById("page-2");
const body = document.querySelector("body");
const payBackBtn = document.getElementById("pay-page-back-btn");
const userInfoInputForm1 = document.getElementById("user-info-input");
const qrCodeBox = document.querySelector(".qr-code-box");
const upiAppsLogoBox = document.querySelector(".upi-apps-logos-box");
const paymentInstructionBox = document.querySelector(".payment-ins-box");
const qrCodeTimerText = document.getElementById("qr-code-timer");
const couponCodeInputBox = document.getElementById("coupon-code-input");
const couponCodeInputBtn = document.getElementById("coupon-code-apply-btn");
const couponCodeAppliedMsg = document.getElementById('coupon-code-apply-msg');
const discountedCoursePriceText = document.getElementById("course-price");
const originalCoursePriceText = document.getElementById("course-discount-price");
const courseDiscountPercentageText = document.getElementById("course-discount-percentage");

let timer = 300;
let timerRunning = false;
let fullPrice = 4999;
let discountPercentage = 40;
let couponCode = "DHAMAKA500";
let couponCodeDiscount = 500;
let price = calculatePrice(fullPrice, discountPercentage);
let couponApplied = false;

courseBuyBtn.addEventListener("click", () => {
    elementVisibility(page1, "none");
    elementVisibility(page2, "flex");
    body.style.padding = "20px";
    localStorage.setItem("currentPage", "page2");
});

payBackBtn.addEventListener("click", () => {
    elementVisibility(page1, "flex");
    elementVisibility(page2, "none");
    body.style.padding = "120px 20px";
    localStorage.setItem("currentPage", "page1");
});

document.addEventListener("DOMContentLoaded", () => {
    let savedPage = localStorage.getItem("currentPage");
    if (savedPage === "page2") {
        elementVisibility(page1, "none");
        elementVisibility(page2, "flex");
        body.style.padding = "20px";
    } else {
        elementVisibility(page1, "flex");
        elementVisibility(page2, "none");
    }
    updatePriceDisplay();
});

function calculatePrice(fullPrice, discountPercentage) {
    let discount = (fullPrice * discountPercentage) / 100;
    return Math.round(fullPrice - discount);
}

function applyCouponCode() {
    if (couponApplied) {
        alert("Coupon has already been applied!");
        return;
    }
    if (couponCodeInputBox.value.toUpperCase() === couponCode) {
        price -= couponCodeDiscount;
        couponApplied = true;
        couponCodeInputBtn.disabled = true; // Disable button
        // alert("Coupon applied successfully! ₹500 discount added.");
        updatePriceDisplay();
        couponCodeAppliedMsg.textContent = `Boom! 🎉 ${couponCode} is applied! Happy savings! 🤑🥳`;
        couponCodeAppliedMsg.style.color = '#79B058';
        couponCodeInputBtn.style.backgroundColor = 'grey';
    } else {
        // alert("Invalid coupon code!");
        couponCodeAppliedMsg.textContent = `Oops! 🚨 '${couponCodeInputBox.value}' isn’t valid. Try Again! 🔄😉`;
        couponCodeAppliedMsg.style.color = 'red';
    }
}

couponCodeInputBtn.addEventListener("click", applyCouponCode);

function updatePriceDisplay() {
    discountedCoursePriceText.textContent = `₹${price}`;
    originalCoursePriceText.textContent = `₹${fullPrice}`;
    courseDiscountPercentageText.textContent = `-${discountPercentage}%`;
}

function elementVisibility(element, visibility) {
    element.style.display = visibility;
}

userInfoInputForm1.addEventListener("submit", function (e) {
    e.preventDefault();
    let name = document.getElementById("input-name").value;
    let mobile = document.getElementById("input-number").value;
    let data = { name, mobile };
    let URL = 'https://script.google.com/macros/s/AKfycbx4AzXBrmt63EVX-N2_4_StltQaUWOnUSVjiUmVIIgEqaRvkuF-GHBr0rlgEj2QgMVy/exec'

    fetch(URL, {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
        mode: "no-cors"
    })
        .then((response) => response.text())
        .then((data) => {
            alert("Data saved! Generating QR Code...");
            generateQRCode(mobile);
            elementVisibility(userInfoInputForm1, "none");
            elementVisibility(qrCodeBox, "flex");
            elementVisibility(upiAppsLogoBox, "flex");
            elementVisibility(paymentInstructionBox, "flex");
            if (!timerRunning) {
                startTime();
            }
        })
        .catch((error) => console.error("Error:", error));
});

function generateQRCode(userPhone) {
    const paystring = `upi://pay?pa=9801907094@okbizaxis&am=${price}&tn=${userPhone}`;
    const qrCodeURL = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(paystring)}`;
    document.getElementById("qr-code").src = qrCodeURL;
}

function startTime() {
    if (timerRunning) return;
    timerRunning = true;
    const interval = setInterval(() => {
        let minutes = Math.floor(timer / 60);
        let seconds = timer % 60;
        qrCodeTimerText.textContent = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
        timer--;
        if (timer < 0) {
            clearInterval(interval);
            timerRunning = false;
            alert('If you are getting any problem or need any help! CONTACT US')
        }
    }, 1000);
}
