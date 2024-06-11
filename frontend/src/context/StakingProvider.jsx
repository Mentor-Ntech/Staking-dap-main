'use client'

import { createContext, useState } from "react";

const StakingContext = createContext();



export const StakingProvider = ({children}) => {
    const [isReload, setIsReload] = useState(null);

    return(
        <StakingContext.Provider value={{isReload, setIsReload}}>
            {children}
        </StakingContext.Provider>
    )
}

export default StakingContext;