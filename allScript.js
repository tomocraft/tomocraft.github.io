"use strict";
function getUrlQueries() {
    let queryStr = window.location.search.slice(1);
    let queries_1 = {};
    if (!queryStr) {
        return queries_1;
    }
    queryStr.split('&').forEach(function (queryStr) {
        let queryArr = queryStr.split('=');
        queries_1[queryArr[0]] = queryArr[1];
    });
    return queries_1;
}
const query_1 = getUrlQueries();
if (query_1.lang === "ja") {
    document.documentElement.lang = "ja";
    const elements = document.querySelectorAll("#move");
    for (const eleme of elements) {
        eleme.href = eleme.href + "?lang=ja";
    }
    const headElement = document.querySelector("head");
    const metaElements = headElement.querySelectorAll("meta");
    metaElements.forEach(function (metaElement) {
        if (metaElement.getAttribute("property") === "og:locale") {
            metaElement.setAttribute("content", "ja_JP");
        }
    });
}
if (query_1.lang) {
    if (query_1.lang === "ja") {
        fetch("https://tomocraft.github.io/lang.json")
            .then(response => response.json())
            .then(lang => {
                const elements = Array.from(document.body.querySelectorAll('*')).filter(element => lang.ja_JP[element.textContent]);
                for (const element of elements) {
                    try {
                        element.textContent = lang.ja_JP[element.textContent];
                    } catch (e) {
                    }
                }
                setTimeout(() => {
                    const elements = Array.from(document.body.querySelectorAll('*')).filter(element => lang.ja_JP[element.textContent]);
                    for (const element of elements) {
                        try {
                            element.textContent = lang.ja_JP[element.textContent];
                        } catch (e) {
                        }
                    }
                }, 1000);
            })
            .catch(error => {
                console.log(error);
            });
    }
}
document.addEventListener('DOMContentLoaded', function () {
    let open = false;
    const hamburgerButton = document.querySelector('.hamburger');
    const nav = document.querySelector('.nav');
    const headerContainer = document.querySelector('.header__container');
    const pageTop = document.querySelector('.page-top');
    hamburgerButton.addEventListener('click', function () {
        hamburgerButton.classList.toggle('open');
        nav.classList.toggle('open');
        if (open) {
            open = false;
            document.getElementsByTagName('html').item(0).style.overflow = 'unset';
        } else {
            open = true;
            setTimeout(() => {
                if (open) {
                    document.getElementsByTagName('html').item(0).style.overflow = 'hidden';
                }
            }, 500);
        }
    });
    window.addEventListener('scroll', function () {
        if (window.pageYOffset >= 50) {
            headerContainer.classList.remove('transparent');
            hamburgerButton.classList.add("black");
        } else {
            headerContainer.classList.add('transparent');
            hamburgerButton.classList.remove("black");
        }
        if (window.pageYOffset >= 200) {
            pageTop.style.display = "block";
            if (pageTop.style.opacity > 0) {
                pageTop.style.opacity = 0;
            }
            pageTop.style.opacity = 1;
        } else {
            pageTop.style.opacity = 0;
            this.setTimeout(() => {
                if (window.pageYOffset >= 200) return;
                pageTop.style.display = "none";
            }, 5000);
        }
    });
});