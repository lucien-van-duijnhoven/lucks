import { createContext, ReactNode, useContext, useState } from "react";

export const MetaDataContext = createContext<{sizeMultiplier: number, setSizeMultiplier:React.Dispatch<React.SetStateAction<number>>}>({sizeMultiplier: 1, setSizeMultiplier: ()=>{} });

export const useMetaDataContext = () => useContext(MetaDataContext);

export function MetaDataProvider({children}:{children: ReactNode}) {
  const [sizeMultiplier, setSizeMultiplier] = useState<number>(3);
  return (
    <MetaDataContext.Provider value={{sizeMultiplier, setSizeMultiplier: setSizeMultiplier}}>
        <b>Block Size: </b><input type="number" name="" id="" value={sizeMultiplier} onChange={(e)=>setSizeMultiplier(parseInt(e.target.value))} />
        {children}
    </MetaDataContext.Provider>
  )
}