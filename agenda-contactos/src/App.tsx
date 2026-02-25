import { Button, Typography } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { UsersProvider } from './context/UserContext';
import ContactList from './components/ContactList';
import ContactDrawer from './components/ContactDrawer';
import useUsers from './hooks/useUsers';
import './App.css';

const { Title, Text } = Typography;

const AppContent = () => {
  const { setDrawerOpen } = useUsers();

  return (
    <div className='app-container'>
      <div className='app-header'>
        <Title level={2}>
          Agenda Previred - Mi agenda de contactos laboral
        </Title>
        <Text type='secondary'>
          Aquí podrá encontrar o buscar a todos sus contactos agregados, agregar
          nuevos contactos y eliminar contactos no deseados.
        </Text>
      </div>

      <div className='app-header__actions'>
        <Button
          type='primary'
          icon={<PlusOutlined />}
          onClick={() => setDrawerOpen(true)}
        >
          Agregar Contacto
        </Button>
      </div>

      <ContactList />
      <ContactDrawer />
    </div>
  );
};

const App = () => (
  <UsersProvider>
    <AppContent />
  </UsersProvider>
);

export default App;
