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
        
        `;
    } catch (error) {
        userDetail.innerHTML = '<p>เกิดข้อผิดพลาดในการโหลดข้อมูลผู้ใช้</p>';
    }
})