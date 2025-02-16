document.addEventListener("DOMContentLoaded", async () => {
    const userDetail = document.getElementById("user-detail");
    const viewPostBtn = document.getElementById("view-post-btn");

    // ดึง ID จาก URL
    const urlParams = new URLSearchParams(window.location.search);
    const userId = urlParams.get("id");

    if(!userId) {
        userDetail.innerHTML = "<p>ไม่พบข้อมูลของผู้ใช้</p>";
        return;
    }

    // ดึงข้อมูลผู้ใช้จาก API
    const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    const user = await response.json();
    // แสดงชื่อผู้ใช้
    userDetail.innerHTML = `
        <div class = "user-container">
            <h2>${user.name}</h2>
            <div class="head-info">อีเมล</div>
            <div class="p-info">${user.email}</div>

            <div class="head-info">ชื่อผู้ใช้</div>
            <div class="p-info">${user.username}</div>

            <div class="head-info">เบอร์โทรศัพท์</div>
            <div class="p-info">${user.phone}</div>

            <div class="head-info">เว็บไซต์</div>
            <div class="p-info">${user.website}</div>

            <span class="head-info">ที่อยู่</span><br>
            <span class="p-info">${user.address.street}</span>, 
            <span class="p-info">${user.address.suite}</span><br> 
            <span class="p-info">${user.address.city}</span>,
            <span class="p-info">${user.address.zipcode}</span>

            <div class="head-info-tail">บริษัท</div>
            <div class="p-info-tail">${user.company.name}</div>
            <div class="p-info">${user.company.catchPhrase}</div>
        </div>
    `;

    // เมื่อคลิกที่ปุ่ม "ดูโพสต์"
    viewPostBtn.addEventListener("click", () => {
        window.location.href = `./user-posts.html?userId=${userId}`;
    });
});