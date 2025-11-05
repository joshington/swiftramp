

import { generateTransactionReference } from "../utils/chargeFlutterwave";


describe('generateTransactionReference', () => {
    it('should generate a reference hash with default prefix', () => {
        const ref = generateTransactionReference();
        expect(ref).toMatch(/^TX_[a-zA-Z0-9]{8}$/);
    });

    it('should generate a reference with custom prefix', () => {
        const ref = generateTransactionReference('ORDER');
        expect(ref).toMatch(/^ORDER_[a-zA-Z0-9]{8}$/);
    });

    it('should generate unique references', () => {
        const ref1 = generateTransactionReference();
        const ref2 = generateTransactionReference();
        expect(ref1).not.toBe(ref2);
    })
})