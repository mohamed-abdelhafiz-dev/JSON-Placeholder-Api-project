renderPage();
function renderPage() {
  renderUsersSection();
}
function renderUsersSection() {
  const req = new XMLHttpRequest();
  req.open("GET", "https://jsonplaceholder.typicode.com/users");
  req.responseType = "json";
  req.onload = function () {
    let users = req.response;
    users.forEach((user) => {
      document.querySelector(".users").innerHTML += `
    <div class="user" data-user-id=${user.id}>
    <h2 class="user-name">${user.name}</h2>
    <p class="user-email">${user.email}</p>
  </div>
  `;
    });
    document.querySelectorAll(".user").forEach((user) => {
      user.addEventListener("click", function () {
        document.querySelectorAll(".user").forEach((user) => {
          user.classList.remove("active");
        });
        this.classList.toggle("active");
        const userId = this.dataset.userId;
        console.log(userId);
        renderPostsSection(userId);
      });
    });
    document.querySelector(".user").classList.add("active");
    renderPostsSection(1);
  };
  req.send();
}
function renderPostsSection(userId) {
  const req = new XMLHttpRequest();
  req.open(
    "GET",
    `https://jsonplaceholder.typicode.com/posts?userId=${userId}`
  );
  req.responseType = "json";
  req.onload = function () {
    const posts = req.response;
    document.querySelector(".posts").innerHTML = "";
    posts.forEach((post) => {
      document.querySelector(".posts").innerHTML += `
      <div class="post">
          <h2 class="post-title">${post.title}</h2>
          <p class="post-body">${post.body}</p>
      </div>
 `;
    });
  };
  req.send();
}
