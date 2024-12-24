class Shop {
    constructor() {
        this.customers = new Map();
        this.numOrders = 0;
        this.revenue = 0;
    }

    getInfo() {
        return `Number of Orders: ${this.numOrders}. Revenue: ${this.revenue}`
    }

    getCustomerInfo(cID) {
        let customerRevenue = this.customers.get(cID) ?? [0,0];
        return `Orders from Customer: ${customerRevenue[0]}. Revenue: ${customerRevenue[1]}`;
    }

    clear() {
        this.customers.clear();
        this.numOrders = 0;
        this.revenue = 0;
    }
}

export const timeMoneyMap = new Map();
export const shopMap = new Map();
export const allShop = new Shop();
export const allOrders = new Set();
export let calculated = false;

export function setCalculated(value) {
    calculated = value;
}

export function getCalculated() {
    return calculated;
}

function resetDisplay() {
    document.querySelector('.total-info').innerHTML = "";
    document.querySelector('.specific-info').innerHTML = "";
    document.querySelector('.in-period-info').innerHTML = "";
    
}

export function parseTime(timePoint) {
    let timeParts = timePoint.split(":");
    let h = parseInt(timeParts[0]);
    let m = parseInt(timeParts[1]);
    let sec = parseInt(timeParts[2]);
    if (Number.isNaN(h) || Number.isNaN(m) || Number.isNaN(sec)) {
        throw new Error("Invalid Time Input");
    }
    let timeKey = h * 10000 + m * 100 + sec;
    return timeKey;
}

function parseInput(input, index = null) {
    try {
        let parts = input.split(" ");
        let customerId = parts[0];
        let productId = parts[1];
        let price = parseInt(parts[2]);
        
        let shopId = parts[3];
        let timePoint = parts[4];
        let timeKey = parseTime(timePoint);
        return [customerId, productId, price, shopId, timeKey];
    } catch (error) {
        console.log(error);
        alert("Error Reading Data In Line: " + index + "\n" + error);
        return null;
    }
}

function addRecord(input, index = null) {
    try {
        let info = parseInput(input);
        if (Array.isArray(info)) {
            
            let customerId = info[0];
            let productId = info[1];
            let price = info[2];
            let shopId = info[3];
            let timeKey = info[4];

            if (Number.isNaN(price)) {
                throw new Error("Invalid Price Input");
            }

            let info_key = info.join(" ")
            if (!allOrders.has(info_key)) { 
                allOrders.add(info_key);
            } else {
                throw new Error("Duplicate Data Point.")
            }
            
            timeMoneyMap.set(timeKey, (timeMoneyMap.get(timeKey) || 0) + price);

            let shop = shopMap.get(shopId);
            if (!shop) {
                shop = new Shop();
                shopMap.set(shopId, shop);
            }
            shop.customers.set(
                customerId,
                [
                    (shop.customers.get(customerId)?.[0] || 0) + 1,
                    (shop.customers.get(customerId)?.[1] || 0) + price
                ]
            );
            shop.numOrders++;
            shop.revenue += price;

            allShop.numOrders++;
            allShop.revenue += price;

            calculated = false;

            resetDisplay();

            console.log(timeMoneyMap);
            console.log(shopMap);
            console.log(allShop);
            console.log(allOrders);
            console.log("----------------------------------------------");
            return true;
            
        }
    } catch (error) {
        console.log(error);
        alert("Error Adding Data In Line: " + index + "\n" + error);
        return false;
    }
}

function addRow(input) {
    input = input.split(" ");
    const rowData = {
        customerId: input[0],
        productId: input[1],
        price: input[2],
        shopId: input[3],
        time: input[4]
    };
    const tableBody = document.querySelector(".data-table tbody");
    const newRow = document.createElement("tr");
    newRow.innerHTML = `
                <td>${rowData.customerId}</td>
                <td>${rowData.productId}</td>
                <td>${rowData.price}</td>
                <td>${rowData.shopId}</td>
                <td>${rowData.time}</td>
            `;
    tableBody.appendChild(newRow);
}

export function addAllField() {
    let input = document.querySelector(".full-input").value.trim();
    if (addRecord(input)) {
        addRow(input);
    }
    
}

export function upLoad() {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = '.txt'

    fileInput.addEventListener('change', (event) => {
        const file = event.target.files[0];
        if (!file) {
            console.log("No file selected");
            return;
        }
        const reader = new FileReader();
        reader.onload = (e) => {
            const content = e.target.result;
            const lines = content.split(/\r?\n/);
            lines.forEach((line, index) => {
                if (line.trim()) {
                    if (addRecord(line,index+1)) {
                        addRow(line);
                    }
                } else {
                    console.log(`Skipping empty line ${index + 1}`);
                }
            });
            alert("Adding completed.");
        };

        reader.onerror = () => {
            console.error("Failed to read file");
        };
        reader.readAsText(file);
    });
    fileInput.click();
}

export function resetData() {
    timeMoneyMap.clear();
    shopMap.clear();
    allShop.clear();
    allOrders.clear(); 
    resetDisplay();
    const tableBody = document.querySelector(".data-table tbody");
    tableBody.innerHTML = "";
    calculated = false;
}

window.parseTime = parseTime;
window.addAllField = addAllField;
window.upLoad = upLoad;
window.resetData = resetData;
window.setCalculated = setCalculated;
window.getCalculated = getCalculated