const {test, expect} = require('@playwright/test');
const {Ajv} = require('ajv');
const addFormats = require('ajv-formats');
const ajv = new Ajv()
addFormats(ajv);

test('GET Request', async ({request}) => {
    //API Response Get
    const response = await request.get('https://reqres.in/api/users/2');
    
    const responseData = await response.json()
    expect(responseData.data.id).toBe(2)
    expect(responseData.data.first_name).toBe("Janet")
    expect(responseData.data.last_name).toBe("Weaver")
    expect(responseData.data.email).toBe("janet.weaver@reqres.in")
    
    const valid = ajv.validate(require('./jsonschema/get-object-schema.json'), responseData)
    
    if (!valid) {
        console.error('Validation Errors:', ajv.errors);
    } else {
        console.log('Data is valid');
    }
    //Assertion Get
    expect(valid).toBe(true);
    expect(response.status()).toBe(200);
});

test('POST Request', async ({request}) => {
    //API Response Post
    const headerData = {
        Accept: "application/json"
    }
    const bodyData = {
        "name": "morpheus",
        "job": "leader"
    }
    const response = await request.post('https://reqres.in/api/users',{
        headers: headerData,
        data: bodyData
    });
    const valid = ajv.validate(require('./jsonschema/post-object-schema.json'), bodyData)
    
    if (!valid) {
        console.error('Validation Errors:', ajv.errors);
    } else {
        console.log('Data is valid');
    }
    //Assertion Post
    expect(valid).toBe(true);
    expect(response.status()).toBe(201);
});

test('DELETE Request', async ({request}) => {
    //API Response Delete
    const headerData = {
        Accept: "application/json"
    }
    const bodyData = {
        "data": {
            "id": 2,
            "email": "janet.weaver@reqres.in",
            "first_name": "Janet",
            "last_name": "Weaver",
            "avatar": "https://reqres.in/img/faces/2-image.jpg"
        },
        "support": {
            "url": "https://reqres.in/#support-heading",
            "text": "To keep ReqRes free, contributions towards server costs are appreciated!"
        }
    }
    const response = await request.delete('https://reqres.in/api/users/2', {
        headers : headerData,
        data : bodyData
    });
    const valid = ajv.validate(require('./jsonschema/delete-object-schema.json'), bodyData)
    
    if (!valid) {
        console.error('Validation Errors:', ajv.errors);
    } else {
        console.log('Data is valid');
    }
    //Assertion Delete
    const responseBody = await response.text();
    expect(responseBody).toBe('');
    expect(valid).toBe(true);
    expect(response.status()).toBe(204);
});

test('PUT Request', async ({request}) => {
    //API Response Put
    const headerData = {
        Accept: "application/json"
    }
    const bodyData = {
        "name": "morpheus",
        "job": "zion resident"
    }
    const response = await request.put('https://reqres.in/api/users/2', {
        headers : headerData,
        data : bodyData
    });

    const valid = ajv.validate(require('./jsonschema/put-object-schema.json'), bodyData)

    if (!valid) {
        console.error('Validation Errors:', ajv.errors);
    } else {
        console.log('Data is valid');
    }
    //Assertion put
    expect(valid).toBe(true);
    expect(response.status()).toBe(200);
})

