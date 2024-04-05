import {contacts} from "./data.js";
import Picker from './emoji-picker.js';

const dt = luxon.DateTime;

const {createApp} = Vue;

createApp({
    data(){
        return {
            contacts,
            activeContactId: 1,
            msgText:'',
            searchText:'',
            contactsFiltered:'',
            activeMsgIndex: null,
        }
    },
    methods: {
        onSelectEmoji(emoji) {
            console.log(emoji)
            this.messageText += emoji.i;
            /*
              // result
              { 
                  i: "😚", 
                  n: ["kissing face"], 
                  r: "1f61a", // with skin tone
                  t: "neutral", // skin tone
                  u: "1f61a" // without tone
              }
              */
        },
        showChat(id){
            this.activeContactId = id;
            this.activeMsgIndex = null
        },
        createMsg(msg,status){
            const newMsg = {
                date: dt.now().setLocale('it').toFormat('dd/MM/yyyy H:mm:ss'),
                message: msg,
                status: status
                };
            return newMsg;
        },
        sendMsg(){
            //dichiaro qui la variabile che mi serve da pushare nell'array dei messages; non ha senso che sia una variabile "globale", cioè che la dichiari nei data
            // const newMsg = {
            //     date: new Date().toLocaleString(),
            //     message: this.msgText,
            //     status: 'sent'
            // };
            const newMsg = this.createMsg(this.msgText,"sent");
            this.activeContact.messages.push(newMsg);
            this.msgText='';
            this.sendReply();
        },
        sendReply(){
            setTimeout(()=>{   
                const newMsg = this.createMsg("ok","received");
                this.activeContact.messages.push(newMsg);
            },1000)
        },
        activeMsg(index){
            if(this.activeMsgIndex === index){
                this.activeMsgIndex = null 
            } else {
                this.activeMsgIndex = index
            }
        },
    },
    computed:{
        activeContact(){
        return this.contacts.find((el)=> el.id === this.activeContactId)
        },
        searchedContact(){
            return this.contacts.filter((el)=>
                el.name.toLowerCase().includes(this.searchText.toLowerCase()));
        },
        //lastTime(contact){
            //return this.contacts.find((el)=> el.id === contact.id);
            //const msgTrovato = trovato.messages.findLast((el)=>{el.status === 'sent'});
        //}
    },
    mounted(){

    }
}).component('Picker', Picker).mount('#app');