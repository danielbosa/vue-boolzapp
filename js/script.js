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
        }
    },
    methods: {
        showChat(id){
            this.activeContactId = id
        },
        sendMsg(){
            //let date = date.toLocaleString(),
            this.newMsg= 
                 {
            //         //date: date,
                    message: this.msgText,
                    status: 'sent'
                };
            this.activeContact.messages.push(this.newMsg)
        },
    },
    computed:{
        activeContact(){
        return this.contacts.find((el)=> el.id === this.activeContactId)
        },
    },
    mounted(){
        let date = Date().toLocaleString()
    }
}).mount('#app');