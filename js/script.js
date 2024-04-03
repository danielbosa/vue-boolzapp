import {contacts} from "./data.js";

const {createApp} = Vue;

createApp({
    data(){
        return {
            contacts,
            activeContactId: 1,
            itemText: '',
            done: ''
        }
    },
    methods: {
        showChat(id){
            this.activeContactId = id
        },
    },
    computed:{
        activeContact(){
        return this.contacts.find((el)=> el.id === this.activeContactId)
        },
    },
    mounted(){

    }
}).mount('#app');