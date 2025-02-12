document.addEventListener('DOMContentLoaded', () => {
    const courseBuyBtn1 = document.getElementById('course-buy-btn');
    const payPageBackBtn = document.getElementById('pay-page-back-btn');

    if (courseBuyBtn1) {
        // BUY NOW BTN -> PAYMENT PAGE
        courseBuyBtn1.addEventListener('click', () => {
            window.location.href = 'pages/payment.html';
        });
    }

    if (payPageBackBtn) {
        // MAIN PAGE <- PAYMENT PAGE
        payPageBackBtn.addEventListener('click', () => {
            window.location.href = '../index.html';
        });
    }
});

// STATE MANAGEMENT

