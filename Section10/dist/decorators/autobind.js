export function autobind(_target, _methodName, descriptor) {
    //get handle to original method
    const originalMethod = descriptor.value;
    //create adjusted propertyDescriptor
    const adjustedDescriptor = {
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
//# sourceMappingURL=autobind.js.map