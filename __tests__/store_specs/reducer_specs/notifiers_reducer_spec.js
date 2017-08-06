import reducer from '../../../app/javascript/store/reducers/notifiersReducer';

const initialState = {
    notifierMode: false,
    submitting: false,
    submitted: false,
    submitError: null,
    start: "",
    end: "",
    submitObject: {
        plane_id: undefined,
        notifier_type: 'all',
    },
};

describe('Notifiers reducer', () => {
    it('should return correct initial state', () => {
        expect(reducer(undefined, {})).toEqual(initialState)
    });

    it('should handle SET_NOTIFIER_MODE correctly', () => {
        expect(
            reducer(undefined, {type: "SET_NOTIFIER_MODE"})
        ).toEqual({...initialState, notifierMode: true})
    });

    it('should handle SET_NOTIFIER_START correctly', () => {
        const payload = 'dummy_date';
        expect(
            reducer(undefined, { type: "SET_NOTIFIER_START", payload: payload })
        ).toEqual(
            {
                ...initialState,
                start: payload,
                submitObject: {
                    ...initialState.submitObject,
                    start: payload,
                }
            }
        );
    });

    it('should handle SET_NOTIFIER_END correctly', () => {
        const payload = 'dummy_date';
        expect(
            reducer(undefined, { type: "SET_NOTIFIER_END", payload: payload })
        ).toEqual(
            {
                ...initialState,
                end: payload,
                submitObject: {
                    ...initialState.submitObject,
                    end: payload,
                }
            }
        );
    });

    it('should handle SET_NOTIFIER_PLANE correctly', () => {
        const payload = { id: 1 };
        expect(
            reducer(undefined, { type: "SET_NOTIFIER_PLANE", payload: payload })
        ).toEqual(
            {
                ...initialState,
                submitObject: {
                    ...initialState.submitObject,
                    plane_id: payload.id,
                }
            }
        );
    });

    it('should handle SET_NOTIFIER_TYPE correctly', () => {
        const payload = 'notifier type here: all or any';
        expect(
            reducer(undefined, { type: "SET_NOTIFIER_TYPE", payload: payload })
        ).toEqual(
            {
                ...initialState,
                submitObject: {
                    ...initialState.submitObject,
                    notifier_type: payload,
                }
            }
        );
    });

    it('should handle SUBMIT_NOTIFIER_PENDING correctly', () => {
        expect(
            reducer(undefined, { type: "SUBMIT_NOTIFIER_PENDING" })
        ).toEqual(
            {
                ...initialState,
                submitting: true,
            }
        );
    });

    it('should handle SUBMIT_NOTIFIER_REJECTED correctly', () => {
        const payload = 'some error';
        expect(
            reducer(undefined, { type: "SUBMIT_NOTIFIER_REJECTED", payload: payload })
        ).toEqual(
            {
                ...initialState,
                submitting: false,
                submitError: payload
            }
        );
    });

    it('should handle SUBMIT_NOTIFIER_FULFILLED correctly', () => {
        expect(
            reducer(undefined, { type: "SUBMIT_NOTIFIER_FULFILLED" })
        ).toEqual(
            {
                ...initialState,
                submitting: false,
                submitted: true
            }
        );
    });

    it('should handle RESET_NOTIFIER correctly', () => {
        expect(
            reducer(
                [{some: "weird", kinda: 'state', up: "inere"}],
                { type: "RESET_NOTIFIER" }

            )
        ).toEqual(initialState);
    })
});