import { mockRequest, mockResponse } from "../../__mocks__";
import { getUsers } from "../../handler/users";


describe("getUsers", () => {
    it("should return an array of users", () => {
        getUsers(mockRequest, mockResponse);
        expect(mockResponse.send).
        toHaveBeenCalledWith([]);
    });
})