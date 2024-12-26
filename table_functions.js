import { allOrdersArray } from "./global_variables.js";

const rowsPerPage = 10;
let currentPage = 1;

export function renderTable(page = currentPage) {
    const tbody = document.querySelector('.data-table tbody');
    tbody.innerHTML = '';
    const startIndex = (page - 1) * rowsPerPage;
    const endIndex = Math.min(startIndex + rowsPerPage, allOrdersArray.length);

    for (let i = startIndex; i < endIndex; i++) {
        const row = document.createElement('tr');
        const rowData = allOrdersArray[i];
        row.innerHTML = `
            <td>${rowData[0]}</td>
            <td>${rowData[1]}</td>
            <td>${rowData[2]}</td>
            <td>${rowData[3]}</td>
            <td>${rowData[4]}</td>
        `;
        tbody.appendChild(row);
    }
}

export function renderPagination() {
    const pagination = document.querySelector('.pagination');
    pagination.innerHTML = '';
    const totalPages = Math.ceil(allOrdersArray.length / rowsPerPage);

    const firstButton = document.createElement('button');
    firstButton.innerText = "<<";
    firstButton.addEventListener('click', () => {
        currentPage = 1;
        renderTable(currentPage);
        renderPagination();
    });
    const prevButton = document.createElement('button');
    prevButton.disabled = (currentPage === 1);
    prevButton.innerText = "Previous";
    prevButton.addEventListener('click', () => {
        currentPage -= 1;
        renderTable(currentPage);
        renderPagination();
    });
    const button = document.createElement('button');
    button.disabled = true;
    button.innerText =  currentPage + "/" + totalPages;
    const nextButton = document.createElement('button');
    nextButton.disabled = (currentPage === totalPages);
    nextButton.innerText = "Next";
    nextButton.addEventListener('click', () => {
        currentPage += 1;
        renderTable(currentPage);
        renderPagination();
    });
    const lastButton = document.createElement('button');
    lastButton.innerText = ">>";
    lastButton.addEventListener('click', () => {
        currentPage = totalPages;
        renderTable(currentPage);
        renderPagination();
    });
    pagination.appendChild(firstButton);
    pagination.appendChild(prevButton);
    pagination.appendChild(button);
    pagination.appendChild(nextButton);
    pagination.appendChild(lastButton);
}

window.renderPagination = renderPagination;
window.renderTable = renderTable;


document.addEventListener("DOMContentLoaded", () => {
    const headers = document.querySelectorAll(".data-table th");
    const tbody = document.querySelector(".data-table tbody");

    headers.forEach((header, index) => {
        header.addEventListener('click', () => {
            const type = header.getAttribute('data-type');
            const isAscending = header.classList.toggle('asc');
            allOrdersArray.sort((a, b) => {
                const cellA = a[index];
                const cellB = b[index];

                if (type === 'number') {
                    return isAscending ? cellA - cellB : cellB - cellA;
                } else {
                    return isAscending
                        ? cellA.localeCompare(cellB)
                        : cellB.localeCompare(cellA);
                }
            });
            currentPage = 1
            renderTable(currentPage);
            renderPagination();
        });
    });
});

