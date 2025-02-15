// อ้างอิงถึง ID ของผู้ใช้
const userList = document.getElementById("user-list");

// ดึงข้อมูลจาก API
const fetchUser = async () => {
    try {
        const response = await fetch("https://jsonplaceholder.typicode.com/users");
        if(!response.ok) {
            throw new Error("เกิดข้อผิดพลาดในการดึงข้อมูลผู้ใช้");
        }

        const users = await response.json();
        displayUser(users); // แสดงผู้ใช้
    } catch(error) {
        console.error(error);
    }
}

// ฟังก์ชันสำหรับแสดงผู้ใช้
const displayUser = (users) => {
    userList.innerHTML = users.map(user => `
        <div class = "user-item">
            <a href = "user-detail.html?id=${user.id}">
                <span class="user-name">${user.name}</span> <br>
                <span class="user-email">${user.email}</span>
            </a>
        </div>
    `).join("");
}

fetchUser(); // เรียกใช้ฟังก์ชันเพื่อดึงข้อมูลผู้ใช้