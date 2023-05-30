import { createContext, useState } from "react";

const BillContext = createContext(null);

function BillContextProvider({children}) {
    const [bill, setBill] = useState({currency: 'EUR'})
    return(
        <BillContext.Provider value={{bill, setBill}}>
            {children}
        </BillContext.Provider>
    )
}

export default BillContext

export {BillContextProvider}