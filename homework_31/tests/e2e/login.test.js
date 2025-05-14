const request = require('supertest');

const app = require('../../app');
const db = require('../../db/db');

beforeEach(() => {
    db.users.length = 0;
});

test('Повний сценарій логіну', async () => {
    await request(app).post('/users').send({
        name: 'Ivan',
        email: 'ivan@mail.com',
        password: '1234',
    });

    const login = await request(app).post('/login').send({
        email: 'ivan@mail.com',
        password: '1234',
    });

    expect(login.statusCode).toBe(200);
    const token = login.body.token;

    const profile = await request(app)
        .get('/profile')
        .set('Authorization', `Bearer ${token}`);

    expect(profile.statusCode).toBe(200);
    expect(profile.body.email).toBe('ivan@mail.com');

    const unauthorized = await request(app).get('/profile');
    expect(unauthorized.statusCode).toBe(401);
});
