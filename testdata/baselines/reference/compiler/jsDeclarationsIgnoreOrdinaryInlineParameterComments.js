//// [tests/cases/compiler/jsDeclarationsIgnoreOrdinaryInlineParameterComments.ts] ////

//// [index.js]
/**
 * @param {string} a
 * @param {string} b
 */
export function f(a, /* ordinary */ b) {}


//// [index.js]
/**
 * @param {string} a
 * @param {string} b
 */
export function f(a, /* ordinary */ b) { }


//// [index.d.ts]
/**
 * @param {string} a
 * @param {string} b
 */
export function f(a: string, b: string): void;
