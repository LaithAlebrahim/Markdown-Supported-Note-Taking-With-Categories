import { useEffect, useState } from "react"

export function useLocalStorage<T>(Key:string,initialValue:T|(()=>T)){
    const [value,setValue]=useState<T>(()=>{
        const jsonValue = localStorage.getItem(Key)
        if(jsonValue==null){
            if(typeof(initialValue)==="function"){
                return (initialValue as () =>T)
            }
            else {
                return initialValue
            }
        }
        else {
            return JSON.parse(jsonValue)
        }
    })
 useEffect(() => {
 localStorage.setItem(Key,JSON.stringify(value))
 }, [value,Key])   
   return [value,setValue]  as [T,typeof setValue]
}