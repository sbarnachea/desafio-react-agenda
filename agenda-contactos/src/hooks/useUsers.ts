import { useContext, useCallback } from 'react';
import { UsersContext } from '../context/UserContext';
import { getUsers, createUser, deleteUser } from '../api/userService';
import { CreateUserDto } from '../types';
import { message } from 'antd';

const PAGE_LIMIT = 6;

/**
 * hook que expone toda la lógica de usuarios
 * y consume del contexto global
 */
const useUsers = () => {
  const context = useContext(UsersContext);

  if (!context) throw new Error('useUsers debe usarse dentro de UsersProvider');

  const {
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
  } = context;

  /** Carga usuarios con paginación y búsqueda opcional */
  const fetchUsers = useCallback(
    async (page: number = 1, search?: string) => {
      try {
        setLoading(true);
        const response = await getUsers(page, PAGE_LIMIT, search);
        setTotal(Number(response.headers['x-total-count']));
        setUsers(response.data);
      } catch (error: any) {
        message.error('Error al cargar los contactos');
      } finally {
        setLoading(false);
      }
    },
    [setLoading, setUsers, setTotal],
  );

  /** Crea un nuevo usuario y recarga la lista */
  const addUser = useCallback(
    async (data: CreateUserDto) => {
      try {
        setLoading(true);
        await createUser(data);
        message.success('Contacto agregado correctamente');
        setDrawerOpen(false);
        fetchUsers(1, searchText);
      } catch (error: any) {
        message.error('Error al crear el contacto');
      } finally {
        setLoading(false);
      }
    },
    [setLoading, setDrawerOpen, fetchUsers, searchText],
  );

  /** Elimina un usuario y recarga la lista */
  const removeUser = useCallback(
    async (id: number) => {
      try {
        setLoading(true);
        await deleteUser(id);
        message.success('Contacto eliminado');
        fetchUsers(1, searchText);
      } catch (error: any) {
        message.error('Error al eliminar el contacto');
      } finally {
        setLoading(false);
      }
    },
    [setLoading, fetchUsers, searchText],
  );

  return {
    users,
    total,
    loading,
    drawerOpen,
    setDrawerOpen,
    fetchUsers,
    addUser,
    removeUser,
    PAGE_LIMIT,
    searchText,
    setSearchText,
  };
};

export default useUsers;
