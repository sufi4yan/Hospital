import { initializeApp } from 'firebase/app';
import * as dates from "date-fns"
import { getFirestore, doc, getDoc, getDocs, docs, collection, setDoc, deleteDoc, updateDoc } from 'firebase/firestore';

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
export function createProfile(id, arr){
    const info = arr
    document.querySelector(`.overl`).style.display = `block`
    const title = document.querySelector(`.title`)
    const age = document.querySelector(`.profileage`)
    const phone = document.querySelector(`.profilenumber`)
    const date = document.querySelector(`.profiledate`)
    title.textContent = arr[id].Name
    phone.textContent = arr[id]["Phone number"]
    age.textContent = arr[id].Age 
    date.textContent = dates.format(arr[id].Date, 'dd-MM-yyyy')
    let num = 0
    const sequence = [`Symptoms`,`Reports`, `Prescription`, `History`, `Past history`, `Vital signs`, `Extra info`, `Private info`]
    for (let i = 0; i < sequence.length ; i++){
        document.querySelectorAll(`.pagetitle`)[i].textContent = sequence[i]
        document.querySelectorAll(`.content`)[i].innerHTML = arr[id][sequence[i]].replaceAll(`\n`, `<br>`)|| `None`
        num++
    }
    document.querySelectorAll(`.content`).forEach((field) => {
        field.addEventListener(`dblclick`, () => {
            console.log(`clicked!`)
            let content = field.textContent
            field.innerHTML = ``
            const inp = document.createElement(`textarea`)
            inp.value = content
            field.appendChild(inp)
            inp.focus()
            inp.addEventListener(`blur`, (ev) => {

                    let content = ev.target.value
                    field.innerHTML = ``
                    const inp = document.createElement(`p`)
                    inp.textContent = content
                    field.appendChild(inp)
                    console.log(field.parentNode.className, content)
                    const cat = field.parentNode.className
                    const updoc = {}
                    updoc[cat.replace(`-`, ` `)] = content
                    const documen = doc(db, `patients`, `${arr[id].Name}`)
                    updateDoc(documen, updoc)
                
            })
        })
    })
    
    
    
    
}
export function newEntry(id, arr, ids){
    let subid = []
    document.querySelector(`.overla`).style.display = `block`
    document.querySelector(`.cro2`).addEventListener(`click`, () => {
        document.querySelector(`.overlay2`).style.display = `none`
        popup.innerHTML = `<div class="loader"></div>`
    })
    document.querySelector(`.crossnew`).addEventListener(`click`, () => {
        document.querySelector(`.overla`).style.display = `none`
    })
    const namewindow = document.getElementById(`change-name`)
    namewindow.textContent = arr[id].Name
    const datewindow = document.getElementById(`date`)
    datewindow.textContent = `  (${dates.format(new Date(), `d MMM, yyyy`)})`
    const changes = document.getElementById(`newdetails`)
    const but = document.querySelector(`.changesub`)
    but.addEventListener(`click`, () => {
    if (changes.value.length > 0){
        document.querySelector(`.overlay2`).style.display = `block`
        document.querySelector(`.loader`).style.display = `block`
        const change = { 
            Date: `${dates.format(new Date(), `dd MMM, yyyy`)}`,
            change: changes.value
        }
        const visits = collection(db ,`patients`, `${arr[id].Name}`, 'visits')
        getDocs(visits)
            .then((response) => {
                response.forEach((doc) => {
                subid.push(doc.id)
            })})
            .then(() => {
                if (subid.some(idx => idx === `visit(${dates.format(new Date(), `d-M-yy`)})`)){
                    document.querySelector(`.overlay2`).style.display = `block`
                    popup.innerHTML = `The patient has already visited today`
                }
                else{
                    const entrydoc = doc(db, `patients`, `${ids[id]}`, `visits`, `visit(${dates.format(new Date(), `d-M-yy`)})`)
                    setDoc(entrydoc, change)
                    .then(() => {
                            popup.innerHTML = `The entry was succcessfully made`
                            })
                    .catch(() => popup.innerHTML = `Error occured`)
            
                }
            })
        }   
    })
}
export function history(id, arr){
    document.querySelector(`.crosshist`).addEventListener(`click`, () => {
        document.querySelector(`.over`).style.display = `none`
        historydiv.classList.remove(`class2`)
        historydiv.classList.add(`class1`)
        console.log(`hello`)
        document.querySelector(`.heading`).textContent = `Loading...`
        document.querySelector(`.datesall`).style.borderRight = `none`
        document.querySelector(`.datesall`).textContent = ``
        document.querySelector(`.changes`).textContent = ``

    })
    let hist = []
    const historydiv = document.querySelector(`.history`)
    historydiv.classList.add(`class1`)
    document.querySelector(`.over`).style.display = `block`
    const visits = collection(db ,`patients`, `${arr[id].Name}`, 'visits')
    getDocs(visits)
        .then((response) => {
            response.forEach((doc) => {

                hist.push(doc.data())
                
    })
      if (hist.length > 0){
        document.querySelector(`.heading`).textContent = ``
        document.querySelector(`.datesall`).innerHTML = ``
        hist.forEach((item) => {
            console.log(item)
        const key = document.createElement(`div`);key.classList.add(`hist-date`)
        key.textContent = dates.format(item.Date, `dd-MM-yy`)
        document.querySelector(`.datesall`).append(key)
        key.addEventListener(`click`, () =>{
            document.querySelectorAll(`.hist-date`).forEach((item) => {
                item.style.backgroundColor = `rgb(241, 240, 237)`
                item.style.color = `black`
            })
                key.style.backgroundColor = `blueviolet`
                key.style.color = `white`
                historydiv.classList.add(`class2`)
                historydiv.classList.remove(`class1`)
                console.log(historydiv.style)
                document.querySelector(`.datesall`).style.borderRight = `2px solid black`


                document.querySelector(`.heading`).textContent = `Changes`
                const changes = document.querySelector(`.changes `);changes.innerHTML = item.change.replace(`\n`, `<br>`);
               
                


            })
        })
      }
      else{
        document.querySelector(`.heading`).textContent = `No history`
      }
                

    })
}
