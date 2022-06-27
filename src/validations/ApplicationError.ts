import { response } from "express";

export default class ApplicationError implements Error {

    name: string = "Application Error";

    constructor(public message: string) {
        if (typeof message !== undefined) {
            console.error(`Error: ${message}`);
        }
    }

    toString(): string {
        return `${this.name} : ${this.message}`;
    }

}