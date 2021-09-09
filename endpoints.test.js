const request = require("supertest");
const db = require("./data/dbConfig");
const server = require("./api/server");

const frodo = {name:"Frodo"};
const sam = {name:"Sam"};



describe("test api",()=>{
    beforeAll(async()=>{
        await db.migrate.rollback();
        await db.migrate.latest();
    });
    beforeEach(async()=>{
        await db("hobbits").truncate();
    });
    afterAll(async()=>{
        await db.destroy();
    });
    describe("[GET] /hobbits",()=>{
        test("responds with 200",async()=>{
            const res = await request(server).get("/hobbits");
            expect(res.status).toBe(200);
        });
        test("responds with the right number of hobbits",async()=>{
            await db("hobbits").insert(frodo);
            await db("hobbits").insert(sam);
            const res = await request(server).get("/hobbits");
            expect(res.body).toHaveLength(2);
        });
        test("responds with the right format of hobbits",async()=>{
            const [id] = await db("hobbits").insert(frodo);
            const res = await request(server).get(`/hobbits/${id}`);
            expect(res.body[0]).toMatchObject({id,...frodo});
        });
    });
    describe("[GET] /hobbits/:id",()=>{
        test("responds with 201",()=>{
            // const [id] = await db("hobbits").insert(frodo);
            // const res = 
        });
        test.todo("responds with the correct object");
        test.todo("responds with 404 if id does not exist");
    });
    describe("[POST] /hobbits",()=>{
        test("responds with the newly created object",async()=>{
            const res = await request(server).post("/hobbits").send(sam);
            expect(res.body).toMatchObject({id,...sam});
        });
        test.todo("hobbit added to db");
        test.todo("responds with the correct object");
    });
    
    describe("[PUT] /hobbits/:id",()=>{
        test.todo("put");
    });
    
    describe("[DELETE] /hobbits/:id",()=>{
        test.todo("delete");
    });
})