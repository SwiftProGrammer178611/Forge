import KanbanAPI from "../KanbanAPI.js";

export default class DropZone {
    static createDropZone() {
        const range = document.createRange();
        range.selectNode(document.body);
        const dropZone = range.createContextualFragment(`
            <div class="kanban__dropzone">
            </div>
            `).children[0];
        dropZone.addEventListener("dragover", e => {
            e.preventDefault();
            dropZone.classList.add("kanban__dropzone--active");
        });
        dropZone.addEventListener("dragleave", () => {
            dropZone.classList.remove("kanban__dropzone--adtive");
        });
        dropZone.addEventListener("drop", e => {
            e.preventDefault();
            dropZone.classList.remove("kanban__dropzone--active");
            const columnElement = dropZone.closest(".kanban__column");
            const columnId = Number(columnElement.dataset.id);
            const dropZonesInCol = Array.from(columnElement.querySelectorAll(".kanban__dropzone"));
            const droppedIndex = dropZonesInCol.indexOf(dropZone);
            const itemId = Number(e.dataTransfer.getData("text/plain"));
            const droppedItemElement = document.querySelector(`[data-id="${itemId}"]`);
            const insertAfter = dropZone.parentElement.classList.contains("kanban__item") ? dropZone.parentElement : dropZone;
            if (droppedItemElement.contains(dropZone)) {
                return;
            }
            insertAfter.after(droppedItemElement);
            console.log(insertAfter);
            KanbanAPI.updateItem(itemId, {
                columnId,
                position: droppedIndex
            })
            console.log(dropZonesInCol);
            console.log(columnElement, columnId);
        });
        return dropZone;
    }
}