let couponCode = 'DHAMAKA500';
let timer = 300;
let discountedPrice = 1499;
let fullPrice = 4999;

let qrCodeTimerText = document.getElementById('qr-code-timer');

const userPhone = "9876543210"; // Replace with user input
const paystring = `upi://pay?pa=9801907094@okbizaxis&am=${discountedPrice}&tn=${userPhone}`;
const qrCodeURL = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(paystring)}`;
document.getElementById('qr-code').src = qrCodeURL;

function startTime() {
    const interval = setInterval(() => {
        let minutes = Math.floor(timer/60);
        let seconds = timer % 60;

        qrCodeTimerText.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`

        timer--;

        if(timer < 0) {
            clearInterval(interval);
            //----------------------------------
        }
    }, 1000);
}

startTime();