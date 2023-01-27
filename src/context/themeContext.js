import { createContext } from "react";

const context=createContext({name:"My Tasks"})

const Display=({children})=>{
    return (
        <context.Provider value={{name:"My Tasks"}}>
            {children}
        </context.Provider>
    )
}

export {context,Display}