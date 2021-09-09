const hobbitModel = require("./hobbits-model");
const db = require("../../data/dbConfig");

const frodo = {name:"Frodo"};


test("Environment must be testing",()=>{
    expect(process.env.NODE_ENV).toBe("testing");
})

describe("test hobbitModel",()=>{
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
    describe("insert function",()=>{
        test("adds hobbits to db",async()=>{
            await hobbitModel.insert(frodo);
            expect(await db("hobbits")).toHaveLength(1);
        });
        test("returns Frodo after added to db",async()=>{
            expect(await hobbitModel.insert(frodo)).toMatchObject({id:1,...frodo});
        });
    });
    describe("update function",()=>{
        test("update the hobbits",async()=>{
            const [id] = await db("hobbits").insert(frodo);
            await hobbitModel.update(id,{...frodo,name:"FRODO"});
            const newFrodo = await db("hobbits").where({id}).first();
            expect(newFrodo.name).toBe("FRODO");
        })
        test("returns an updated hobbit",async()=>{
            const [id] = await db("hobbits").insert(frodo);
            const newFrodo = await hobbitModel.update(id,{...frodo,name:"FRODO"});
            expect(newFrodo).toMatchObject({...frodo,id,name:"FRODO"});
        })
    });
    describe("delete function",()=>{
        test("deletes from database successfully",async()=>{
            const [id] = await db("hobbits").insert(frodo);
            await hobbitModel.remove(id);
            expect(await db("hobbits").where({id})).toHaveLength(0);
        });
        test("returns the deleted object",async()=>{
            const [id] = await db("hobbits").insert(frodo);
            const removedFrodo = await hobbitModel.remove(id);
            expect(removedFrodo).toMatchObject({id,...frodo});
        })
    });
});