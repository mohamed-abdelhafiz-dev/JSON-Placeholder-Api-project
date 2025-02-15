fetchAllUsers().then((firstUserId) => {
  fetchPostsOf(firstUserId);
});
function fetchAllUsers() {
  return fetch("https://jsonplaceholder.typicode.com/users")
    .then((response) => response.json())
    .then((users) => {
      if (users.length) {
        const firstUserId = users[0].id;
        document.querySelector(".users").innerHTML = users
          .map((user) => {
            return `<div class="user" data-user-id=${user.id}>
            <h2 class="user-name">${user.name}</h2>
            <p class="user-email">${user.email}</p>
        </div>
      `;
          })
          .join("");
        document.querySelectorAll(".user").forEach((user) => {
          user.addEventListener("click", function () {
            document.querySelector(".active").classList.remove("active");
            this.classList.add("active");
            const userId = this.dataset.userId;
            fetchPostsOf(userId);
          });
        });
        document.querySelector(".user").classList.add("active");
        return firstUserId;
      } else {
        document.querySelector(".users").innerHTML = `
          <h1 style="margin-top:50px;color:whiteSmoke"><i>Oops!</i><br/> Can't find any users</h1> 
        `;
        return Promise.reject();
      }
    });
}
function fetchPostsOf(userId) {
  fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
    .then((response) => response.json())
    .then((posts) => {
      if (posts.length) {
        document.querySelector(".posts").innerHTML = posts
          .map(
            (post) =>
              `
              <div class="post">
                  <h2 class="post-title">${post.title}</h2>
                  <p class="post-body">${post.body}</p>
              </div>
            `
          )
          .join("");
      } else {
        document.querySelector(".posts").innerHTML = `
          <h1 style="margin-top:50px;font-style:italic">This user hasn't posted yet ..</h1> 
        `;
      }
    });
}
