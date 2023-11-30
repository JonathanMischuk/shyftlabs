import { hasOwnProperty } from "..";

it('hasOwnProperty returns true', () => {
    const obj = {
        a: '',
        b: '',
        c: ''
    };

    expect(hasOwnProperty(obj, 'a')).toBe(true);
    expect(hasOwnProperty(obj, 'b')).toBe(true);
    expect(hasOwnProperty(obj, 'c')).toBe(true);
    expect(hasOwnProperty(obj, 'd')).toBe(false);
    expect(hasOwnProperty(obj, 'y')).toBe(false);
    expect(hasOwnProperty(obj, 'zebra')).toBe(false);
});