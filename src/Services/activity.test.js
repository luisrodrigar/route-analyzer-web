import axios from 'axios';
import {
    EXCEPTION_MESSAGE_ERROR_EXPORT,
    EXCEPTION_MESSAGE_ERROR_SET_COLORS,
    EXCEPTION_MESSAGE_NOT_FOUND,
    exportAs,
    get,
    joinLaps,
    removeLaps,
    removePoint,
    setColors,
    splitLap
} from "./activity";
import {getRouteAnalyzerWebLaps} from "../__test__/test-utilities";

jest.mock('axios');

describe('Test suite for activity service',() => {
    const id = 123456789;
    const typeTcx = 'tcx';
    const typeGpx = 'tcx';
    const consoleLogMethod = console.log;
    const laps = getRouteAnalyzerWebLaps();
    const position = {
        lat: 32.4231,
        lng: -2.3342
    };
    beforeEach(() => {
        console.log = jest.fn(() => ({}));
    });
    afterEach(() => jest.resetAllMocks());
    afterAll(() => {
        console.log = consoleLogMethod;
    });
    it('Should get method return ', async () => {
        const result = {
            data: "Mock data"
        };
        axios.get.mockResolvedValueOnce(result);
        const received = await get(id);
        expect(received).toEqual(result.data);
        expect(console.log).not.toBeCalled();
    });
    it('Should get throwing exception', async () => {
        const error = {
            message: "Error Happen"
        };
        axios.get.mockRejectedValueOnce(error);
        try {
            await get(id)
        } catch (error) {
            expect(error.message).toEqual(EXCEPTION_MESSAGE_NOT_FOUND);
        }
        expect(console.log).toBeCalled();
    });
    it('Should export as any type', async () => {
        const result = {
            data: "Mock data"
        };
        axios.get.mockResolvedValueOnce(result);
        const received = await exportAs(id, 'whatever');
        expect(received).toEqual(result.data);
        expect(console.log).not.toBeCalled();
    });
    it('Should throwing error when export TCX file', async () => {
        const error = {
            message: "Error Happen"
        };
        axios.get.mockRejectedValueOnce(error);
        try {
            await exportAs(id, typeTcx)
        } catch (error) {
            expect(error.message).toEqual(EXCEPTION_MESSAGE_ERROR_EXPORT + typeTcx);
        }
        expect(console.log).toBeCalled();
    });
    it('Should throwing error when export GPX file', async () => {
        const error = {
            message: "Error Happen"
        };
        axios.get.mockRejectedValueOnce(error);
        try {
            await exportAs(id, typeGpx);
        } catch(error) {
            expect(error.message).toEqual(EXCEPTION_MESSAGE_ERROR_EXPORT + typeGpx);
        }
        expect(console.log).toBeCalled();
    });
    it('Should join laps', async () => {
        const res = {
            data: "Mock data"
        };
        axios.put.mockResolvedValueOnce(res);
        const received = await joinLaps(id, [laps[0], laps[1]]);
        expect(received).toEqual(res.data);
        expect(console.log).not.toBeCalled();
    });
    it('Should throwing error join laps method', async () => {
        const errorObj = {
            response: {
                data: {
                    description: "Some mocked error"
                }
            }
        };
        axios.put.mockRejectedValueOnce(errorObj);
        try {
            await joinLaps(id, [laps[0], laps[1]]);
        } catch(error) {
            expect(error.message).toEqual(errorObj.response.data.description);
        }
        expect(console.log).toBeCalled();
    });
    it('Should remove point method call', async () => {
        const res = {
            data: "Mocked data."
        };
        axios.put.mockResolvedValueOnce(res);
        const received = await removePoint(id, position, 1545403127000, 0);
        expect(received).toEqual(res.data);
        expect(console.log).not.toBeCalled();
    });
    it('Should throwing error remove point method', async () => {
        const errorObj = {
            response: {
                data: {
                    description: "Some mocked error"
                }
            }
        };
        axios.put.mockRejectedValueOnce(errorObj);
        try {
            await removePoint(id, position, 1545403127000, 0);
        } catch (error) {
            expect(error.message).toEqual(errorObj.response.data.description);
        }
        expect(console.log).toBeCalled();
    });

    it('Should split lap method call', async () => {
        const res = {
            data: "Mocked data."
        };
        axios.put.mockResolvedValueOnce(res);
        const received = await splitLap(id, position, 1545403127000, 0);
        expect(received).toEqual(res.data);
        expect(console.log).not.toBeCalled();
    });
    it('Should throwing error split lap method', async () => {
        const errorObj = {
            response: {
                data: {
                    description: "Some mocked error"
                }
            }
        };
        axios.put.mockRejectedValueOnce(errorObj);
        try {
            await splitLap(id, position, 1545403127000, 0);
        } catch (error) {
            expect(error.message).toEqual(errorObj.response.data.description);
        }
        expect(console.log).toBeCalled();
    });
    it('Should remove laps', async () => {
        const res = {
            data: "Mock data"
        };
        axios.put.mockResolvedValueOnce(res);
        const received = await removeLaps(id, [laps[0], laps[1]]);
        expect(received).toEqual(res.data);
        expect(console.log).not.toBeCalled();
    });
    it('Should throwing error remove laps method', async () => {
        const errorObj = {
            response: {
                data: {
                    description: "Some mocked error"
                }
            }
        };
        axios.put.mockRejectedValueOnce(errorObj);
        try {
            await removeLaps(id, [laps[0], laps[1]]);
        } catch(error) {
            expect(error.message).toEqual(errorObj.response.data.description);
        }
        expect(console.log).toBeCalled();
    });
    it('Should set colors', async () => {
        const res = {
            data: "Mock data"
        };
        axios.put.mockResolvedValueOnce(res);
        const received = await setColors(id, res.data);
        expect(received).toEqual(res);
        expect(console.log).not.toBeCalled();
    });
    it('Should set colors', async () => {
        const errorObj = {
            message: "Mock error"
        };
        axios.put.mockRejectedValueOnce(errorObj);
        try {
            await setColors(id, "Mocked data param");
        } catch (error) {
            expect(error.message).toEqual(EXCEPTION_MESSAGE_ERROR_SET_COLORS);
        }
        expect(console.log).toBeCalled();
    });
});
