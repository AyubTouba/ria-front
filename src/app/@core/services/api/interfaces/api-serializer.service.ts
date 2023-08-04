import { IResource } from './Iresource';

export interface ApiSerializer {
    fromJson(json: any): IResource;
    toJson(resource: IResource): any;
  }