import * as normalizers from '../../../app/javascript/services/normalizers/normalizers';

describe('Normalizer', () => {

    it('normalizeTimePicker returns correct new time', () => {
        expect(normalizers.normalizeTimePicker(54000)(54000, "2017-05-05T12:00:00")).toEqual('2017-05-05T15:00:00+00:00')
    });

    it('normalizeDatePicker returns correct new time', () => {
        expect(normalizers.normalizeDatePicker('2017-05-05T21:00:00+00:00')('2017-05-05T21:00:00+00:00', '2017-04-08T15:00:00+00:00')).toEqual('2017-05-05T15:00:00+00:00')
    });
});