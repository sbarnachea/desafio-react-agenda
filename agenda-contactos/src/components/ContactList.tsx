import { useEffect, useState } from 'react';
import { Table, Avatar, Button, Popconfirm } from 'antd';
import { DeleteOutlined, UserOutlined } from '@ant-design/icons';
import { User } from '../types';
import useUsers from '../hooks/useUsers';
import SearchBar from './SearchBar';
import './ContactList.css';

/**
 * Lista paginada de contactos con buscador y opción de eliminar
 */
const ContactList = () => {
  const {
    users,
    total,
    loading,
    fetchUsers,
    removeUser,
    PAGE_LIMIT,
    searchText,
    setSearchText,
  } = useUsers();

  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchUsers(1);
  }, [fetchUsers]);

  const handleSearch = (value: string) => {
    setSearchText(value);
    setCurrentPage(1);
    fetchUsers(1, value);
  };

  const handleClear = () => {
    setSearchText('');
    setCurrentPage(1);
    fetchUsers(1, '');
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    fetchUsers(page, searchText);
  };

  const columns = [
    {
      title: 'Nombre',
      dataIndex: 'name',
      key: 'name',
      width: 200,
      render: (name: string, record: User) => (
        <div className='contact-name'>
          <Avatar src={record.photo} icon={<UserOutlined />} size={32} />
          <span className='contact-name__link'>{name}</span>
        </div>
      ),
    },
    {
      title: 'Descripción',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Acciones',
      key: 'actions',
      width: 100,
      align: 'center' as const,
      render: (_: any, record: User) => (
        <Popconfirm
          title='¿Eliminar este contacto?'
          onConfirm={() => removeUser(record.id)}
          okText='Sí'
          cancelText='No'
        >
          <Button icon={<DeleteOutlined />} type='text' danger />
        </Popconfirm>
      ),
    },
  ];

  return (
    <>
      <SearchBar
        value={searchText}
        onSearch={handleSearch}
        onClear={handleClear}
        onChange={(value) => setSearchText(value)} // 👈 solo actualiza el texto, no busca
      />
      <Table
        columns={columns}
        dataSource={users}
        rowKey='id'
        loading={loading}
        pagination={{
          current: currentPage,
          pageSize: PAGE_LIMIT,
          total,
          onChange: handlePageChange,
          showSizeChanger: false,
        }}
      />
    </>
  );
};

export default ContactList;
