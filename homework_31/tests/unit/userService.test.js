const db = require('../../db/db');
const userService = require('../../services/userService');

jest.mock('../../db/db', () => ({
    users: [],
    orders: [],
}));

describe('UserService', () => {
    beforeEach(() => {
        db.users.length = 0;
    });

    test('Повертає користувача з правильним ID', async () => {
        const user = {id: '1', name: 'Ivan'};
        db.users.push(user);

        const found = await userService.getUserById('1');
        expect(found).toEqual(user);
    });

    test('Повертає null, якщо користувача не існує', async () => {
        const found = await userService.getUserById('999');
        expect(found).toBeUndefined();
    });
});
