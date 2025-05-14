const request = require('supertest');
const app = require('../../app');
const db = require('../../db/db');

beforeEach(() => {
    db.users.length = 0;
});

test('POST /users створює користувача', async () => {
    const res = await request(app).post('/users').send({
        name: 'Ivan',
        email: 'ivan@mail.com',
        password: '1234',
    });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.name).toBe('Ivan');
    expect(db.users.length).toBe(1);
});

test('GET /users/:id/orders/count працює', async () => {
    const user = {id: '1', name: 'Ivan', email: 'ivan@mail.com', password: '1234'};
    db.users.push(user);
    db.orders.push({id: 'o1', userId: '1'}, {id: 'o2', userId: '1'});

    const res = await request(app).get('/users/1/orders/count');
    expect(res.body.count).toBe(2);
});

test('Повертає 0 якщо замовлень немає', async () => {
    const user = {id: '2', name: 'Olya', email: 'olya@mail.com', password: '1234'};
    db.users.push(user);

    const res = await request(app).get('/users/2/orders/count');
    expect(res.body.count).toBe(0);
});

test('Повертає 404 для неіснуючого користувача', async () => {
    const res = await request(app).get('/users/999/orders/count');
    expect(res.statusCode).toBe(404);
});
