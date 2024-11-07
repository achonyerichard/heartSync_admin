'use client'

import React, {
  useState,
  useContext,
  Dispatch,
  SetStateAction,
  useEffect,
} from "react";

interface Utility {
  open: boolean;
  setOpen: Dispatch<SetStateAction <boolean >>;
  id: string | any;
  setId: Dispatch<SetStateAction<string | any>>;
}

interface Children {
  children: React.ReactNode;
}

const UtilContext = React.createContext<Utility>({
  open: false,
  setOpen: () => {},
  id: "",
  setId: () => {},
});

export function useUtilAuth() {
  return useContext(UtilContext);
}

export const UtilProvider = ({ children }: Children) => {
  const [open, setOpen] = useState(false);
  const [id, setId] = useState("");
  useEffect(() => {
    if (open&&window.innerWidth<1024) {
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [open]);
  const value = {
    open,
    setOpen,
    id,
    setId
  };
  return <UtilContext.Provider value={value}>{children}</UtilContext.Provider>;
};
