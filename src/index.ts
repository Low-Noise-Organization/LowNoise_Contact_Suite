import { LowNoiseContactSuite } from './core/LowNoiseContactSuite';
export type { ContactSuiteConfig, ChannelConfig, FieldConfig, ChannelType, UIConfig, AntispamConfig } from './core/types';

// Exportación por defecto necesaria para que el UMD funcione como constructor global
export default LowNoiseContactSuite;