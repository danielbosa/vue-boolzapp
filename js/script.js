import {contacts} from "./data.js";

const {createApp} = Vue;

createApp({
    data(){
        return {
            contacts,
            activeContactId: 1,
            msgText:'',
        }
    },
    methods: {
        showChat(id){
            this.activeContactId = id
        },
        sendMsg(){
            //dichiaro qui la variabile che mi serve da pushare nell'array dei messages; non ha senso che sia una variabile "globale", cioè che la dichiari nei data
            const newMsg = {
                date: new Date().toLocaleString(),
                message: this.msgText,
                status: 'sent'
            };
            this.activeContact.messages.push(newMsg);
            this.msgText='';
            this.sendReply();
        },
        sendReply(){
            setTimeout(()=>{   
                const newMsg = {
                    date: new Date().toLocaleString(),
                    message: 'ok',
                    status: 'received'
                };
                this.activeContact.messages.push(newMsg);
            }, 1000)
        }
    },
    computed:{
        activeContact(){
        return this.contacts.find((el)=> el.id === this.activeContactId)
        },
    },
    mounted(){

    }
}).mount('#app');