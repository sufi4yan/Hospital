import { tostring } from "./decode.js"
let string = `[zhtlly;*`
let tries = JSON.parse(localStorage.getItem(`tries`)) || 0
console.log(tries)
let pass = JSON.parse(localStorage.getItem(`token`)) || false
console.log(pass)
if (tries > 3){
    location.href = `no-pass.html`
}
setTimeout(() => {
    if (pass === true){
        location.href = 'index.html'
    }
    
}, 2000);

const password = tostring(string)
const inp = document.getElementById(`password`)
const sub = document.getElementById(`submit`)

sub.addEventListener(`click`, () => {
    console.log(inp.value === password)
    if (inp.value === password){
        localStorage.setItem(`token`, `true`)
        location.href = `index.html`

    }
    else{
        alert(`Wrong password`)
        tries += 1
    if (tries > 3){
        localStorage.setItem(`tries`, JSON.stringify(tries))
        location.href = `no-pass.html`
    }
    }
    
})
