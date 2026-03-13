//// [tests/cases/conformance/jsdoc/importTag19.ts] ////

//// [a.ts]
export interface Foo {}

//// [b.js]
/**
 * @import { Foo }
 * from "./a"
 */

/**
 * @param {Foo} a
 */
export function foo(a) {}




//// [a.d.ts]
export interface Foo {
}
//// [b.d.ts]
/**
 * @import { Foo }
 * from "./a"
 */
/**
 * @param {Foo} a
 */
export function foo(a: Foo): void;


//// [DtsFileErrors]


b.d.ts(8,24): error TS2304: Cannot find name 'Foo'.


==== a.d.ts (0 errors) ====
    export interface Foo {
    }
    
==== b.d.ts (1 errors) ====
    /**
     * @import { Foo }
     * from "./a"
     */
    /**
     * @param {Foo} a
     */
    export function foo(a: Foo): void;
                           ~~~
!!! error TS2304: Cannot find name 'Foo'.
    