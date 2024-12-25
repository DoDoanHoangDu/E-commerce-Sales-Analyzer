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

export function parseInput(input, index = null) {
    try {
        let parts = input.trim().split(" ");
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

window.parseTime = parseTime;
window.parseInput = parseTime;