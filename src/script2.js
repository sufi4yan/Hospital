import { initializeApp } from 'firebase/app';
import * as dates from "date-fns"
import { getFirestore, doc, getDoc, getDocs, docs, collection, setDoc, deleteDoc, updateDoc } from 'firebase/firestore';
import { createProfile, newEntry, history } from './firebase';
const popup = document.querySelector(`.popup2`)

const firebaseConfig = {
    apiKey: "AIzaSyCGfLQXi27wM6bk5Hl25cgJ5OlZTBr9aH4",
    authDomain: "pateint-histories.firebaseapp.com",
    databaseURL: "https://pateint-histories-default-rtdb.firebaseio.com",
    projectId: "pateint-histories",
    storageBucket: "pateint-histories.appspot.com",
    messagingSenderId: "965184063518",
    appId: "1:965184063518:web:6a113e05e001dbe3f3c60f"
  };
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
let newarr = []
let ids = []
const names = document.getElementById(`pt-name`)
let patients = []
// window.addEventListener(`offline`,() => {

// })
try {
    patients = collection(db, 'patients')
} catch (error) {
    //console.log(error)
}


function getdata(){
    newarr = []
    ids = []
    getDocs(patients)
.then((snapshot) => {
    //console.log(patients)
    snapshot.forEach((doc) => {
        newarr.push(doc.data())
        ids.push(doc.id)
    })
})
.then(() => {
    container.innerHTML = ``
    create(newarr)
    names.removeAttribute(`disabled`)
    console.log(ids)
    console.log(newarr)   
})
}
getdata()

names.onkeyup = () => {
    document.getElementById(`searchoption`).addEventListener(`change`, () => {
        names.value = ``
    })
    findPatient(document.getElementById(`searchoption`).value)
}

const bar = document.getElementById(`pt-name`)

function findPatient(by){
    let nametofind = names.value
    function search(){
        let arr = newarr.filter(obj => ((obj[`${by}`]).toLowerCase()).includes(nametofind.toLowerCase()))
        return arr
}
    container.innerHTML = `<div class="loader2"></div>`
        setTimeout(() => {
            container.innerHTML = ``
            //console.log(search())
            create(search())

        }, 100);
}


const container = document.querySelector(`.container`)
const see = document.createElement(`button`)
see.textContent = `see more`


function create(data, limit=30){

    if(data.length > 30){
        
    see.style.display = `inline`
        see.onclick = () => {
            //console.log(limit)
            if (limit + 1 < data.length){
                limit += 30
                if (data.length > limit){
                    loop(limit-30, limit)
                }
                else if(data.length < limit){
                    loop(limit-30, data.length)
                }
                
                container.appendChild(see)
                    see.style.display = `none`
                    setTimeout(() => {
                        if(!limit === data.length){
                            see.style.display = `inline`
                        }
                        
                    }, 2000);
            }
            else{
                see.disabled
            }
        
        }
    }
    else{
    limit = data.length
    see.style.display = `none`
    }
    loop(0, limit)
    container.appendChild(see)
    function loop(start, limit){
        for(let i = start; i < limit; i++){
            const  box = document.createElement(`div`)
            const title = document.createElement(`div`)
            const name = document.createElement(`span`)
            const age = document.createElement(`span`)
            const buttons = document.createElement(`div`)
            const selection = document.createElement(`select`)
            const empty = document.createElement(`option`)
            const profile = document.createElement(`option`)
            const history = document.createElement(`option`)
            const newentry = document.createElement(`option`)

        
            
            box.classList.add(`box`)
            title.classList.add(`title`)
            box.classList.add('box');
            box.setAttribute(`id`, `box${i}`)
            name.classList.add('name');
            age.classList.add('age');
            buttons.classList.add('buttons');
            selection.classList.add('selection');
            selection.setAttribute(`id`, `${i}`)
            profile.classList.add('profile');
            newentry.classList.add('newentry');



            
        
            name.textContent = data[i].Name
            age.textContent = `, ${data[i].Age} years`
            profile.value, profile.textContent = `profile`
            newentry.value, newentry.textContent = `New Entry`

            history.value, history.textContent = `History`
            empty.value, empty.textContent = `Select`
            
            title.append(name, age)
            selection.append(empty, profile, newentry, history)
            buttons.append(selection)
            box.append(title, buttons)
            container.appendChild(box)
        
        
        }
        options(data)
    
    }

}

function options(newar){
    const selection = document.querySelectorAll(`.selection`)
    
        document.querySelectorAll(`.cross`).forEach((item) => {
            item.onclick = () => {
                document.querySelector(`.overl`).style.display = `none`
              }
        })
    selection.forEach((item) => {
        item.addEventListener(`change`, () => {
            const topOpen = item.value
                switch (topOpen) {
                    case `profile`:
                        createProfile(item.id, newar)
                        //console.log(item.id)
                        break;
                    case `New Entry`:
                        newEntry(item.id, newar, ids)
                        break;
                    case `History`:
                        history(item.id, newar)
                        break;
                    default:
                        break;
                }
                item.selectedIndex = 0 
            })
    })
  
}


