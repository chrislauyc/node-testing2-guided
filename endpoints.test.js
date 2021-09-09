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
            const res = await request(server).get("/hobbits");
            expect(res.body[0]).toMatchObject({id,...frodo});
        });
    });
    describe("[GET] /hobbits/:id",()=>{
        test("responds with 200",async()=>{
            const [id] = await db("hobbits").insert(frodo);
            const res = await request(server).get(`/hobbits/${id}`);
            expect(res.status).toBe(200);
        });
        test("responds with the correct object",async()=>{
            const [id] = await db("hobbits").insert(frodo);
            const res = await request(server).get(`/hobbits/${id}`);
            expect(res.body).toMatchObject({id,...frodo});
        });
        test("responds with 404 if id does not exist",async()=>{
            const res = await request(server).get(`/hobbits/${id}`);
            expect(res.status).toBe(404);
        });
    });
    describe("[POST] /hobbits",()=>{
        test("hobbit added to db",async()=>{
            await request(server).post("/hobbits").send(sam)
            expect(await db("hobbits")).toHaveLength(1);
        });
        test("responds with 201",async()=>{
            const res = await request(server).post("/hobbits").send(sam)
            expect(res.status).toBe(201);
        });
        
        test("responds with the correct object",async()=>{
            const res = await request(server).post("/hobbits").send(sam);
            expect(res.body).toMatchObject({id:1,...sam});
        });
    });
    
    describe("[PUT] /hobbits/:id",()=>{
        test("responds with 200",async()=>{
            const [id] = await db("hobbits").insert(sam);
            const res = await request(server).put(`/hobbits/${id}`).send({...sam,name:"SAM"});
            expect(res.status).toBe(200);
        });
        test("updated hobbit",async()=>{
            const [id] = await db("hobbits").insert(sam);
            await request(server).put(`/hobbits/${id}`).send({...sam,name:"SAM"});
            const updatedHobbit = await db("hobbits").where({id}).first();
            expect(updatedHobbit).toMatchObject({...sam,id,name:"SAM"});
        });
        test("responds with the updated object",async()=>{
            const [id] = await db("hobbits").insert(sam);
            const res = await request(server).put(`/hobbits/${id}`).send({...sam,name:"SAM"});
            expect(res.body).toMatchObject({...sam,id,name:"SAM"});
        });
    });
    
    describe("[DELETE] /hobbits/:id",()=>{
        test("responds with 200",async()=>{
            const [id] = await db("hobbits").insert(sam);
            const res = await request(server).delete(`/hobbits/${id}`);
            expect(res.status).toBe(200);
        });
        test("deleted hobbit from db",async()=>{
            const [id] = await db("hobbits").insert(sam);
            await request(server).delete(`/hobbits/${id}`);
            expect(await db("hobbits")).toHaveLength(0);
        });
        test("responds with the deleted hobbit",async()=>{
            const [id] = await db("hobbits").insert(sam);
            const res = await request(server).delete(`/hobbits/${id}`);
            expect(res.body).toMatchObject({id,...sam});
        });
    });
})