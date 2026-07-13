import { LowNoiseContactSuite } from '../src/index';

export default {
  title: 'LowNoiseContactSuite',
};

const Template = ({ channels, fields, ui }) => {
  const container = document.createElement('div');
  container.id = 'story-root';
  setTimeout(() => {
    new LowNoiseContactSuite({
      container: '#story-root',
      channels,
      fields,
      ui,
    });
  }, 0);
  return container;
};

export const Default = Template.bind({});
Default.args = {
  channels: [
    { type: 'whatsapp', number: '123456789', messageTemplate: 'Hola {name}' },
    { type: 'emailjs', publicKey: '', serviceId: '', templateId: '' },
  ],
  fields: [
    { name: 'name', type: 'text', label: 'Nombre', required: true },
    { name: 'email', type: 'email', label: 'Email' },
    { name: 'message', type: 'textarea', label: 'Mensaje', required: true },
  ],
  ui: { theme: 'default' },
};
