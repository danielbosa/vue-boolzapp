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
            if(this.msgText.trim()){
                const newMsg = this.createMsg(this.msgText,"sent");
                this.activeContact.messages.push(newMsg);
                this.msgText='';
                this.sendReply();
                console.log(this.msgText, typeof this.msgText)
            }
        },
        sendReply(){
            setTimeout(()=>{   
                const newMsg = this.createMsg(this.replies[this.RndNumberGen(0, replies.length - 1)],"received");
                this.activeContact.messages.push(newMsg);
            },1000)
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
    },
    mounted(){

    }
}).component('Picker', Picker).mount('#app');

/*
Funzionalità
- visualizzare nella lista dei contatti l'ultimo messaggio inviato/ricevuto da ciascun contatto
- inserire l'orario corretto nei messaggi
- sotto al nome del contatto nella parte in alto a destra, cambiare l'indicazione dello stato: visualizzare il testo "sta scrivendo..." nel timeout in cui il pc risponde, poi mantenere la scritta "online" per un paio di secondi e infine visualizzare "ultimo accesso alle xx:yy" con l'orario corretto
- dare la possibilità all'utente di cancellare tutti i messaggi di un contatto o di cancellare l'intera chat con tutti i suoi dati: cliccando sull'icona con i tre pallini in alto a destra, si apre un dropdown menu in cui sono presenti le voci "Elimina messaggi" ed "Elimina chat"; cliccando su di essi si cancellano rispettivamente tutti i messaggi di quel contatto (quindi rimane la conversazione vuota) oppure l'intera chat comprensiva di tutti i dati del contatto oltre che tutti i suoi messaggi (quindi sparisce il contatto anche dalla lista di sinistra)
- dare la possibilità all'utente di aggiungere una nuova conversazione, inserendo in un popup il nome e il link all'icona del nuovo contatto
- fare scroll in giù in automatico fino al messaggio più recente, quando viene aggiunto un nuovo messaggio alla conversazione (NB: potrebbe esserci bisogno di utilizzare nextTick: https://vuejs.org/api/general.html#nexttick)

Grafica
- visualizzare un messaggio di benvenuto che invita l'utente a selezionare un contatto dalla lista per visualizzare i suoi messaggi, anziché attivare di default la prima conversazione
- aggiungere una splash page visibile per 1s all'apertura dell'app
- A) rendere l'app responsive e fruibile anche su mobile: di default si visualizza solo la lista dei contatti e cliccando su un contatto si vedono i messaggi di quel contatto. B) aggiungere quindi un'icona con una freccia verso sinistra per tornare indietro, dalla visualizzazione della chat alla visualizzazione di tutti i contatti
- aggiungere un'icona per ingrandire o rimpicciolire il font: dovrebbe essere sufficiente aggiungere una classe al wrapper principale
- aggiungere un'icona per cambiare la modalità light/dark: dovrebbe essere sufficiente aggiungere una classe al wrapper principale
*/