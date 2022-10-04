import { CookieMiddleware } from './cookie.middleware';

describe('CookieMiddleware', () => {
    it('should be defined', () => {
        expect(new CookieMiddleware()).toBeDefined();
    });
});
