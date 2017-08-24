import * as validators from '../../../app/javascript/services/validators/commonValidators';

describe('Common validators', () => {
    let input;

    describe('has required validator', () => {
        it('that rejects empty string', () => {
            input = '';
            expect(validators.required(input)).toEqual("Ei voi olla tyhjä");
        });

        it('that rejects null', () => {
            input = null;
            expect(validators.required(input)).toEqual("Ei voi olla tyhjä");
        });

        it('accepts one character', () => {
            input = 'a';
            expect(validators.required(input)).toEqual(undefined);
        });

        it('accepts string with special characters', () => {
            input = 'asdf4%@+';
            expect(validators.required(input)).toEqual(undefined);
        });
    });

    describe('has doesNotContainSpaces validator', () => {
        it('that rejects singular whitespace', () => {
            input = ' ';
            expect(validators.doesNotContainSpaces(input)).toEqual('Ei voi sisältää välilyöntejä');
        });

        it('that rejects input with a whitespace in the middle of it', () => {
            input = 'one two';
            expect(validators.doesNotContainSpaces(input)).toEqual('Ei voi sisältää välilyöntejä');
        });

        it('that accepts words without whitespaces', () => {
            input = 'asdhf87@#';
            expect(validators.doesNotContainSpaces(input)).toEqual(undefined);
        });
    });
});