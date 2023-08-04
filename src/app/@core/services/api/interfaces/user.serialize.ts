import { Iuser } from './Iuser';

export class UsertSerializer {
    fromJson(json: any): Iuser {

      return json;
    }
  
    toJson(user: Iuser): any {
      return user;
    }
  }