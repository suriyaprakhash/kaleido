// export type Beans = Map<string, BeanInfo>;

// export interface BeansJson {
//     contexts: Map<string, Beans>
// }

// export interface BeanInfo {
//     aliases: string[],
//     scope: string,
//     type: string,
//     resource: string,
//     dependencies: string[],
// }
export interface BeanJson {
    contexts: Contexts; 
}

interface Contexts {
    [contextName: string]: Beans; // Use index signature for dynamic context names
  }
  
  interface Beans {
    [beanName: string]: BeanInfo; // Use index signature for dynamic bean names
  }
  
  interface BeanInfo {
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

  private  static isBeanInfo(obj: any): obj is BeanInfo {
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
  
  
  

/*
export class ActuatorBeansJsonTypeGuard {
    static isBeansJson(obj: any): obj is BeansJson {
        // Ensure basic structure:
        if (typeof obj !== 'object' || obj === null) {
          return false;
        }
      
        // Check for `contexts` property and its type:
        if (!('contexts' in obj)) {
        // if (!('contexts' in obj) || !(obj.contexts instanceof Map)) {    
          return false;
        }
      
        // // Validate each context within `contexts`:
        // for (const [contextName, beans] of obj.contexts.entries()) {
        //   if (!(beans instanceof Map)) {
        //     return false;
        //   }
      
        //   // Validate each bean within `beans`:
        //   for (const [beanName, beanInfo] of beans.entries()) {
        //     // Check for required properties of BeanInfo:
        //     for (const key in BeanInfo.prototype) {
        //       if (!beanInfo.hasOwnProperty(key)) {
        //         return false;
        //       }
        //     }
      
        //     // Additional validation for property types if needed (e.g., aliases as string[], scope as string, etc.)
        //   }
        // }
    
    
          // Validate each context within `contexts`:
            for (const [contextName, beans] of obj.contexts.entries()) {
                if (!(beans instanceof Map)) {
                    return false; // Early return if `beans` is not a Map
                }
    
                // Validate each bean within `beans`:
                for (const [beanName, beanInfo] of Array.from(beans.entries())) {
                // Check for required properties of BeanInfo (using type guard):
                if (!isBeanInfo(beanInfo)) {
                    return false; // Early return if `beanInfo` doesn't have required properties
                }
                }
            }
      
        return true;
      }
}


  // Improved type guard function for BeanInfo validation
function isBeanInfo(obj: any): obj is BeanInfo {
    // Ensure basic structure of a BeanInfo object:
    if (typeof obj !== 'object' || obj === null) {
      return false;
    }
  
    // Check for all required properties and their expected types (adjust as needed):
    return (
      Array.isArray(obj.aliases) &&
      typeof obj.scope === 'string' &&
      typeof obj.type === 'string' &&
      typeof obj.resource === 'string' &&
      Array.isArray(obj.dependencies)
    );
  }

  */