export function autobind(
  _target: any,
  _methodName: string,
  descriptor: PropertyDescriptor
) {
  //get handle to original method
  const originalMethod = descriptor.value;
  //create adjusted propertyDescriptor
  const adjustedDescriptor: PropertyDescriptor = {
    //set it to configurable
    configurable: true,
    //create a getter
    get() {
      //create the bound function
      const boundFunction = originalMethod.bind(this);
      //return the bound function
      return boundFunction;
    }
  };
  //return the adjusted descriptor
  return adjustedDescriptor;
}
