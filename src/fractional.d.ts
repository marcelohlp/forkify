declare module "fractional" {
    export class Fraction {
        constructor(numerator: number | string);
        numerator: number;
        denominator: number;
        toString(): string;
    }
}
