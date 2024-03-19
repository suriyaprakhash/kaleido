/*
export interface BeanJson {
  contexts: Contexts;
}

export interface Contexts {
  [contextName: string]: Beans; // Use index signature for dynamic context names
}

export interface Beans {
  [beanName: string]: BeanInfo; // Use index signature for dynamic bean names
}

export interface BeanInfo {
  aliases: string[];
  scope: string;
  type: string;
  resource?: string;
  dependencies: string[];
}

export class ActuatorBeansJsonTypeGuard {
  static isBeansJson(obj: any): obj is Contexts {
    // Check basic structure (object and non-null)
    if (typeof obj !== 'object' || obj === null) {
      return false;
    }

    // Ensure presence of the "contexts" property:
    if (!('contexts' in obj)) {
      return false;
    }

    // Validate "contexts" property type (Map is not suitable here)
    if (!(obj.contexts instanceof Object)) { // Object instead of Map for flexibility
      return false;
    }

    // Validate each context within "contexts":
    for (const [contextName, beans] of Object.entries(obj.contexts)) {
      if (!this.isBeans(beans)) { // Call nested type guard for "beans" validation
        return false;
      }
    }

    return true;
  }

  private static isBeans(obj: any): obj is Beans {
    // Ensure presence of the "beans" property:
    if (!('beans' in obj)) {
      return false;
    }

    // Validate "beans" property type (Object for dynamic bean names)
    if (!(obj.beans instanceof Object)) {
      return false;
    }

    // Validate each bean within "beans":
    for (const [beanName, beanInfo] of Object.entries(obj.beans)) {
      if (!this.isBeanInfo(beanInfo)) { // Call nested type guard for "beanInfo" validation
        return false;
      }
    }

    return true;
  }

  private static isBeanInfo(obj: any): obj is BeanInfo {
    // Ensure basic structure (object and non-null)
    if (typeof obj !== 'object' || obj === null) {
      return false;
    }

    // Check for required properties of BeanInfo:
    return (
      Array.isArray(obj.aliases) &&
      typeof obj.scope === 'string' &&
      typeof obj.type === 'string' &&
      //   typeof obj.resource === 'string' &&
      Array.isArray(obj.dependencies)
    );
  }
}
*/

///////////////////////////////////////////////////////


// export type Contexts = {
//   beans: Beans
// }

// {
//   "contexts":{
//    "kaleido-support":{
//      "beans":{
//       "endpointCachingOperationInvokerAdvisor":{
//         "aliases":[
          
//         ],
//         "scope":"singleton",
//         "type":"org.springframework.boot.actuate.endpoint.invoker.cache.CachingOperationInvokerAdvisor",
//         "resource":"class path resource [org/springframework/boot/actuate/autoconfigure/endpoint/EndpointAutoConfiguration.class]",
//         "dependencies":[
//          "org.springframework.boot.actuate.autoconfigure.endpoint.EndpointAutoConfiguration",
//          "environment"
//         ]
//       }
//      }
//    }
//   }
// } 

export interface BeansJson {
    contexts: Map<string, Beans>
}

export interface Beans {
  beans: Map<string, BeanInfo>;
}

export interface BeanInfo {
    aliases: string[],
    scope: string,
    type: string,
    resource: string,
    dependencies: string[],
}

export class ActuatorBeansJsonTypeGuard {
  static isBeansJson(obj: BeansJson) {
    // Check basic structure (object and non-null)
    if (typeof obj !== 'object' || obj === null) {
      return false;
    }

    // Ensure presence of the "contexts" property:
    if (!('contexts' in obj)) {
      return false;
    }

    // Validate "contexts" property type (Map is not suitable here)
    if (!(obj.contexts instanceof Object)) { // Object instead of Map for flexibility
      return false;
    }

    // Validate each context within "contexts":
    // for (const [contextName, beans] of Object.entries(obj.contexts)) {
    //   if (!this.isBeans(beans)) { // Call nested type guard for "beans" validation
    //     return false;
    //   }
    // }
    // const beans: Map<string, Beans> = obj.contexts;
    // beans.forEach((value, key) => {
    //   console.log(key, value);
    // });


    // Validate each context within "contexts":
    if(!(Object.entries(obj.contexts).length > 0)) {
      return false;
    }

    // extract contextMap -> kaleido-support: { beans: {...}}
    let contextMap: Map<string, Beans> = new Map(Object.entries(obj.contexts));

    // extract and validate beans object entries
    contextMap.forEach((contextValue: Beans, contextName: string) => {
      if(!(contextValue.beans instanceof Object)) {
        return false;
      } 
    });

    // let contextMap: Map<string, Beans> = new Map(Object.entries(obj.contexts));
    // contextMap.forEach((contextValue: Beans, contextName: string) => {
    //   console.log(contextName);
    //   let beanMap: Map<string, BeanInfo> = new Map(Object.entries(contextValue.beans));
    //   beanMap.forEach((beanValue: BeanInfo, beanName: string) => {
    //     console.log(beanName);
    //     console.log(beanValue.dependencies);
    //   })
    // });

    return true;

  }
}