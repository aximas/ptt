const App = {
    created() {
        // called on app created
        this.getTasks();
    },
    data() {
        return {
            input: {
                value: '',
                tempValue: '',
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
                    isDone: false,
                    isEdit: false
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
      // edit Task
      handleEdit(id, name) {
        this.input.tempValue = name;

        const changedTasks = this.tasks.map(task => {
            if(task.id === id) {
              return {...task, isEdit: true}
            } 
            return {...task, isEdit: false}
        })

        this.tasks = changedTasks;
      },
      // save edited Task
      handleSave(id) {
        const changedName = this.input.tempValue;

        const changedTasks = this.tasks.map(task => {
            if(task.id === id) {
              return {...task, isEdit: false, name: changedName}
            } 
            return {...task, isEdit: false}
        });

        this.tasks = changedTasks;
      },
      handleChecked(id) {
        this.tasks = this.tasks.map(task => {
          if(task.id === id) return {...task, isDone: !task.isDone}
          return task;
        })
      }
    },
    watch: {
        tasks: {
            // save edited Tasks in Local storage
            handler(updatedTasks) {
                localStorage.setItem('tasks', JSON.stringify(updatedTasks))
            },
            deep: true
        }
      }
}

Vue.createApp(App).mount('#app')