import request from '../utils/request';
import { CreateUserDto } from '../types';

/**
 * Obtiene lista paginada de usuarios, con búsqueda opcional
 */
export const getUsers = (page: number, limit: number, search?: string) =>
  request({
    method: 'GET',
    url: 'users',
    params: {
      _page: page,
      _limit: limit,
      ...(search ? { q: search } : {}),
    },
  });

/**
 * Crea un nuevo usuario
 */
export const createUser = (data: CreateUserDto) =>
  request({
    method: 'POST',
    url: 'users',
    data,
    headers: { 'Content-Type': 'application/json' },
  });

/**
 * Elimina un usuario por id
 */
export const deleteUser = (id: number) =>
  request({
    method: 'DELETE',
    url: `users/${id}`,
  });
