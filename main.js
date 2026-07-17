import Kanban from "./api/view/Kanban.js";

new Kanban(
    document.querySelector(".kanban")
);

(function() {
    const fehBody = document.body;
    window.addEventListener('load', () => {
        fehBody.classList.add('page-loaded');
    });
});