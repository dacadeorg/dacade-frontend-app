import { setupServer } from 'msw/node';
import { handlers } from './__mocks__/provider/handlers';

const server = setupServer(...handlers);

jest.mock('query-string', () => ({
    stringify: jest.fn().mockImplementation((params) => {
        return Object.keys(params)
            .map(key => `${key}=${params[key]}`)
            .join('&');
    }),
}));

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());