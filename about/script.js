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
const query = getUrlQueries();
if (query.lang) {
    if (query.lang === "ja") {
        fetch("https://tomocraft.github.io/lang.json")
            .then(response => response.json())
            .then(lang => {
                const element = document.getElementById("first-intro");
                element.textContent = lang.ja_JP["tomocraft.description"];
            })
            .catch(error => {
                console.log(error);
            });
    }
}