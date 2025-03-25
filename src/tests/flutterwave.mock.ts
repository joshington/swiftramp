


global.fetch = jest.fn(() => 
    Promise.resolve({
        ok: true,
        json: () => Promise.resolve({status: 'success', data: {}}),
    })
) as jest.Mock;

beforeEach(() => {
    (fetch as jest.Mock).mockClear();
});

export {};