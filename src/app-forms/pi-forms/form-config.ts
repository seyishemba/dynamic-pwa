import { SelectOptions } from './select-options';
export interface FormConfig {
    key: string;
    type: string;
    value?: any;
    required: boolean;
    label: string;
    placeholder?: string;
    selectOptions?: SelectOptions[];
}
