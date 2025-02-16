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

    try {
        // ดึงข้อมูลผู้ใช้จาก API
        const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
        const user = await response.json();

        // แสดงชื่อผู้ใช้
        userDetail.innerHTML = `
            <h2>${user.name}</h2>
            <div class="head-info">อีเมล</div>
            <div class="p-info">${user.email}</div>

            <div class="head-info">ชื่อผู้ใช้</div>
            <div class="p-info">${user.username}</div>

            <div class="head-info">เบอร์โทรศัพท์</div>
            <div class="p-info">${user.phone}</div>

            <div class="head-info">เว็บไซต์</div>
            <div class="p-info">${user.website}</div>

            <div class="head-info">ที่อยู่</div>
            <p class="info">${user.address.street}</p>, 
            <p class="info">${user.address.suite}</p><br> 
            <p class="info">${user.address.city}</p>,
            <p class="info">${user.address.zipcode}</p>

            <div class="head-info">บริษัท</div>
            <div class="p-info">${user.company.name}</div>
            <div class="p-info">${user.company.catchPhrase}</div>
        `;

        // เมื่อคลิกที่ปุ่ม "ดูโพสต์"
        viewPostBtn.addEventListener("click", () => {
            window.location.href = `./user-posts.html?userId=${userId}`;
        })
        
    } catch (error) {
        userDetail.innerHTML = '<p>เกิดข้อผิดพลาดในการโหลดข้อมูลผู้ใช้</p>';
    }
});