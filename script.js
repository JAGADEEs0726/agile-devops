/** * BACKEND CONTROLLER (Simulation)
 * Handles data logic and Persistence
 */
class HotelBackend {
    constructor() {
        this.data = JSON.parse(localStorage.getItem('hms_db')) || {
            bookings: [{id: 'BK-101', guest: 'John Smith', room: '101 (Std)', status: 'Active'}],
            staff: [{name: 'Maria Gomez', role: 'Manager'}, {name: 'Kevin Hart', role: 'Front Desk'}]
        };
    }

    save() {
        localStorage.setItem('hms_db', JSON.stringify(this.data));
    }

    addBooking(guest, room) {
        const id = 'BK-' + Math.floor(Math.random() * 900 + 100);
        this.data.bookings.push({ id, guest, room, status: 'Active' });
        this.save();
    }

    fireStaff(index) {
        this.data.staff.splice(index, 1);
        this.save();
    }
}

const API = new HotelBackend();

/** * FRONTEND ROUTER
 * Handles UI changes
 */
function router(module) {
    // Update active UI tab
    document.querySelectorAll('.nav-item').forEach(el => el.classList.remove('active'));
    document.getElementById('view-title').innerText = module.toUpperCase();

    // Render Module
    const viewport = document.getElementById('app-viewport');
    viewport.innerHTML = '';
    const template = document.getElementById(`tpl-${module}`);
    const clone = template.content.cloneNode(true);
    viewport.appendChild(clone);

    // Dynamic Data Loading
    if (module === 'bookings') renderBookings();
    if (module === 'staff') renderStaff();
    if (module === 'billing') renderBilling();
}

// Module Specific Logics
function renderBookings() {
    const list = document.getElementById('list-bookings');
    list.innerHTML = API.data.bookings.map(b => `
        <tr><td>${b.id}</td><td>${b.guest}</td><td>${b.room}</td><td>✅ ${b.status}</td></tr>
    `).join('');
}

function handleNewBooking(e) {
    e.preventDefault();
    const guest = document.getElementById('guest').value;
    const room = document.getElementById('room').value;
    API.addBooking(guest, room);
    router('bookings'); // Refresh view
}

function renderStaff() {
    const container = document.getElementById('list-staff');
    container.innerHTML = API.data.staff.map((s, index) => `
        <div class="staff-box">
            <strong>${s.name}</strong><br><small>${s.role}</small><br>
            <button onclick="fireStaff(${index})" style="color:red; border:none; background:none; cursor:pointer">Remove</button>
        </div>
    `).join('');
}

function fireStaff(index) {
    API.fireStaff(index);
    renderStaff();
}

function addMockStaff() {
    const names = ["Sarah", "Mike", "Elena", "Chris"];
    const roles = ["Housekeeping", "Security", "Chef"];
    API.data.staff.push({
        name: names[Math.floor(Math.random()*names.length)],
        role: roles[Math.floor(Math.random()*roles.length)]
    });
    API.save();
    renderStaff();
}

function renderBilling() {
    const list = document.getElementById('billing-list');
    list.innerHTML = API.data.bookings.map(b => `
        <div class="stat-card" style="margin-bottom:10px">
            <strong>${b.guest}</strong> - Room ${b.room}
            <button class="btn-add" style="float:right" onclick="alert('Invoice Sent to ${b.guest} for $450.00')">Generate Bill</button>
        </div>
    `).join('');
}

// Initialization
setInterval(() => {
    document.getElementById('live-clock').innerText = new Date().toLocaleTimeString();
}, 1000);

window.onload = () => router('dashboard');