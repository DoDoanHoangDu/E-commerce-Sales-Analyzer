import {timeMoneyMap, shopMap,allShop } from "./global_variables.js"
import { parseTime } from "./parsing.js";


let allTimeSpots = [];
let prefixSum = [];

function binarySearch(arr, target) {
    let low = 0;
    let high = arr.length - 1;
    
    while (low <= high) {
        let mid = Math.floor((low + high) / 2);
        if (arr[mid] === target) {
            return mid;
        } else if (arr[mid] < target) {
            low = mid + 1;
        } else {
            high = mid - 1;
        }
    }
    return -(low + 1);
}

export function getTotalInfo() {
    document.querySelector('.total-info').innerHTML = allShop.getInfo();
}

export function getShopInfo() {
    let shopId = document.querySelector(".shopID-input").value.trim();
    let customerId = document.querySelector(".customerID-input").value.trim();
    let shop = shopMap.get(shopId);
    
    let text = "No such shop.";
    if (shop) {
        if (customerId === "") {
        text = shop.getInfo();
        } else {
            text = shop.getCustomerInfo(customerId);
        }
    }
    document.querySelector('.specific-info').innerHTML = text;
}

export function totalRevenueInPeriod() {
    if (!getCalculated()) {
        allTimeSpots = Array.from(timeMoneyMap.keys()).sort((a, b) => a - b);
        prefixSum = new Array(allTimeSpots.length + 1).fill(0);
        for (let i = 0; i < allTimeSpots.length; i++) {
            const time = allTimeSpots[i];
            prefixSum[i + 1] = prefixSum[i] + timeMoneyMap.get(time);
        }
        setCalculated(true);
    }
    try {
        let totalRevenue = 0;
        let start = Number.parseInt(parseTime(document.querySelector(".start-time-input").value.trim()));
        let end = Number.parseInt(parseTime(document.querySelector(".end-time-input").value.trim()));
        if (end >= start) {
        let startIndex = binarySearch(allTimeSpots, start);
        let endIndex = binarySearch(allTimeSpots, end);
        startIndex = startIndex < 0 ? -(startIndex + 1) : startIndex;
        endIndex = endIndex < 0 ? -(endIndex + 1) : endIndex + 1;
        totalRevenue = prefixSum[endIndex] - prefixSum[startIndex];
    }
    document.querySelector('.in-period-info').innerHTML = `Revenue: ${totalRevenue}`;
    } catch (error) {
        document.querySelector('.in-period-info').innerHTML = error;
    }
}

window.getTotalInfo = getTotalInfo;
window.getShopInfo = getShopInfo;
window.totalRevenueInPeriod = totalRevenueInPeriod;