import { IwebClient } from './Iwebclients';

export class WebClientSerializer {
    fromJson(json: any): IwebClient {
   
      return json;
    }
  
    toJson(webclient: IwebClient): any {
      return {
        id: webclient._id,
      };
    }
  }