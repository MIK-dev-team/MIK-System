import sinon from 'sinon';
import moment from 'moment';

import * as functions from '../../../app/javascript/services/logic/commonFunctions';

describe('CommonFunctions', () => {
    describe('has copyEventsList function', () => {
        it('returns a different but identical array', () => {
            const origArray = [{ first: "thing", another: 'dooey' }, { woo: 'eeye', foo: 'bar' }];
            expect(functions.copyEventsList(origArray)).toEqual(origArray);
            expect(functions.copyEventsList(origArray)).not.toBe(origArray);
        })
    });

    describe('has lastElementInListTemporaryType function', () => {
        it('that returns false when given empty array', () => {
            expect(functions.lastElementInListTemporaryType([])).toBe(false);
        });

        it('that returns false when given array with last element with opetus', () => {
            const inputArray = [{ some: 'thing', reservation_type: 'harraste'}, { id: 4, reservation_type: 'opetus' }];
            expect(functions.lastElementInListTemporaryType(inputArray)).toBe(false);
        });

        it('that returns false when given array with last element with harraste', () => {
            const inputArray = [{ some: 'thing', reservation_type: 'opetus'}, { id: 4, reservation_type: 'harraste' }];
            expect(functions.lastElementInListTemporaryType(inputArray)).toBe(false);
        });

        it('that returns true if last element of array has field reservation_type with value selected', () => {
            const inputArray = [{ some: 'thing', reservation_type: 'opetus'}, { id: 4, reservation_type: 'selected' }];
            expect(functions.lastElementInListTemporaryType(inputArray)).toBe(true);
        });

        it('that returns true if last element of array has field reservation_type with value observer', () => {
            const inputArray = [{ some: 'thing', reservation_type: 'opetus'}, { id: 4, reservation_type: 'observer' }];
            expect(functions.lastElementInListTemporaryType(inputArray)).toBe(true);
        });
    });

    describe('has timeIsInThePastAlert function', () => {
        let alertStub;
        beforeAll(() => {
            alertStub = sinon.stub(window, 'alert');
        });

        beforeEach(() => {
            alertStub.reset();
        });

        afterAll(() => {
            alertStub.restore();
        });

        it('triggers alert if time is in the past', () => {
            const inputTime = moment().subtract(1, 'day');
            expect(alertStub.notCalled).toBe(true);
            expect(functions.timeIsInThePastAlert(inputTime)).toBe(true);
            expect(alertStub.calledOnce).toBe(true);
            expect(alertStub.calledWithExactly('Älä varaa aikaa menneisyydestä!'));
        });

        it('returns false if time is in the future', () => {
            const inputTime = moment().add(1, 'minute');
            expect(functions.timeIsInThePastAlert(inputTime)).toBe(false);
            expect(alertStub.notCalled).toBe(true);
        });
    });

    describe('has overlappingReservationsExistForTimeSlot function', () => {
        let alertStub, reservations;
        beforeAll(() => {
            alertStub = sinon.stub(window, 'alert');
            reservations = [
                {
                    start: moment().add(1, 'hour').format(),
                    end: moment().add({hours: 5, minutes: 30}).format(),
                    reservation_type: 'harraste',
                },
                {
                    start: moment().add({days: 3, hours: 5}).format(),
                    end: moment().add({days: 3, hours: 7}).format(),
                    reservation_type: 'opetus',
                }
            ]
        });

        beforeEach(() => {
            alertStub.reset();
        });

        afterAll(() => {
            alertStub.restore();
        });

        it('returns true and triggers alert when given time has start which overlaps with existing reservation', () => {
            const timeSlot = {
                start: moment().add(4, 'hours').format(),
                end: moment().add(8, 'hours').format(),
            };
            expect(functions.overlappingReservationsExistForTimeSlot(timeSlot, reservations)).toBe(true);
            expect(alertStub.calledOnce).toBe(true);
            expect(alertStub.calledWithExactly("Et voi varata jo varattua aikaa")).toBe(true);
        });

        it('returns true and triggers alert when given time has end which overlaps with existing reservation', () => {
            const timeSlot = {
                start: moment().add({days: 3}).format(),
                end: moment().add({days: 3, hours: 6}).format(),
            };
            expect(functions.overlappingReservationsExistForTimeSlot(timeSlot, reservations)).toBe(true);
            expect(alertStub.calledOnce).toBe(true);
            expect(alertStub.calledWithExactly("Et voi varata jo varattua aikaa")).toBe(true);
        });

        it('returns true when given times overlap a whole existing reservations', () => {
            const timeSlot = {
                start: moment().add({days: 3}).format(),
                end: moment().add({days: 3, hours: 10}).format(),
            };

            expect(functions.overlappingReservationsExistForTimeSlot(timeSlot, reservations)).toBe(true);
            expect(alertStub.calledOnce).toBe(true);
            expect(alertStub.calledWithExactly("Et voi varata jo varattua aikaa")).toBe(true);
        });

        it('return false when last reservation in existing reservations is of type selected', () => {
            const timeSlot = {
                start: moment().add(4, 'hours').format(),
                end: moment().add(8, 'hours').format(),
            };

            expect(functions.overlappingReservationsExistForTimeSlot(timeSlot, [{reservations_type: 'selected'}])).toBe(false);
            expect(alertStub.notCalled).toBe(true);
        });

        it('return false when last reservation in existing reservations is of type observer', () => {
            const timeSlot = {
                start: moment().add(4, 'hours').format(),
                end: moment().add(8, 'hours').format(),
            };

            expect(functions.overlappingReservationsExistForTimeSlot(timeSlot, [{reservations_type: 'observer'}])).toBe(false);
            expect(alertStub.notCalled).toBe(true);
        });

        it('returns false when given end time is same as existing reservation start', () => {
            const timeSlot = {
                start: moment().format(),
                end: reservations[0].start,
            };

            expect(functions.overlappingReservationsExistForTimeSlot(timeSlot, reservations)).toBe(false);
            expect(alertStub.notCalled).toBe(true);
        });

        it('returns false when given start time is same as existing reservation end', () => {
            const timeSlot = {
                start: moment().add({days: 3, hours: 7}).format(),
                end: moment().add({days: 3, hours: 10}).format(),
            };

            expect(functions.overlappingReservationsExistForTimeSlot(timeSlot, reservations)).toBe(false);
            expect(alertStub.notCalled).toBe(true);
        });
    });
});