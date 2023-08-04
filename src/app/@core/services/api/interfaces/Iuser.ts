import { IResource } from './Iresource';

export interface Iuser extends IResource {
    username:string;
    email:string;
    role:Role;
    webClients:Array<any> | null;
    password:string;
    is_active:boolean;
}
export enum Role {
    User ="User",
    WorkSpaceAdmin="WorkSpaceAdmin"
}