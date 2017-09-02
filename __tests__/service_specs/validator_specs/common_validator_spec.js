import moment from 'moment';
import sinon from 'sinon';

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

    describe('has minLength validator', () => {
        beforeAll(() => {
            input = '12345';
        });

        it('that rejects too short input', () => {
            expect(validators.minLength(6)(input)).toEqual('Pitää olla vähintään 6 merkkiä pitkä');
        });

        it('that accepts long enough input', () => {
            expect(validators.minLength(5)(input)).toEqual(undefined);
        });
    });

    describe('has containsExactly validator', () => {
        beforeAll(() => {
            input = 'asdf@asdf.fi';
        });

        it('that rejects input that has fewer occurrences of a character than required (more than one required)', () => {
            expect(validators.containsExactly('@', 2)(input)).toEqual('Tulee sisältää @ tasan 2 kertaa')
        });

        it('that rejects input that has more occurrences of a character than required (more than one required)', () => {
            expect(validators.containsExactly('@', 2)('asdf@asdf@@.fi')).toEqual('Tulee sisältää @ tasan 2 kertaa')
        });

        it('that accepts input with correct amount of provided characters (more than one required', () => {
            expect(validators.containsExactly('@', 2)('asdf@asdf@.fi')).toEqual(undefined)
        });

        it('that rejects input that has fewer occurrences of a character than required (one required)', () => {
            expect(validators.containsExactly('@', 1)('asdf[at]asdf.fi')).toEqual('Tulee sisältää @ tasan kerran')
        });

        it('that rejects input that has more occurrences of a character than required (one required)', () => {
            expect(validators.containsExactly('@', 1)(input + '@')).toEqual('Tulee sisältää @ tasan kerran')
        });

        it('that accepts input with correct amount of provided characters (one required)', () => {
            expect(validators.containsExactly('@', 1)(input)).toEqual(undefined);
        });
    });

    describe('has containsAtLeast validator', () => {
        beforeAll(() => {
            input = 'asdf@asdf.fi';
        });

        it('that rejects input that has fewer occurrences of a character than required (more than one required)', () => {
            expect(validators.containsAtLeast('.', 2)(input)).toEqual('Tulee sisältää . ainakin 2 kertaa')
        });

        it('that accepts input that has more occurrences of a character than required (more than one required)', () => {
            expect(validators.containsAtLeast('.', 2)(input + '....')).toEqual(undefined)
        });

        it('that accepts input with exact amount of provided characters (more than one required', () => {
            expect(validators.containsAtLeast('.', 2)(input + '.')).toEqual(undefined)
        });

        it('that rejects input that has fewer occurrences of a character than required (one required)', () => {
            expect(validators.containsAtLeast('.', 1)('asdf[at]asdffi')).toEqual('Tulee sisältää . ainakin kerran')
        });

        it('that accepts input that has more occurrences of a character than required (one required)', () => {
            expect(validators.containsAtLeast('.', 1)(input + '....')).toEqual(undefined)
        });

        it('that accepts input with correct amount of provided characters (one required)', () => {
            expect(validators.containsAtLeast('.', 1)(input)).toEqual(undefined);
        });
    });

    describe('has timeIsNotInThePast validator', () => {
        it('that rejects input that is in the distant past', () => {
            input = '2012-05-05T12:12:12Z';
            expect(validators.timeIsNotInThePast(input)).toBe(false);
        });

        it('that rejects input that was an hour ago', () => {
            input = moment().subtract(1, 'hour').format();
            expect(validators.timeIsNotInThePast(input)).toBe(false);
        });

        it('that accepts input that is right now', () => {
            let expectedDate = moment('2017-03-15T12:00:00').toDate();
            let clock = sinon.useFakeTimers(new Date(2017, 2, 15).getTime());
            clock.tick(60*60*17*1000);
            expect(validators.timeIsNotInThePast(moment().format())).toBe(true);
            clock.restore();
        });

        it('that accepts input that is in the near future', () => {
            input = moment().add(2, 'hours').format();
            expect(validators.timeIsNotInThePast(input)).toBe(true);
        });

        it('that accepts input that is in the far future', () => {
            input = moment().add(3, 'days').format();
            expect(validators.timeIsNotInThePast(input)).toBe(true);
        });
    });
});