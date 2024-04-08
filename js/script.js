import {contacts} from "./data.js";
import {replies} from "./data.js";
import Picker from './emoji-picker.js';

const dt = luxon.DateTime;

const {createApp} = Vue;

createApp({
    data(){
        return {
            contacts,
            replies,
            activeContactId: null,
            msgText:'',
            searchText:'',
            contactsFiltered:'',
            activeMsgIndex: null,
            isWriting: false,
            isOnline: false,
            showEmoji: false,
            activeChatMenu: false,
        }
    },
    methods: {
        onSelectEmoji(emoji) {
            console.log(emoji)
            this.msgText += emoji.i;
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
                date: dt.now().setLocale('it').toFormat('dd/MM/yyyy HH:mm:ss'),
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
            if(this.msgText.trim()){
                const newMsg = this.createMsg(this.msgText,"sent");
                this.activeContact.messages.push(newMsg);
                this.msgText='';
                this.sendReply();
                this.isWriting = true;
                this.showEmoji = false;
                this.autoScroll();
            }
        },
        sendReply(){
            setTimeout(()=>{   
                const newMsg = this.createMsg(this.replies[this.RndNumberGen(0, replies.length - 1)],"received");
                this.activeContact.messages.push(newMsg);
                this.isWriting = false;
                this.isOnline = true;
                this.autoScroll();
                setTimeout(()=>{   
                    this.isOnline = false;
                },2000)
            },1000)     
        },
        onlineStatus(){
            setTimeout(()=>{   
                this.isOnline = false;
            },2000)
        },
        RndNumberGen(min, max){
            return Math.floor(Math.random() * (max - min + 1) ) + min;
        },
        activeMsg(index){
            if(this.activeMsgIndex === index){
                this.activeMsgIndex = null 
            } else {
                this.activeMsgIndex = index
            }
        },
        deleteMsg(index){
            this.activeContact.messages.splice(index,1)
        },
        deleteAllMsgs(){
            this.activeContact.messages.splice()
        },
        //!!! SISTEMARE IL this.activeContactId CHE DEVE CAMBIARE QUANDO ELIMINO UN'intera CHAT --> faccio div condizionato: se activeContactId è falso, allora si vede div (dove scrivo di selezionare una chat)
        deleteChat(){
            let indexToDelete = this.contacts.findIndex((el)=> el.id === this.activeContactId);
            console.log(this.contacts[indexToDelete]);
            //this.activeChatMenu = false;
            this.activeContactId = 4;
            this.contacts.splice(indexToDelete,1);
        },
        //ritorna l'ultimo elemento di array messages
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
        autoScroll(){
            //In questo modo, usando this.$nextTick() fa l'azione di scroll solo dopo che il dom è updated
            this.$nextTick(()=>{
                this.$refs.chatMsg[this.$refs.chatMsg.length - 1].scrollIntoView({behavior: 'smooth'})
            })
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
    },
    mounted(){

    }
}).component('Picker', Picker).mount('#app');

/*
FORMAT
- distingui classi CSS tue da quelle di bootstrap!!!
- riduci font di dropdown menu
???sistemare davvero, non con il mouseleave, la chiusura dei dropdown menu on click outside element

Funzionalità
- sistemare spunte blu nella parte destra: si devono colorare di blu solo 500ms dopo invio;

- dare la possibilità all'utente di cancellare tutti i messaggi di un contatto o di cancellare l'intera chat con tutti i suoi dati: cliccando sull'icona con i tre pallini in alto a destra, si apre un dropdown menu in cui sono presenti le voci "Elimina messaggi" ed "Elimina chat"; cliccando su di essi si cancellano rispettivamente tutti i messaggi di quel contatto (quindi rimane la conversazione vuota) oppure l'intera chat comprensiva di tutti i dati del contatto oltre che tutti i suoi messaggi (quindi sparisce il contatto anche dalla lista di sinistra)
- dare la possibilità all'utente di aggiungere una nuova conversazione, inserendo in un popup il nome e il link all'icona del nuovo contatto
- perché se cancello il primo messaggio della chat, si cancellano anche tutti gli altri?

Grafica
- visualizzare un messaggio di benvenuto che invita l'utente a selezionare un contatto dalla lista per visualizzare i suoi messaggi, anziché attivare di default la prima conversazione
- aggiungere una splash page visibile per 1s all'apertura dell'app
- A) rendere l'app responsive e fruibile anche su mobile: di default si visualizza solo la lista dei contatti e cliccando su un contatto si vedono i messaggi di quel contatto. B) aggiungere quindi un'icona con una freccia verso sinistra per tornare indietro, dalla visualizzazione della chat alla visualizzazione di tutti i contatti
- aggiungere un'icona per ingrandire o rimpicciolire il font: dovrebbe essere sufficiente aggiungere una classe al wrapper principale
- aggiungere un'icona per cambiare la modalità light/dark: dovrebbe essere sufficiente aggiungere una classe al wrapper principale
*/