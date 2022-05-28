import { FormDefinitions } from './form-definitions';

export interface FormConfig {
    id: string;
    title: string;
    definitions: FormDefinitions[];
}
