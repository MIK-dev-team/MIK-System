/**
 * Created by owlaukka on 30/06/17.
 */
import moment from 'moment';

import { validationStateForForm } from '../../../app/javascript/store/actions/applicationValidationActions'

let input;
describe('Application Validation', () => {
    describe('has username validation function', () => {
        it('that accepts long usernames', () => {
            input = 'longusername';
            expect(validationStateForForm("username", input)).toEqual('success');
        });

        it("that doesn't accept short usernames", () => {
            input = 'short';
            expect(validationStateForForm("username", input)).toEqual('error');
        });

        it("that doesn't accpet usernames with whitespaces", () => {
            input = 'user name';
            expect(validationStateForForm("username", input)).toEqual('error');
        })
    })

    describe('has email validation function', () => {
        it('that accepts strings that contain 1 @', () => {
            input = "asdf@asdf.fi";
            expect(validationStateForForm("email", input)).toEqual('success');
        });

        it("that doesn't accept strings with more than one @", () => {
            input = "asdf@as@df.fi";
            expect(validationStateForForm("email", input)).toEqual('error');
        });

        it("that doesn't accept strings without @", () => {
            input = "asdfasdf.fi";
            expect(validationStateForForm("email", input)).toEqual('error');
        })
    });

    describe('has repeatEmail validation function', () => {
        it('that accepts parameters that match', () => {
            input = "asdf@asdf.fi";
            let input2 = "asdf@asdf.fi"
            expect(validationStateForForm("repeatEmail", input, input2)).toEqual('success');
        })

        it("that doesn't accept parameters that don't match", () => {
            input = "asdf@asdf.fi";
            let input2 = "asdf@asdf.com"
            expect(validationStateForForm("repeatEmail", input, input2)).toEqual('error');
        })
    });

    describe('has birthday validation function', () => {
        it('that accepts valid normal dates', () => {
            input = "1.1.2000";
            expect(validationStateForForm("birthday", input)).toEqual('success');
        });

        it("that accepts valid leap-year dates", () => {
            input = "29.2.1992";
            expect(validationStateForForm("birthday", input)).toEqual('success');
        });

        it('that accepts dates in D.M.YYYY format', () => {
            input = "01.01.1990";
            expect(validationStateForForm("birthday", input)).toEqual('success');
        });

        it('that accepts dates in D.M.YY format', () => {
            input = "01.01.90";
            expect(validationStateForForm("birthday", input)).toEqual('success');
        });

        it('that accepts old dates', () => {
            input = "01.01.1900";
            expect(validationStateForForm("birthday", input)).toEqual('success');
        });

        it("that doesn't accept dates with days that are too high for that month", () => {
            input = "29.2.2003";
            expect(validationStateForForm("birthday", input)).toEqual('error');
        });

        it("that doesn't accept non-existent months", () => {
            input = "12.13.1993";
            expect(validationStateForForm("birthday", input)).toEqual('error');
            input = "12.0.1993";
            expect(validationStateForForm("birthday", input)).toEqual('error');
        });

        it("that doesn't accept 0 as day", () => {
            input = "0.12.1993";
            expect(validationStateForForm("birthday", input)).toEqual('error');
        });

        it("that doesn't accept future dates", () => {
            input = moment().add(1, 'day').format('D.M.YYYY');
            expect(validationStateForForm("birthday", input)).toEqual('error');
        })
    })

    describe("has full name validation function", () => {
        it("that accepts correct names with number of special characters", () => {
            input = "John Stake";
            expect(validationStateForForm("fullName", input)).toEqual('success');
        });

        it("that doesn't accept names with numbers", () => {
            input = "Best 4 Ever";
            expect(validationStateForForm("fullName", input)).toEqual('error');
        });

        it("that doesn't accept special characters", () => {
            input = "some@character";
            expect(validationStateForForm("fullName", input)).toEqual('error');
        })

        it("that doesn't accept empty string", () => {
            input = "";
            expect(validationStateForForm("fullName", input)).toEqual(null);
        })
    });

    describe("has postal code validation function", () => {
        it("that accepts 5 digit numbers", () => {
            input = 12345;
            expect(validationStateForForm("postalCode", input)).toEqual('success');
        });

        it("that doesn't accept too short codes", () => {
            input = 1234;
            expect(validationStateForForm("postalCode", input)).toEqual('error');
        });

        it("that doesn't accept too long codes", () => {
            input = 123456;
            expect(validationStateForForm("postalCode", input)).toEqual('error');
        });

        it("that doesn't accept strings containing anyting other than numbers", () => {
            input = "12345asdf";
            expect(validationStateForForm("postalCode", input)).toEqual('error');
        });
    });

    describe("has city validator function", () => {
        it("that accepts one word city names", () => {
            input = "Helsinki";
            expect(validationStateForForm("city", input)).toEqual('success');
        });

        it("that accepts city names that have several words", () => {
            input = "New York";
            expect(validationStateForForm("city", input)).toEqual('success');
        });

        it("that accepts city names with a hyphen", () => {
            input = "Yli-Ii";
            expect(validationStateForForm("city", input)).toEqual('success');
        });

        it("that doesn't accept city names that have numbers in them", () => {
            input = "Best4Ever";
            expect(validationStateForForm("city", input)).toEqual('error');
        });

        it("that doesn't accept city names that have special characters in them", () => {
            input = "New@York";
            expect(validationStateForForm("city", input)).toEqual('error');
        });
    });

    describe("has phone number validator function", () => {
        it("that accepts phone numbers that have numbers, or characters: +, -, ( or )", () => {
            input = "+35850-1234567";
            expect(validationStateForForm("phoneNumber", input)).toEqual('success');
        });

        it("that doesn't accept phone numbers with letters in them", () => {
            input = "0505O1234";
            expect(validationStateForForm("phoneNumber", input)).toEqual('error');
        });

        it("that doesn't accept phone numbers with special characters in them", () => {
            input = "@358501234567";
            expect(validationStateForForm("phoneNumber", input)).toEqual('error');
        })
    });
});