export class Shop {
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
export const allOrdersArray = [];
export let calculated = false;

export function setCalculated(value) {
    calculated = value;
}

export function getCalculated() {
    return calculated;
}

window.setCalculated = setCalculated;
window.getCalculated = getCalculated;
