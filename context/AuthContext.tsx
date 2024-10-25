import React, { createContext, useState, useContext, ReactNode } from "react";

// Define the shape of the context
interface AuthContextType {
  userRole: string | null | any; // You can change this to match your roles, e.g., 'admin', 'user'
  setUserRole: (role: string) => void;
  clearUserRole: () => void;
}

// Create a context with default values
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider component
interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [userRole, setUserRoleState] = useState<string | null| any>(null);

  const setUserRole = (role: string) => {
    setUserRoleState(role);
    localStorage.setItem("userRole", role); // Persist role to localStorage
  };

  const clearUserRole = () => {
    setUserRoleState(null);
    localStorage.removeItem("userRole"); // Clear role from localStorage
  };

  // Initialize role from localStorage when the app starts
  React.useEffect(() => {
    const storedRole = localStorage.getItem("userRole");
    if (storedRole) {
      setUserRoleState(storedRole);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ userRole, setUserRole, clearUserRole }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook to use the AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
