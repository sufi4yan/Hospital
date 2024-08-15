export function tostring(newstr){
    let backstr = ``
    for (let i = 0; i < newstr.length; i++){
        let encoded = newstr[i].charCodeAt() - 7
     let char = String.fromCharCode(encoded)
    backstr += char
    }
    return backstr
}