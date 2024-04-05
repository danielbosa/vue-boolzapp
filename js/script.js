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
            emptyChat: false,
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
        deleteMsg(index){
            this.activeContact.messages.splice(index)
        },
        getContactIndex(id){
            const index = this.contacts.findIndex((el)=> el.id === id);
            const lastMsgIndex = this.contacts[index].messages.length - 1;
            if(lastMsgIndex >= 0){
                return this.contacts[index].messages[lastMsgIndex]
            } else {
                return ''
            }
            
        },
        getLastMsg(id){
            if(!this.getContactIndex(id)){
                return 'Non ci sono messaggi'
            }
            return this.getContactIndex(id).message;
        },
        getLastMsgDate(id){
            if(!this.getContactIndex(id)){
                return ''
            }
            return this.getContactIndex(id).date;
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
        //to get the date of active contact (shown on the right side)
        lastMsg(){
            const index = this.activeContact.messages.length - 1;
            if(index < 0){
                return false;
            }
            return this.activeContact.messages[index].date
        },
        //lastTime(contact){
            //return this.contacts.find((el)=> el.id === contact.id);
            //const msgTrovato = trovato.messages.findLast((el)=>{el.status === 'sent'});
        //}
    },
    mounted(){

    }
}).component('Picker', Picker).mount('#app');