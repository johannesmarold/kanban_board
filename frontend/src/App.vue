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
 */
function showModal(task = null, columnId = null) {
    if (modalRef.value) {
        modalRef.value.showModal(task, columnId)
    }
}

/**
 * Calls showModal() in editing mode.
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
// API calls below
////////////////////////////////////////////////////////////////

async function loadTags() {
    await fetch('/api/tags', {
        method: 'GET'})
    .then(res => {return res.json()})
    .then(data => {tags.value = data})
    .catch(error => {console.error('Fetch error using loadTags():', error.message);});
}

async function loadColumns() {
    await fetch('/api/columns', {
        method: 'GET',
    })
    .then(res => {return res.json()})
    .then(data => {columns.value = data})
    .catch(error => {console.error('Fetch error using loadColumns():', error.message);});    
}

async function createTask(columnId, taskTitle, taskText, taskTags) {
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
    await fetch('/api/tasks/'+taskId, {
        method: 'DELETE',
    })
    .then(() => {console.log("Task erfolgreich geloescht"); loadColumns();})
    .catch(error => {console.error('Fetch error using editTask():', error.message);});
}

async function moveTask(taskId, newColumnId) {
    await fetch('/api/move-task/'+taskId, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json',},
        body: JSON.stringify({newColumnId : newColumnId}),
    })
    .then(() => {console.log("Task erfolgreich verschoben"); loadColumns();})
    .catch(error => {console.error('Fetch error using editTask():', error.message);});
}

onMounted(() => {
    loadTags()
    loadColumns()
})
</script>

<template>
    <Header :title="title" @show-modal="showModal" />
    <Board :columns="columns" @move-task="moveTask" @trigger-edit="triggerEdit" @delete-task="deleteTask"/>
    <Modal :tags="tags" :columns="columns" ref="modalRef" @create-task="createTask" @edit-task="editTask"/>
</template>