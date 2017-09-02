/**
 * Created by owlaukka on 30/06/17.
 */
import moment from 'moment';

import * as validators from '../../../app/javascript/services/validators/membershipApplicationValidators'

let input;
describe('Application Validators', () => {
    describe('has isLongerThan8Characters validator', () => {
        it('that rejects short inputs', () => {
            input = 'asdfasd';
            expect(validators.isLongerThan8Characters(input)).toEqual('Pitää olla vähintään 8 merkkiä pitkä');
        });

        it('that accepts inputs that are exactly 8 characters', () => {
            input = 'asdfasdf';
            expect(validators.isLongerThan8Characters(input)).toEqual(undefined);
        });

        it('that accepts long inputs', () => {
            input = 'asdfyghasfjd9p3hwaepf89ywa';
            expect(validators.isLongerThan8Characters(input)).toEqual(undefined);
        });
    });

    describe('has containsAtOnce validator', () => {
        it('that rejects input without @-character', () => {
            input = 'asdfheadf';
            expect(validators.containsAtOnce(input)).toEqual('Tulee sisältää @ tasan kerran');
        });

        it('that rejects input with several @-characters', () => {
            input = 'asdf@asdf@asdf.fi';
            expect(validators.containsAtOnce(input)).toEqual('Tulee sisältää @ tasan kerran');
        });

        it('that accepts input that has exactly one @-character', () => {
            input = 'asdf@asdf.fi';
            expect(validators.containsAtOnce(input)).toEqual(undefined);
        });
    });

    describe('has containsAtLeast1Period validator', () => {
        it('that rejects input without a period', () => {
            input = 'asdfheadf';
            expect(validators.containsAtLeast1Period(input)).toEqual("Tulee sisältää . ainakin kerran");
        });

        it('that accepts input that has one period', () => {
            input = 'asdf.fi';
            expect(validators.containsAtLeast1Period(input)).toEqual(undefined);
        });

        it('that accepts input with several periods', () => {
            input = '.d.d.d.d';
            expect(validators.containsAtLeast1Period(input)).toEqual(undefined);
        });
    });

    describe('has birthdayIsInCorrectFormat validator', () => {
        it('that rejects when birthday is given in YYYY-MM-DD format', () => {
            input = '1990-06-04';
            expect(validators.birthdayIsInCorrectFormat(input)).toEqual('Päivämäärä on väärässä muodossa');
        });

        it('that rejects when birthday is given in YYYYMMDD format', () => {
            input = '19900604';
            expect(validators.birthdayIsInCorrectFormat(input)).toEqual('Päivämäärä on väärässä muodossa');
        });

        it('that rejects when birthday uses non-period dividers', () => {
            input = '4-3-1994';
            expect(validators.birthdayIsInCorrectFormat(input)).toEqual('Päivämäärä on väärässä muodossa');
        });

        it('that rejects invalid dates', () => {
            input = '34j9shf';
            expect(validators.birthdayIsInCorrectFormat(input)).toEqual('Päivämäärä on väärässä muodossa');
        });

        it('that accepts birthday in format DD.MM.YYYY', () => {
            input = '04.03.2001';
            expect(validators.birthdayIsInCorrectFormat(input)).toEqual(undefined);
        });

        it('that accepts birthday in format D.M.YYYY', () => {
            input = '4.3.2001';
            expect(validators.birthdayIsInCorrectFormat(input)).toEqual(undefined);
        });

        it('that accepts birthday in format D.M.YY', () => {
            input = '4.3.76';
            expect(validators.birthdayIsInCorrectFormat(input)).toEqual(undefined);
        });
    });

    describe('has birthdayIsNotTooOld validator', () => {
        it('that rejects date that is before 1900', () => {
            input = '12.12.1899';
            expect(validators.birthdayIsNotTooOld(input)).toEqual('Syntymäaikasi ei taida olla ennen 1900-lukua');
        });

        it('that accepts date that is exactly 1900', () => {
            input = '12.12.1900';
            expect(validators.birthdayIsNotTooOld(input)).toEqual(undefined);
        });
    });

    describe('has birthdayIsNotInTheFuture validator', () => {
        it('that rejects date that is in the future', () => {
            input = moment().add(1, 'day').format('D.M.YYYY');
            expect(validators.birthdayIsNotInTheFuture(input)).toEqual('Syntymäaikasi ei voi olla tulevaisuudessa');
        });

        it('that accepts today', () => {
            input = moment().format('D.M.YYYY');
            expect(validators.birthdayIsNotInTheFuture(input)).toEqual(undefined);
        });
    });

    describe('has nameIsValid validator', () => {
        it('that rejects name that contains special characters', () => {
            input = 'asdfh@&';
            expect(validators.nameIsValid(input)).toEqual('Nimi voi sisältää vain aakkosia, ääkkösiä ja välilyöntejä.');
        });

        it('that rejects name that contains numbers', () => {
            input = 'hgfd4gf';
            expect(validators.nameIsValid(input)).toEqual('Nimi voi sisältää vain aakkosia, ääkkösiä ja välilyöntejä.');
        });

        it("that accepts name that containers letters and '", () => {
            input = "Shäquille O'Neil";
            expect(validators.nameIsValid(input)).toEqual(undefined);
        });
    });

    describe('has postalCodeIsValid validator', () => {
        it('that rejects postal code that has letters', () => {
            input = 'asdfg';
            expect(validators.postalCodeIsValid(input)).toEqual('Postinumerossa pitää olla tasan viisi numeroa');
        });

        it('that rejects postal code that has less than 5 numbers', () => {
            input = 1234;
            expect(validators.postalCodeIsValid(input)).toEqual('Postinumerossa pitää olla tasan viisi numeroa');
        });

        it('that rejects postal code that has more than 5 numbers', () => {
            input = 123456;
            expect(validators.postalCodeIsValid(input)).toEqual('Postinumerossa pitää olla tasan viisi numeroa');
        });

        it('that accepts postal code with exactly 5 numbers', () => {
            input = 12345;
            expect(validators.postalCodeIsValid(input)).toEqual(undefined);
        });
    });

    describe('has cityIsValid validator', () => {
        it('that rejects inputs with special characters', () => {
            input = 'Coll plane@strand';
            expect(validators.cityIsValid(input)).toEqual('Tarkista, että kirjoitit kaupungin oikein');
        });

        it('that rejects inputs with numbers', () => {
            input = 'some4fun';
            expect(validators.cityIsValid(input)).toEqual('Tarkista, että kirjoitit kaupungin oikein');
        });

        it('that accepts input with only letters and spaces', () => {
            input = 'Some place';
            expect(validators.cityIsValid(input)).toEqual(undefined);
        });

        it('that accepts input with dashes', () => {
            input = 'Yli-Ii';
            expect(validators.cityIsValid(input)).toEqual(undefined);
        });
    });

    describe('has phoneNumberIsValid validator', () => {
        it('that rejects inputs with letters', () => {
            input = '04049735J8';
            expect(validators.phoneNumberIsValid(input)).toEqual('Tarkista, että kirjoitit puhelinnumerosi oikein');
        });

        it('that rejects inputs with special characters', () => {
            input = '1234%1234';
            expect(validators.phoneNumberIsValid(input)).toEqual('Tarkista, että kirjoitit puhelinnumerosi oikein');
        });

        it('that accepts inputs with only numbers', () => {
            input = '0501234567';
            expect(validators.phoneNumberIsValid(input)).toEqual(undefined);
        });

        it('that accepts inputs with whitespaces and numbers', () => {
            input = '050 123 4567';
            expect(validators.phoneNumberIsValid(input)).toEqual(undefined);
        });

        it('that accepts inputs with + and numbers', () => {
            input = '+123454561234';
            expect(validators.phoneNumberIsValid(input)).toEqual(undefined);
        })
    });
});