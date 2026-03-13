//// [tests/cases/conformance/jsdoc/importTag16.ts] ////

//// [a.ts]
export default interface Foo {}
export interface I {}

//// [b.js]
/** @import Foo, { I } from "./a" */

/**
 * @param {Foo} a
 * @param {I} b
 */
export function foo(a, b) {}




//// [a.d.ts]
export default interface Foo {
}
export interface I {
}
//// [b.d.ts]
/** @import Foo, { I } from "./a" */
/**
 * @param {Foo} a
 * @param {I} b
 */
export function foo(a: Foo, b: I): void;


//// [DtsFileErrors]


b.d.ts(6,24): error TS2304: Cannot find name 'Foo'.
b.d.ts(6,32): error TS2304: Cannot find name 'I'.


==== a.d.ts (0 errors) ====
    export default interface Foo {
    }
    export interface I {
    }
    
==== b.d.ts (2 errors) ====
    /** @import Foo, { I } from "./a" */
    /**
     * @param {Foo} a
     * @param {I} b
     */
    export function foo(a: Foo, b: I): void;
                           ~~~
!!! error TS2304: Cannot find name 'Foo'.
                                   ~
!!! error TS2304: Cannot find name 'I'.
    