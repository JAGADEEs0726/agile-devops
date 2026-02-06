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

    let name = document.getElementById("staffName").value;
    let phone = document.getElementById("staffPhone").value;
    let role = document.getElementById("staffRole").value;

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