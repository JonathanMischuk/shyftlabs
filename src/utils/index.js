// lint doesn't like the base prototype version of hasOwnProperty
// because not all objects may have this method on its prototype
export const hasOwnProperty = (obj, prop) => {
    return Object.prototype.hasOwnProperty.call(obj, prop);
};