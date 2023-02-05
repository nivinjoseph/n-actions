import * as Assert from "assert";
import { Serializable, serialize, Deserializer, deserialize } from "../src/serializable";
import { given } from "@nivinjoseph/n-defensive";


type AddressSchema = {
    street: string;
    locality: string;
};

class Address extends Serializable<AddressSchema>
{
    private readonly _street: string;
    private readonly _city: string;

    @serialize
    public get street(): string { return this._street; }

    @serialize("locality")
    public get city(): string { return this._city; }

    public get fullAddress(): string { return `${this._street}, ${this._city}`; }


    public constructor(data: AddressSchema)
    {
        super(data);
        
        const { street, locality: city } = data;

        given(street, "street").ensureHasValue().ensureIsString();
        this._street = street;

        given(city, "city").ensureHasValue().ensureIsString();
        this._city = city;
    }
    
    public static deserialize({ street, locality: city }: AddressSchema): Address
    {
        console.log("Calling custom address deserialize");
        
        return new Address({ street, locality: city });
    }
}

interface FullName
{
    firstName: string;
    lastName: string;
}

@deserialize
class Dummy extends Serializable
{
    public constructor()
    {
        super({});
    }
    
    public foo(): void
    {
        console.log("I am foo");
    }
}

class Employee extends Serializable
{
    private readonly _id: string;
    private readonly _name: FullName;
    private readonly _address: Address;
    private readonly _dummy: Dummy;
    
    @serialize
    public get id(): string { return this._id; }
    
    @serialize
    public get name(): FullName { return this._name; }
    
    @serialize
    public get address(): Address { return this._address; }
    
    @serialize
    public get dummy(): Dummy { return this._dummy; }
    
    
    public constructor(data: Pick<Employee, "id" | "name" | "address" | "dummy">)
    {
        super(data);
        
        const { id, name, address, dummy } = data;
        
        given(id, "id").ensureHasValue().ensureIsString();
        this._id = id;
        
        given(name, "name").ensureHasValue().ensureIsObject();
        this._name = name;
        
        given(address, "address").ensureHasValue().ensureIsObject().ensureIsType(Address);
        this._address = address;
        
        given(dummy, "dummy").ensureHasValue().ensureIsObject().ensureIsType(Dummy);
        this._dummy = dummy;
    }
}


suite("Serializable", () =>
{
    suite("serialize", () =>
    {
        test("basic", () =>
        {
            // console.log(typeof Employee);
            
            const testObj = new Employee({
                id: "1",
                name: {
                    firstName: "niv",
                    lastName: "jo"
                },
                address: new Address({
                    street: "911 Roger rd",
                    locality: "Waterloo"
                }),
                dummy: new Dummy()
            });

            Assert.strictEqual(testObj.name.firstName, "niv");
            Assert.strictEqual(testObj.address.city, "Waterloo");
            
            const serialized = testObj.serialize();
            
            Assert.strictEqual(testObj.name.firstName, "niv");
            Assert.strictEqual(testObj.address.city, "Waterloo");
            
            // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
            Assert.ok(serialized != null);
            
            // console.log(serialized);
            
            const testObj2 = new Employee({
                id: "1",
                name: {
                    firstName: "niv",
                    lastName: "jo"
                },
                address: new Address({
                    street: "911 Roger rd",
                    locality: "Waterloo"
                }),
                dummy: new Dummy()
            });
            
            const serialized2 = testObj2.serialize();
            
            Assert.deepStrictEqual(serialized2, serialized);
            
            const deserialized = Deserializer.deserialize<Employee>(serialized);
            // console.log(deserialized);
            Assert.ok(deserialized instanceof Employee);
            
            const deserialized2 = Deserializer.deserialize<Employee>(serialized2);
            
            Assert.ok(deserialized2 instanceof Employee);
            
            Assert.deepStrictEqual(deserialized2, deserialized);
            
        });
    });
});