import { mockRequest, mockResponse } from "../../__mocks__";
import { getUserByUsername } from "../../handler/users";


describe("getUsers", () => {
    it("should return an array of users", () => {
        getUserByUsername(mockRequest, mockResponse);
        expect(mockResponse.send).
        toHaveBeenCalledWith([]);
    });
})