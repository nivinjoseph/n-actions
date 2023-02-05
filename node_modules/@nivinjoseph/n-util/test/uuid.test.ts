import * as Assert from "assert";
import { Uuid } from "../src/uuid";
import "@nivinjoseph/n-ext";


suite("Uuid", () =>
{
    test("Created value must not be null, empty or whitespace", () =>
    {
        const uuid = Uuid.create();
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        Assert.ok(uuid != null && !uuid.isEmptyOrWhiteSpace());
    });

    test("Must create different values on multiple executions", () =>
    {
        const uuid1 = Uuid.create();
        const uuid2 = Uuid.create();
        Assert.notStrictEqual(uuid1, uuid2);
    });
});