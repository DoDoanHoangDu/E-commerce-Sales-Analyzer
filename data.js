import { parseInput } from "./parsing.js";
import {timeMoneyMap, shopMap,allShop, allOrders,allOrdersArray, Shop } from "./global_variables.js"
import { renderTable,renderPagination } from "./table_functions.js";

///Reset all data and display
function resetDisplay() {
    document.querySelector('.total-info').innerHTML = "";
    document.querySelector('.specific-info').innerHTML = "";
    document.querySelector('.in-period-info').innerHTML = "";
}

export function resetData() {
    timeMoneyMap.clear();
    shopMap.clear();
    allShop.clear();
    allOrders.clear(); 
    allOrdersArray.length = 0;
    resetDisplay();
    const tableBody = document.querySelector(".data-table tbody");
    tableBody.innerHTML = "";
    const pagination = document.querySelector(".pagination");
    pagination.innerHTML = "";
    setCalculated(false);
}

///Adding 1 row/record of data 
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
            if (!allOrders.has(input)) { 
                allOrders.add(input);
                input = input.split(" ");
                input[2] = parseInt(input[2]);
                allOrdersArray.push(input);
            } else {
                console.log("Duplicate Data Point.");
                return false;
            }
            timeMoneyMap.set(timeKey, (timeMoneyMap.get(timeKey) || 0) + price);
            let shop = shopMap.get(shopId);
            if (!shop) {
                shop = new Shop();
                shopMap.set(shopId, shop);
            }
            shop.customers.set(
                customerId,
                [(shop.customers.get(customerId)?.[0] || 0) + 1, (shop.customers.get(customerId)?.[1] || 0) + price]
            );
            shop.numOrders++;
            shop.revenue += price;
            allShop.numOrders++;
            allShop.revenue += price;
            setCalculated(false);
            resetDisplay();
            return true;
            
        }
    } catch (error) {
        console.log(error);
        alert("Error Adding Data In Line: " + index + "\n" + error);
        return false;
    }
}

///Add button pressed
export function addAllField() {
    let input = document.querySelector(".full-input").value.trim();
    if (addRecord(input)) {
        renderTable();
        renderPagination();
    }
    
}

///Upload data file
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
                        renderTable();
                        renderPagination();
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

window.addAllField = addAllField;
window.upLoad = upLoad;
window.resetData = resetData;