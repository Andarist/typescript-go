//// [tests/cases/compiler/jsDeclarationEmitExportDeclareElision.ts] ////

//// [index.js]
/** @type {number} */
export const value = 1;

export class Example {
    method() {}
}




//// [index.d.ts]
/** @type {number} */
export const value: number;
export class Example {
    method(): void;
}
