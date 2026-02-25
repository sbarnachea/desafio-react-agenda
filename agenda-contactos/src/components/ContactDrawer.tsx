import { Drawer, Form, Input, Button, Space } from 'antd';
import useUsers from '../hooks/useUsers';
import { CreateUserDto } from '../types';

/**
 * Drawer lateral para agregar un nuevo contacto.
 */
const ContactDrawer = () => {
  const { drawerOpen, setDrawerOpen, addUser, loading } = useUsers();
  const [form] = Form.useForm();

  const handleClose = () => {
    form.resetFields();
    setDrawerOpen(false);
  };

  const handleSubmit = async (values: CreateUserDto) => {
    await addUser(values);
    form.resetFields();
  };

  return (
    <Drawer
      title='Agregar nuevo Contacto'
      placement='right'
      onClose={handleClose}
      open={drawerOpen}
      size={600}
      extra={
        <Space>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button
            type='primary'
            loading={loading}
            onClick={() => form.submit()}
          >
            Guardar
          </Button>
        </Space>
      }
    >
      <Form form={form} layout='vertical' onFinish={handleSubmit}>
        <Form.Item
          label='URL imagen de Perfil'
          name='photo'
          rules={[{ required: true, message: 'Ingresa la URL de la imagen' }]}
        >
          <Input placeholder='Inserta la URL de la imagen de perfil' />
        </Form.Item>

        <Form.Item
          label='Nombre'
          name='name'
          rules={[{ required: true, message: 'Ingresa el nombre' }]}
        >
          <Input placeholder='Escriba el nombre de contacto' />
        </Form.Item>

        <Form.Item
          label='Descripción'
          name='description'
          rules={[{ required: true, message: 'Ingresa la descripción' }]}
        >
          <Input.TextArea
            placeholder='Agregue la descripción del contacto'
            rows={3}
          />
        </Form.Item>
      </Form>
    </Drawer>
  );
};

export default ContactDrawer;
