import { ILogRequest } from './ILogRequest';

export class LogRequestSerializer {
    fromJson(json: any): ILogRequest {

      return json;
    }
  
    toJson(logrequest: ILogRequest): any {
      return {
        id: logrequest._id,
      };
    }
  }