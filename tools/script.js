"use strict";
fetch("https://tomocraft.github.io/tools/tools.json")
    .then(response => response.json())
    .then(projects => {
        const projectContents = document.getElementById("project-contents");
        for (const data of projects) {
            if (query_1.lang === "ja") {
                const linkElement = document.createElement('a');
                linkElement.href = data.url;
                const imgElement = document.createElement('img');
                imgElement.src = data.image;
                linkElement.appendChild(imgElement);
                const divElement = document.createElement('div');
                const titleElement = document.createElement('h3');
                titleElement.className = 'title';
                titleElement.textContent = `${data.text_ja} `;
                const dateElement = document.createElement('span');
                dateElement.className = 'date';
                dateElement.textContent = data.date;
                titleElement.appendChild(dateElement);
                divElement.appendChild(titleElement);
                const descriptionElement = document.createElement('p');
                descriptionElement.className = 'description';
                descriptionElement.textContent = data.description_ja;
                divElement.appendChild(descriptionElement);
                linkElement.appendChild(divElement);
                projectContents.appendChild(linkElement);
            } else {
                const linkElement = document.createElement('a');
                linkElement.href = data.url;
                const imgElement = document.createElement('img');
                imgElement.src = data.image;
                linkElement.appendChild(imgElement);
                const divElement = document.createElement('div');
                const titleElement = document.createElement('h3');
                titleElement.className = 'title';
                titleElement.textContent = `${data.text} `;
                const dateElement = document.createElement('span');
                dateElement.className = 'date';
                dateElement.textContent = data.date;
                titleElement.appendChild(dateElement);
                divElement.appendChild(titleElement);
                const descriptionElement = document.createElement('p');
                descriptionElement.className = 'description';
                descriptionElement.textContent = data.description;
                divElement.appendChild(descriptionElement);
                linkElement.appendChild(divElement);
                projectContents.appendChild(linkElement);
            }
        }
    })
    .catch(error => {
        console.error('Error fetching JSON file:', error);
    });