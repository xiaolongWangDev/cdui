import {AnyComponentConfiguration} from "../model/types";
import {Injectable} from "@angular/core";
import {StoreConfiguration} from "../component/store/store.config";

type ConstructableJson = { _type: string, [field: string]: any };

@Injectable()
export class ConstructionService {
  private readonly typeMap: Map<string, (args: any) => AnyComponentConfiguration> = new Map<string, (args: any) => AnyComponentConfiguration>();

  constructor() {
    this.typeMap.set("StoreConfiguration", args => new StoreConfiguration(args));
  }

  registerType(type: string, creator: (args: any) => AnyComponentConfiguration){
    if(this.typeMap.has(type)){
      throw new Error(`${type} is already registered. Check for naming collision or bad code.`);
    }
    this.typeMap.set(type, creator);
  }

  constructFrom(json: ConstructableJson): any {
    if (!this.typeMap.has(json._type)) {
      throw new Error(`make sure ${json._type} is registered to DeserializationService`);
    }

    const constructedArgs: ConstructableJson = {_type: json._type}
    for (const [fieldKey, fieldValue] of Object.entries(json)) {
      if (fieldValue._type) {
        constructedArgs[fieldKey] = this.constructFrom(fieldValue);
      } else if (Array.isArray(fieldValue)) {
        const newArray = [];
        for (const arrayValue of fieldValue) {
          if(arrayValue._type) {
            newArray.push(this.constructFrom(arrayValue));
          } else {
            newArray.push(arrayValue);
          }
        }
        constructedArgs[fieldKey] = newArray;
      } else {
        constructedArgs[fieldKey] = fieldValue;
      }
    }

    const creator = this.typeMap.get(json._type);
    return creator(constructedArgs);
  }
}
