export interface FormDefinitions {
    key: any;
    type: 'string' | 'int' | 'bool' | 'enum';
    value?: any;
    required: boolean;
    label: string;
    placeholder?: string;
    enumValues?: string[];
}
