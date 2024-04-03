import {contacts} from "./data.js";

const {createApp} = Vue;

createApp({
    data(){
        return {
            contacts,
            itemText: '',
            done: ''
        }
    },
    methods: {
        /*toggleDone(id){
            const item = this.todo.findIndex((el)=>{
                return el.id === id;
            })
            this.todo[item].done = !this.todo[item].done
        },*/
    },
    computed:{

    },
    mounted(){

    }
}).mount('#app');