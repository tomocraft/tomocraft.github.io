"use strict";

const isJa = window.location.pathname.startsWith('/ja');

fetch('https://www.tomocraft.com/notifications.json')
    .then(response => response.json())
    .then(notifications => {
        const trans = {
            "Check MCBE Command Site has been released!": "Check MCBE Command サイトが公開されました！",
            "Chinese Dance Addon has been released!": "チャイニーズダンスアドオンが公開されました！",
            "Maze Wars World has been released!": "Maze Wars Worldが公開されました！",
            "Survival Wars World has been released!": "Survival Wars Worldが公開されました！",
            "Bedwars World has been released!": "Bedwars Worldが公開されました！",
            "Mirror Addon has been released!": "Mirror Addonが公開されました！",
            "The site has been published!": "サイトが公開されました！",
            "RP encryption tool has been released!": "RP暗号化ツールが公開されました！",
            "Show Health Addon has been released!": "Show Health Addonが公開されました！"
        };

        for (let i = 0; i < 3; i++) {
            const notification = notifications[i];
            const image = notification.image;
            const date = notification.date;

            let text = notification.text;
            if (isJa && trans[text]) {
                text = trans[text];
            }

            let url = notification.url;
            if (url.startsWith('./')) {
                url = isJa ? url.replace('./', '/ja/') : url.replace('./', '/en/');
            }

            // Adjust image path for root scripts when called from subdirectories
            let imgSource = image;
            if (!imgSource.startsWith('http') && !imgSource.startsWith('/')) {
                imgSource = '/' + imgSource;
            }

            document.getElementById(`notice-${i + 1}`).href = url;
            document.getElementById(`notice-text-${i + 1}`).textContent = text;
            document.getElementById(`notice-date-${i + 1}`).textContent = date;
            document.getElementById(`notice-img-${i + 1}`).src = imgSource;
        }
    })
    .catch(error => {
        console.error('Error fetching JSON file:', error);
    });

const topImgs = ["/images/top_1.webp", "/images/top_2.webp", "/images/top_3.webp", "/images/top_4.webp"];
const randomIndex = Math.floor(Math.random() * topImgs.length);
document.getElementById("topImg").src = topImgs[randomIndex];

const topTexts = isJa
    ? ["\"アイデアを形作る\"", "\"柔軟な想像と創造を\"", "\"アイデアを実現する\""]
    : ["\"Shaping ideas\"", "\"Imagination & Creativity\"", "\"Realize ideas\""];
document.getElementById("topText").textContent = topTexts[Math.floor(Math.random() * topTexts.length)];