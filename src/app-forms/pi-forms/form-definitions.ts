import { LightboxData } from 'app-forms/lightbox/lightbox-data';
export interface FormDefinitions {
    key: any;
    type: 'string' | 'int' | 'bool' | 'enum' | 'lightbox';
    value?: any;
    required: boolean;
    label: string;
    placeholder?: string;
    enumValues?: string[];
    lightboxData?: LightboxData[];
}
