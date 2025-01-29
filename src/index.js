import { initializeApp } from 'firebase/app';
import { getFirestore, doc, getDoc, getDocs, docs, collection, setDoc } from 'firebase/firestore';

const form = document.getElementById(`contactForm`)
const submitbut = document.getElementById(`submitbut`)
const findpatient = document.querySelector(`.find-patient`)
// Import the functions you need from the SDKs you need

const pass = JSON.parse(localStorage.getItem(`token`)) || false
console.log(pass)
if (!pass){
  location.href = `login-page.html`
}

// Your web app’s Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCGfLQXi27wM6bk5Hl25cgJ5OlZTBr9aH4",
  authDomain: "pateint-histories.firebaseapp.com",
  databaseURL: "https://pateint-histories-default-rtdb.firebaseio.com",
  projectId: "pateint-histories",
  storageBucket: "pateint-histories.appspot.com",
  messagingSenderId: "965184063518",
  appId: "1:965184063518:web:6a113e05e001dbe3f3c60f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get a reference to the Firestore service
const db = getFirestore(app);

let allnames = []


// Function to fetch a document
const fetchPatientData = async () => {
  let arr = []
  const patients = await getDocs(collection(db, `patients`));


  patients.forEach((patient) => {
    arr.push(patient.data())
    allnames.push(patient.id)
  })

 return allnames
};

console.log(await fetchPatientData())
// Fetch data using a specific docume ID


form.onsubmit = (ev) => {ev.preventDefault()}
findpatient.addEventListener(`click`, () => {location = 'find.html'})


document.getElementById('date').value = dateFns.format(new Date(), `yyyy-MM-dd`)
const popup = document.querySelector(`.popup`)
submitbut.addEventListener('click',async (ev) => {
    ev.preventDefault()
      document.querySelector(`.overlay`).style.display = `block`
    document.querySelector(`.loader`).style.display = `block`

    
    const name = document.getElementById('name').value
    const age = Number(document.getElementById('age').value)
    const date = document.getElementById('date').value
    const phoneNumber = String(document.getElementById(`phone-number`).value)
    const symptoms = document.getElementById('symptoms').value
    const reports = document.getElementById('reports').value
    const history = document.getElementById('history').value
    const pastHistory = document.getElementById('past-history').value
    const prescription = document.getElementById('prescription').value
    const vitalSigns = document.getElementById('vital-signs').value
    const extraInfo = document.getElementById('extra-info').value
    const privateInfo = document.getElementById('private-info').value
    let all = [name, age, date, symptoms, reports, history, pastHistory, prescription, vitalSigns]
let fine = true
    

  if (!name || !age || !phoneNumber){
      fine = false
      popup.innerHTML = "Some of the fields were left empty"
      return
  }

const ids = await fetchPatientData()
if (ids.some(names => names === name)){
  popup.innerHTML = `Error occured: Patient with this exact name already exists.`
} 
else{
  const body = {
    Name: name,
    Age: age,
    Date: date,
    Symptoms: symptoms,
    Reports: reports, 
    History: history,
    "Past history": pastHistory,
    Prescription: prescription,
    "Vital signs": vitalSigns,
    "Extra info": extraInfo,
    "Private info": privateInfo,
    "Phone number": phoneNumber
  }
  try {
    const docRef = doc(db, 'patients', `${name}`)
      setDoc(docRef, body)
          .then(() => {popup.innerHTML = `The form has been successfully submitted`}) 
  } catch (error) {
    console.error(error)
  }
}

     
  
});
document.querySelector(`.cro`).addEventListener(`click`, () => {
  popup.innerHTML = `<div class="loader"></div>`
  document.querySelector(`.overlay`).style.display = `none`

  
})




