const fullInputBox = document.querySelector('.full-input');
fullInputBox.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        console.log("pr");
        document.getElementById("addBtn").click();
    }
});


const shopInfoInputBoxes = document.querySelectorAll('.shop-info-input');
for (let inputBox of shopInfoInputBoxes) {
    inputBox.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            console.log("pr");
            document.getElementById("getShopInfo").click();
        }
    });
}

const timeInputBoxes = document.querySelectorAll('.time-input');
for (let inputBox of timeInputBoxes) {
    inputBox.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            console.log("pr");
            document.getElementById("totalRevenueInPeriod").click();
        }
        
    });
}
