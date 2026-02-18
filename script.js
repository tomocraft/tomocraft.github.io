"use strict";
function getUrlQueries() {
    let queryStr = window.location.search.slice(1);
    let queries = {};
    if (!queryStr) {
        return queries;
    }
    queryStr.split('&').forEach(function (queryStr) {
        let queryArr = queryStr.split('=');
        queries[queryArr[0]] = queryArr[1];
    });
    return queries;
}
const query_2 = getUrlQueries();
if (query_2.lang) {
    if (query_2.lang === "ja") {
        fetch("https://www.tomocraft.tech/lang.json")
            .then(response => response.json())
            .then(lang => {
                const element = document.getElementById("home.disclaimer");
                element.textContent = lang.ja_JP["home.disclaimer"];
            })
            .catch(error => {
                console.log(error);
            });
    }
}
fetch('https://www.tomocraft.tech/notifications.json')
    .then(response => response.json())
    .then(notifications => {
        for (let i = 0; i < 3; i++) {
            const notification = notifications[i];
            const image = notification.image;
            const date = notification.date;
            const text = notification.text;
            const url = notification.url;
            document.getElementById(`notice-${i + 1}`).href = url;
            document.getElementById(`notice-text-${i + 1}`).textContent = text;
            document.getElementById(`notice-date-${i + 1}`).textContent = date;
            document.getElementById(`notice-img-${i + 1}`).src = image;
        }
    })
    .catch(error => {
        console.error('Error fetching JSON file:', error);
    });
const topImgs = ["images/top_1.webp", "images/top_2.webp", "images/top_3.webp", "images/top_4.webp"];
const randomIndex = Math.floor(Math.random() * topImgs.length);
if (randomIndex === 0 || randomIndex === 1 || randomIndex === 3) {
    document.querySelector(".hamburger").classList.add(["white"]);
}
document.getElementById("topImg").src = topImgs[randomIndex];
const topTexts = ["\"Shaping ideas\"", "\"Imagination & Creativity\"", "\"Realize ideas\""];
document.getElementById("topText").textContent = topTexts[Math.floor(Math.random() * topTexts.length)];