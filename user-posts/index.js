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
                    <h2>${post.title}</h2>
                    <p class="body">${post.body}</p>
                    <button class="toggle-comments" postId="${post.id}">ดูความคิดเห็น</button>
                    <hr class="under-line" style="display:none">
                    <div class="comment-container" id="comment-${post.id}" style="display:none"></div>
                </div>
            `).join("");
        } else {
            postsTitle.innerHTML = "ไม่พบข้อมูลโพสต์";
        }

    // ดึงปุ่มดูความคิดเห็น
    document.querySelectorAll(".toggle-comments").forEach (button => {
        button.addEventListener("click", async () => {
            const postId = button.getAttribute("postId");
            const commentContainer = document.getElementById(`comment-${postId}`)
            const under = document.querySelector(".under-line");

            if (commentContainer.style.display === "none") {
                const response = await fetch(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`);
                const comments = await response.json();

                if (comments.length > 0) {
                    commentContainer.innerHTML = comments.map(comment => `
                            <div class="container-main">
                                <div class="container-comment">
                                    <h3>${comment.email}</h3>
                                    <p>${comment.body}</p>
                                </div>
                            </div>
                    `).join("");
                } else {
                    commentContainer.innerHTML = "ไม่มีความคิดเห็น";
                }

                under.style.display = "block";
                commentContainer.style.display = "block";
                
                button.innerHTML = "ซ่อนความคิดเห็นนี้";

            } else {
                commentContainer.style.display ="none";
                under.style.display = "none";
                button.innerHTML = "ดูความคิดเห็น";
            }
        });
    });
});