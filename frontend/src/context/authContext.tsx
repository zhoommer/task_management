import { createContext, useState } from "react";
import { Loader } from 'lucide-react';

type Props = {
  children?: React.ReactNode;
};

type IAuthContext = {
  loading: boolean;
  setLoading: (newState: boolean) => void;
  authenticated: boolean;
  setAuthenticated: (newState: boolean) => void;
};

const initialValue = {
  loading: false,
  setLoading: () => { },
  authenticated: localStorage.getItem("token") ? true : false,
  setAuthenticated: () => { },
};

const AuthContext = createContext<IAuthContext>(initialValue);

const AuthProvider = ({ children }: Props) => {
  const [loading, setLoading] = useState(initialValue.loading);
  const [authenticated, setAuthenticated] = useState(
    initialValue.authenticated,
  );

  return (
    <AuthContext.Provider
      value={{ loading, setLoading, authenticated, setAuthenticated }}
    >
      {loading ? <div className="h-dvh flex justify-center items-center"><Loader /></div> : children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
