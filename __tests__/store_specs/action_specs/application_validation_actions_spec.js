/**
 * Created by owlaukka on 30/06/17.
 */
import moment from 'moment';

import * as validators from '../../../app/javascript/store/actions/applicationValidationActions'

let input;
describe('Application Validation', () => {
    describe('has username validation function', () => {
        it('that accepts long usernames', () => {
            input = 'longusername';
            expect(validators.usernameIsValid(input)).toBe(true);
        });

        it("that doesn't accept short usernames", () => {
            input = 'short';
            expect(validators.usernameIsValid(input)).toBe(false);
        });

        it("that doesn't accpet usernames with whitespaces", () => {
            input = 'user name';
            expect(validators.usernameIsValid(input)).toBe(false);
        })
    })

    describe('has email validation function', () => {
        it('that accepts strings that contain 1 @', () => {
            input = "asdf@asdf.fi";
            expect(validators.emailIsValid(input)).toBe(true);
        });

        it("that doesn't accept strings with more than one @", () => {
            input = "asdf@as@df.fi";
            expect(validators.emailIsValid(input)).toBe(false);
        });

        it("that doesn't accept strings without @", () => {
            input = "asdfasdf.fi";
            expect(validators.emailIsValid(input)).toBe(false);
        })
    });

    describe('has repeatEmail validation function', () => {
        it('that accepts parameters that match', () => {
            input = "asdf@asdf.fi";
            let input2 = "asdf@asdf.fi"
            expect(validators.repeatEmailIsValid(input, input2)).toBe(true);
        })

        it("that doesn't accept parameters that don't match", () => {
            input = "asdf@asdf.fi";
            let input2 = "asdf@asdf.com"
            expect(validators.repeatEmailIsValid(input, input2)).toBe(false);
        })
    });

    describe('has birthday validation function', () => {
        it('that accepts valid normal dates', () => {
            input = "1.1.2000";
            expect(validators.birthdayIsValid(input)).toBe(true);
        });

        it("that accepts valid leap-year dates", () => {
            input = "29.2.1992";
            expect(validators.birthdayIsValid(input)).toBe(true);
        });

        it('that accepts dates in D.M.YYYY format', () => {
            input = "01.01.1990";
            expect(validators.birthdayIsValid(input)).toBe(true);
        });

        it('that accepts dates in D.M.YY format', () => {
            input = "01.01.90";
            expect(validators.birthdayIsValid(input)).toBe(true);
        });

        it('that accepts old dates', () => {
            input = "01.01.1900";
            expect(validators.birthdayIsValid(input)).toBe(true);
        });

        it("that doesn't accept dates with days that are too high for that month", () => {
            input = "29.2.2003";
            expect(validators.birthdayIsValid(input)).toBe(false);
        });

        it("that doesn't accept non-existent months", () => {
            input = "12.13.1993";
            expect(validators.birthdayIsValid(input)).toBe(false);
            input = "12.0.1993";
            expect(validators.birthdayIsValid(input)).toBe(false);
        });

        it("that doesn't accept 0 as day", () => {
            input = "0.12.1993";
            expect(validators.birthdayIsValid(input)).toBe(false);
        });

        it("that doesn't accept future dates", () => {
            input = moment().add(1, 'day').format('D.M.YYYY');
            expect(validators.birthdayIsValid(input)).toBe(false);
        })
    })

    describe("has full name validation function", () => {
        it("that accepts correct names with number of special characters", () => {
            input = "John Stake";
            expect(validators.fullNameIsValid(input)).toBe(true);
        });

        it("that doesn't accept names with numbers", () => {
            input = "Best 4 Ever";
            expect(validators.fullNameIsValid(input)).toBe(false);
        });

        it("that doesn't accept special characters", () => {
            input = "some@character";
            expect(validators.fullNameIsValid(input)).toBe(false);
        })

        it("that doesn't accept empty string", () => {
            input = "";
            expect(validators.fullNameIsValid(input)).toBe(false);
        })
    });

    describe("has postal code validation function", () => {
        it("that accepts 5 digit numbers", () => {
            input = 12345;
            expect(validators.postalCodeIsValid(input)).toBe(true);
        });

        it("that doesn't accept too short codes", () => {
            input = 1234;
            expect(validators.postalCodeIsValid(input)).toBe(false);
        });

        it("that doesn't accept too long codes", () => {
            input = 123456;
            expect(validators.postalCodeIsValid(input)).toBe(false);
        });

        it("that doesn't accept strings containing anyting other than numbers", () => {
            input = "12345asdf";
            expect(validators.postalCodeIsValid(input)).toBe(false);
        });
    });

    describe("has city validator function", () => {
        it("that accepts one word city names", () => {
            input = "Helsinki";
            expect(validators.cityIsValid(input)).toBe(true);
        });

        it("that accepts city names that have several words", () => {
            input = "New York";
            expect(validators.cityIsValid(input)).toBe(true);
        });

        it("that accepts city names with a hyphen", () => {
            input = "Yli-Ii";
            expect(validators.cityIsValid(input)).toBe(true);
        });

        it("that doesn't accept city names that have numbers in them", () => {
            input = "Best4Ever";
            expect(validators.cityIsValid(input)).toBe(false);
        });

        it("that doesn't accept city names that have special characters in them", () => {
            input = "New@York";
            expect(validators.cityIsValid(input)).toBe(false);
        })
    })
});