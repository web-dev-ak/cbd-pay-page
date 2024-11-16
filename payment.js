let couponCode = 'DHAMAKA500';
let timer = 300;
let price = 1499;

const userPhone = "9876543210"; // Replace with user input
const paystring = `upi://pay?pa=9801907094@okbizaxis&am=${price}&tn=${userPhone}`;
const qrCodeURL = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(paystring)}`;
document.getElementById('qr-code').src = qrCodeURL;
