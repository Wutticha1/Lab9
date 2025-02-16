document.addEventListener("DOMContentLoaded", async () => {
    const postsList = document.getElementById("posts-list");
    const postsTitle = document.getElementById("posts-title");
    const userName = document.getElementById("user-name");

    // ดึงข้อมูล user จาก URL
    const urlParams = new URLSearchParams(window.location.search);
    const userId = urlParams.get("userId");

    if(!userId) {
        postsTitle.innerHTML = "ไม่พบข้อมูลโพสต์";
        return;
    }

    // ดึงข้อมูลโพสต์จาก API
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`);
    const posts = await response.json();

    // ดึงข้อมูล user จาก API
    const responseUser = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
    const user = await responseUser.json();
    userName.innerHTML = user.name;

    document.title = `${user.name}`;

    // แสดงข้อมูลโพสต์
    if (posts.length > 0) {
        postsList.innerHTML = posts.map(post => `
                <div class = "card-item">
                    <h2>${post.title}<h2>
                    <p>${post.body}</p>
                    <a href="user-comments/index.html?postId=${post.id}&userId=${userId}" id="comment">ดูความคิดเห็น</a>
                </div>
            `).join("");
        } else {
            postsTitle.innerHTML = "ไม่พบข้อมูลโพสต์";
        }
});