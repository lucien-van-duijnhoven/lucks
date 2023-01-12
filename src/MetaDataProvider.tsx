import { createContext, ReactNode, useContext, useState } from "react";

export const MetaDataContext = createContext<{sizeMultiplier: number, setSizeMultiplier:any}>({sizeMultiplier: 1, setSizeMultiplier: ()=>[] });


export const useMetaDataContext = () => useContext(MetaDataContext);

export function MetaDataProvider({children}:{children: ReactNode}) {
  const [sizeMultiplier, setSizeMultiplier] = useState<number>(1);
  return (
    <MetaDataContext.Provider value={{sizeMultiplier, setSizeMultiplier}}>
        {children}
        </MetaDataContext.Provider>
  )
}