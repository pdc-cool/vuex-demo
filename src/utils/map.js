export const mapInstance = new Map();

const symbolKey = Symbol('pdc');

const setReturn = mapInstance.set(symbolKey, () => {}).set(null, 'b');

console.log('----setReturn----', setReturn);
console.log('----has-----', mapInstance.has(symbolKey));
console.log('---delete----', mapInstance.delete(null));
console.log('----clear---', mapInstance.clear());
console.log('----mapInstance size----', mapInstance.size);
console.log('----mapInstance item value----', mapInstance.get(symbolKey));
console.log('----Symbol.iterator-----', mapInstance[Symbol.iterator]);
