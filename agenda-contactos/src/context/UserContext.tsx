import { createContext, useState, ReactNode } from 'react';
import { User } from '../types';

interface UsersContextType {
  users: User[];
  setUsers: (users: User[]) => void;
  total: number;
  setTotal: (total: number) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  drawerOpen: boolean;
  setDrawerOpen: (open: boolean) => void;
  searchText: string;
  setSearchText: (text: string) => void;
}

export const UsersContext = createContext<UsersContextType | undefined>(
  undefined,
);

export const UsersProvider = ({ children }: { children: ReactNode }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [searchText, setSearchText] = useState('');

  return (
    <UsersContext.Provider
      value={{
        users,
        setUsers,
        total,
        setTotal,
        loading,
        setLoading,
        drawerOpen,
        setDrawerOpen,
        searchText,
        setSearchText,
      }}
    >
      {children}
    </UsersContext.Provider>
  );
};
