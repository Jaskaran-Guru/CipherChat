export function formatMessageTime() {
    return new Date().toLocaleTimeString("en-us",{
        hour : "2-digit" , 
        minute : "2-digit" ,
        hour12 : "2-digit"
    })
}