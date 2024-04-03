import {contacts} from "./data.js";

const {createApp} = Vue;

createApp({
    data(){
        return {
            contacts,
            activeContactId: 1,
            itemText: '',
            done: '',
            msgText:'',
            newMsg:'',
            date:'',
        }
    },
    methods: {
        showChat(id){
            this.activeContactId = id
        },
        sendMsg(){
            this.newMsg= 
                 {
                    date: this.date,
                    message: this.msgText,
                    status: 'sent'
                };
            this.activeContact.messages.push(this.newMsg);
            this.msgText='';
        },
    },
    computed:{
        activeContact(){
        return this.contacts.find((el)=> el.id === this.activeContactId)
        },
    },
    mounted(){
        this.date = Date().toLocaleString()
    }
}).mount('#app');