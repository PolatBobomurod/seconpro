document.addEventListener("DOMContentLoaded", function() {
    let page = document.body.getAttribute("data-page");

    // **Reklama slayderi avtomatik almashtirish**
    let slides = document.querySelectorAll(".ad-slide");
    let currentSlide = 0;

    function changeSlide() {
        slides[currentSlide].classList.remove("active");
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].classList.add("active");
    }

    if (slides.length > 0) {
        slides[0].classList.add("active"); // Dastlab birinchi rasm ko‘rinadi
        setInterval(changeSlide, 10000); // 10 soniyada bitta reklama almashadi
    }

    // **Reklama bosilganda index.html sahifasiga yo‘naltirish**
    slides.forEach(slide => {
        slide.addEventListener("click", function() {
            window.location.href = "/html/main.html";
        });
    });

    // **Index sahifasi uchun funksiyalar**
    if (page === "index") {
        document.querySelectorAll(".almaz-option").forEach(item => {
            item.addEventListener("click", function() {
                let price = this.getAttribute("data-price");
                let name = this.getAttribute("data-name");

                localStorage.setItem("selectedAmount", price);
                localStorage.setItem("selectedName", name);

                window.location.href = "/html/id_entry.html";
            });
        });
    }

    // **ID kiritish sahifasi uchun funksiyalar**
    if (page === "id_entry") {
        let name = localStorage.getItem("selectedName");
        let amount = localStorage.getItem("selectedAmount");

        if (name && amount) {
            document.getElementById("almaz-info").textContent = name + " - " + amount + " so‘m";
        } else {
            document.getElementById("almaz-info").textContent = "Almaz tanlanmagan!";
        }

        document.getElementById("nextStep").addEventListener("click", function() {
            let userId = document.getElementById("userId").value;
            
            if (!userId) {
                alert("Iltimos, ID kiriting!");
                return;
            }

            localStorage.setItem("userId", userId);
            window.location.href = "/html/confirm.html";
        });
    }

    // **Tasdiqlash sahifasi uchun funksiyalar**
    if (page === "confirm") {
        let name = localStorage.getItem("selectedName");
        let amount = localStorage.getItem("selectedAmount");
        let userId = localStorage.getItem("userId");

        if (name && amount && userId) {
            document.getElementById("confirm-info").innerHTML = `
                <p><strong>Almaz:</strong> ${name}</p>
                <p><strong>ID:</strong> ${userId}</p>
                <p><strong>Narx:</strong> ${amount} so‘m</p>
            `;
        } else {
            document.getElementById("confirm-info").textContent = "Ma'lumotlar to‘liq emas!";
        }

        document.getElementById("payNow").addEventListener("click", function() {
            window.location.href = "payment.html";
        });
    }

    // **To‘lov sahifasi uchun funksiyalar**
    if (page === "payment") {
        let amount = localStorage.getItem("selectedAmount");

        if (amount) {
            document.getElementById("amount").textContent = amount + " so‘m";
        } else {
            document.getElementById("amount").textContent = "Summani tanlang";
        }

        document.getElementById("confirmPayment").addEventListener("click", function() {
            alert("To‘lov muvaffaqiyatli qabul qilindi!");
            localStorage.clear();
            window.location.href = "/html/main.html";
        });
    }
});
