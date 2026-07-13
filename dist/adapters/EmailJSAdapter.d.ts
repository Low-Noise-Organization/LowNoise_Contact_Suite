import type { Adapter } from '../core/adapters';
declare global {
    interface Window {
        emailjs?: any;
    }
}
export declare const EmailJSAdapter: Adapter;
