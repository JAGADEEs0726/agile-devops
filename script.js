/* PAGE SWITCHING */
function show(id){
    document.querySelectorAll(".page").forEach(p=>{
        p.classList.remove("active");
    });
    document.getElementById(id).classList.add("active");
}



/* ================= STAFF MODULE ================= */

document.getElementById("staffForm").addEventListener("submit", function(e){

    e.preventDefault();

    let name = staffName.value;
    let phone = staffPhone.value;
    let role = staffRole.value;

    let table = document.getElementById("staffTable");

    let row = table.insertRow();

    row.innerHTML = `
        <td>${name}</td>
        <td>${phone}</td>
        <td>${role}</td>
        <td><span class="badge-active">Active</span></td>
        <td><button class="delete-btn" onclick="this.parentElement.parentElement.remove()">Delete</button></td>
    `;

    this.reset();
});



/* ================= INVENTORY MODULE ================= */

let totalItems = 0;
let lowItems = 0;
let totalValue = 0;

document.getElementById("inventoryForm").addEventListener("submit", function(e){

    e.preventDefault();

    let name = itemName.value;
    let qty = parseInt(itemQty.value);
    let min = parseInt(itemMin.value);
    let price = parseInt(itemPrice.value);
    let supplier = itemSupplier.value;

    let value = qty * price;

    let status = qty < min ? "badge-low" : "badge-active";
    let text = qty < min ? "Low ⚠️" : "Good";

    let table = document.getElementById("inventoryTable");

    let row = table.insertRow();

    row.innerHTML = `
        <td>${name}</td>
        <td>${qty}</td>
        <td>${min}</td>
        <td>₹${price}</td>
        <td>₹${value}</td>
        <td>${supplier}</td>
        <td><span class="${status}">${text}</span></td>
        <td><button class="delete-btn" onclick="this.parentElement.parentElement.remove()">Delete</button></td>
    `;

    totalItems++;
    totalValue += value;
    if(qty < min) lowItems++;

    document.getElementById("totalItems").innerText = totalItems;
    document.getElementById("lowItems").innerText = lowItems;
    document.getElementById("totalValue").innerText = totalValue;

    this.reset();
});