const App = {
    created() {
        // called on app created
        this.getTasks();
    },
    data() {
        return {
            input: {
                value: '',
                placeholder: 'Add some task'
            },
            tasks: []
        }
    },
    methods: {
        // get Tasks from local storage
        getTasks() {
            const localTasks = JSON.parse(localStorage.getItem('tasks'));
            if(localTasks) this.tasks = localTasks
        },
        // add Task
        handleSubmit() {
        const name = this.input.value;
        const id = Math.round(Math.random() * 10000).toString(16);

        if(name) {
            const newTask = {
                    id,
                    name,
                    isDone: false
                };
            this.tasks.push(newTask);
            this.input.value = ''
        }
      },
      // remove Task
      handleRemove(id) {
        const filteredTasks = this.tasks.filter(task => task.id !== id);
        this.tasks = filteredTasks;
      },
    },
    watch: {
        tasks: {
            handler(updatedTasks) {
                localStorage.setItem('tasks', JSON.stringify(updatedTasks))
            },
            deep: true
        }
      }
}

Vue.createApp(App).mount('#app')