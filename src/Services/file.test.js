import axios from  'axios';
import {get, upload} from "./file";

jest.mock('axios');

describe('Test suite for file service', () => {
    const consoleLogMethod = console.log;
    beforeEach(() => {
        console.log = jest.fn(() => ({}));
    });
    afterEach(() => jest.resetAllMocks());
    afterAll(() => {
        console.log = consoleLogMethod;
    });
    it('Should upload form data', async () => {
        const response = {
            data: [
                {
                    value1: "Some mocked value",
                    value2: "Some other value mocked"
                }
            ]
        };
        const input = {
            param: "Some mocked param"
        };
        axios.post.mockResolvedValueOnce(response);
        const received = await upload(input);
        expect(received).toEqual(response.data[0])
        expect(console.log).not.toBeCalled();
    });

    it('Should throwing exception upload form data method', async () => {
        const errorObj = {
            response: {
                data: {
                    description: "Error mocked"
                }
            }
        };
        const input = {
            param: "Some mocked param"
        };
        axios.post.mockRejectedValueOnce(errorObj);
        try {
            await upload(input);
        } catch (error) {
            expect(error.message).toEqual(errorObj.response.data.description)
        }
        expect(console.log).toBeCalled();
    });
    it('Should get activity method call', async () => {
        const response = {
            data: "some mocked response"
        };
        axios.get.mockResolvedValueOnce(response);
        const received = await get("123456789", "whatever");
        expect(received).toEqual(response.data)
        expect(console.log).not.toBeCalled();
    });

    it('Should throwing exception get activity method', async () => {
        const errorObj = {
            response: {
                data: {
                    description: "Error mocked"
                }
            }
        };
        const input = {
            param: "Some mocked param"
        };
        axios.get.mockRejectedValueOnce(errorObj);
        try {
            await get("123456789", "whatever");
        } catch (error) {
            expect(error.message).toEqual(errorObj.response.data.description)
        }
        expect(console.log).toBeCalled();
    });
});
