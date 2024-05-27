import request from "supertest";
import {  type Express } from "express";
import { createApp } from "../createApp";

describe('users', () => {
    let app: Express = createApp();

    // ensures that app is free and connected to db first?***
    beforeAll(async () => {
        app = await createApp();
    });

    it('should return an empty array when getting /api/users', async () =>{
        const response = await request(app).get("/api/users");
        expect(response.body).toStrictEqual([]);
    });
})