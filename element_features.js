document.addEventListener("DOMContentLoaded", () => {
    const headers = document.querySelectorAll(".data-table th");
    const tbody = document.querySelector(".data-table tbody");

    headers.forEach((header, index) => {
        header.addEventListener('click', () => {
            const rows = Array.from(tbody.querySelectorAll('tr'));
            const type = header.getAttribute('data-type');
            const isAscending = header.classList.toggle('asc');

            rows.sort((rowA, rowB) => {
                const cellA = rowA.cells[index].textContent.trim();
                const cellB = rowB.cells[index].textContent.trim();

                if (type === 'number') {
                    return isAscending ? cellA - cellB : cellB - cellA;
                } else {
                    return isAscending
                        ? cellA.localeCompare(cellB)
                        : cellB.localeCompare(cellA);
                }
            });
            rows.forEach(row => tbody.appendChild(row));
        });
    });
});

const shopInfoInputBox = document.querySelector('.shop-info-input');
shopInfoInputBox.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        console.log("pr");
        document.getElementById("getShopInfo").click();
    }
});

const timeInputBox = document.querySelector('.time-input');
timeInputBox.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        console.log("pr");
        document.getElementById("totalRevenueInPeriod").click();
    }
});