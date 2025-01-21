<script setup>
import { ref, onMounted, transformVNodeArgs } from 'vue'
import Board from './components/Board.vue'
import Header from '@/components/Header.vue'
import Modal from '@/components/Modal.vue'

const tags = ref([])
const columns = ref([])
const modalRef = ref(null)

const title = 'My Kanban Board'

/**
 * Calls the showModal() function in Modal.vue, assuming the component is registered and referenced.
 * DO NOT MODIFY.
 */
function showModal(task = null, columnId = null) {
    if (modalRef.value) {
        modalRef.value.showModal(task, columnId)
    }
}

/**
 * Calls showModal() in editing mode.
 * DO NOT MODIFY.
 * @param taskId
 */
function triggerEdit(taskId) {
    for (let column of columns.value) {
        const index = column.tasks.findIndex(t => t.id === taskId)
        if (index > -1) {
            const task = column.tasks[index]
            showModal(task)
            return
        }
    }
}

////////////////////////////////////////////////////////////////
// API calls below, only modify the content of the functions, not their signature! //
////////////////////////////////////////////////////////////////

async function loadTags() {
    //TODO: implement (see 6.2 / 6.1.4)
    await fetch('/api/tags', {
        method: 'GET'})
    .then(res => {return res.json()})
    .then(data => {tags.value = data})
    .catch(error => {console.error('Fetch error using loadTags():', error.message);});
}

async function loadColumns() {
    //TODO: implement (see 6.2 / 6.1.5)
    await fetch('/api/columns', {
        method: 'GET',
    })
    .then(res => {return res.json()})
    .then(data => {columns.value = data})
    .catch(error => {console.error('Fetch error using loadColumns():', error.message);});    
}

async function createTask(columnId, taskTitle, taskText, taskTags) {
    //TODO: implement (see 6.2 / 6.1.6)
    let newTask = {
        column : columnId,
        title : taskTitle,
        text : taskText,
        taskTags : taskTags,
    }
    await fetch('/api/tasks', {
        method: 'POST',
        headers: {'Content-Type': 'application/json',},
        body: JSON.stringify(newTask),
    })
    .then(res => {return res.json()})
    .then(data => {console.log("Task erfolgreich erstellt mit id: " + data.id); loadColumns();})
    .catch(error => {console.error('Fetch error using createTask():', error.message);});
}

async function editTask(taskId, taskTitle, taskText, taskTags) {
    //TODO: implement (see 6.2 / 6.1.7)
    let editedTask = {
        title : taskTitle,
        text : taskText,
        taskTags : taskTags,
    }
    await fetch('/api/tasks/'+taskId, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json',},
        body: JSON.stringify(editedTask),
    })
    .then(() => {console.log("Task erfolgreich bearbeitet"); loadColumns();})
    .catch(error => {console.error('Fetch error using editTask():', error.message);});
}

async function deleteTask(taskId) {
    //TODO: implement (see 6.2 / 6.1.8)
    await fetch('/api/tasks/'+taskId, {
        method: 'DELETE',
    })
    .then(() => {console.log("Task erfolgreich geloescht"); loadColumns();})
    .catch(error => {console.error('Fetch error using editTask():', error.message);});
}

async function moveTask(taskId, newColumnId) {
    //TODO: implement (see 6.2 / 6.1.9)
    await fetch('/api/move-task/'+taskId, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json',},
        body: JSON.stringify({newColumnId : newColumnId}),
    })
    .then(() => {console.log("Task erfolgreich verschoben"); loadColumns();})
    .catch(error => {console.error('Fetch error using editTask():', error.message);});
}

onMounted(() => {
    // DO NOT MODIFY
    loadTags()
    loadColumns()
})
</script>

<template>
    <!-- DO NOT MODIFY -->
    <Header :title="title" @show-modal="showModal" />
    <Board :columns="columns" @move-task="moveTask" @trigger-edit="triggerEdit" @delete-task="deleteTask"/>
    <Modal :tags="tags" :columns="columns" ref="modalRef" @create-task="createTask" @edit-task="editTask"/>
</template>