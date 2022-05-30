import { LightboxTag } from './lightbox-tag';
export interface LightboxData {
    href: string;
    thumbnailHref: string;
    sequence?: string;
    title?: string;
    description?: string;
    tags?: LightboxTag[];
    metadata?: any;
}
