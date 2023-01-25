import { createContext } from "react";

const context=createContext({name:"ben"})

const Display=({children})=>{
    return (
        <context.Provider value={{name:"ben"}}>
            {children}
        </context.Provider>
    )
}

export {context,Display}