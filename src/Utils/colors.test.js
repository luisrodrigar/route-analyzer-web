import * as colorsOperations from './colors';
import {
    amber,
    blue, blueGrey, brown,
    cyan, deepOrange,
    deepPurple,
    green, grey,
    indigo,
    lightBlue,
    lightGreen, lime, orange,
    pink,
    purple,
    red,
    teal, yellow
} from "@material-ui/core/colors";

import {darkPalette, lightPalette} from "./colors";

import { mockRandom, resetMockRandom } from 'jest-mock-random';

describe("Colors operations test suite.", () => {
    afterEach(() => {
        resetMockRandom();
    });
    it("Test get color object method", () => {
        expect(colorsOperations.getColorObject("Red")).toBe(red);
        expect(colorsOperations.getColorObject("Pink")).toBe(pink);
        expect(colorsOperations.getColorObject("Purple")).toBe(purple);
        expect(colorsOperations.getColorObject("Deep Purple")).toBe(deepPurple);
        expect(colorsOperations.getColorObject("Indigo")).toBe(indigo);
        expect(colorsOperations.getColorObject("Blue")).toBe(blue);
        expect(colorsOperations.getColorObject("Light Blue")).toBe(lightBlue);
        expect(colorsOperations.getColorObject("Cyan")).toBe(cyan);
        expect(colorsOperations.getColorObject("Teal")).toBe(teal);
        expect(colorsOperations.getColorObject("Green")).toBe(green);
        expect(colorsOperations.getColorObject("Light Green")).toBe(lightGreen);
        expect(colorsOperations.getColorObject("Lime")).toBe(lime);
        expect(colorsOperations.getColorObject("Yellow")).toBe(yellow);
        expect(colorsOperations.getColorObject("Amber")).toBe(amber);
        expect(colorsOperations.getColorObject("Orange")).toBe(orange);
        expect(colorsOperations.getColorObject("Deep Orange")).toBe(deepOrange);
        expect(colorsOperations.getColorObject("Brown")).toBe(brown);
        expect(colorsOperations.getColorObject("Grey")).toBe(grey);
        expect(colorsOperations.getColorObject("Blue Grey")).toBe(blueGrey);
    });
    it("Test get random color when param color does not fit", () => {
        mockRandom([0.1052631579]);
        expect(colorsOperations.getColorObject('Do not know the name')).toBe(purple);
    });
    it("Test get random array colors", () => {
        const colorDark1 = darkPalette[0];
        const mathValue1 = 0.0 / darkPalette.length;
        const colorLight1 = lightPalette[1];
        const mathValue2 = 1.0 / lightPalette.length;
        const color1 = deepPurple;
        const mathValue3 = 3.0 / 19;

        const colorDark2 = darkPalette[1];
        const mathValue4 = 1.0 / darkPalette.length;
        const colorLight2 = lightPalette[2];
        const mathValue5 = 2.0 / lightPalette.length;
        const color2 = teal;
        const mathValue6 = 8.0 / 19;

        const colorDark3 = darkPalette[2];
        const mathValue7 = 2.0 / darkPalette.length;
        const colorLight3 = lightPalette[0];
        const mathValue8 = 0.0 / lightPalette.length;
        const color3 = amber;
        const mathValue9 = 13.0 / 19;

        mockRandom([
            mathValue1, mathValue2, mathValue3,
            mathValue4, mathValue5, mathValue6,
            mathValue7, mathValue8, mathValue9
        ]);

        const result = colorsOperations.getColorRandom(3, []);

        const expectedResult = [
            [color1[colorDark1], color1[colorLight1]],
            [color2[colorDark2], color2[colorLight2]],
            [color3[colorDark3], color3[colorLight3]]
        ];
        expect(result).toStrictEqual(expectedResult);
    })
});
