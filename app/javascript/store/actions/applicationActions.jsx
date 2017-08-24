/**
 * Created by owlaukka on 30/06/17.
 */
import React from 'react';

import AjaxService from '../../services/ajax_service';

export function submitMembershipApp(values) {
    return (dispatch) => {
        dispatch({type: "SUBMIT_APPLICATION_PENDING"});
        window.scrollTo(0, 0);

        AjaxService.post(
            '/api/v1/membership_applications',
            values,
            (status, data) => {
                const success = "Hakemuksenne on lähetetty onnistuneesti.",
                    text = 'Vahvistussähköposti on lähetetty antamaanne sähköpostiosoitteeseen. ' +
                        'Teidät uudelleenohjataan etusivulle piakkoin';
                dispatch({type: "SUBMIT_APPLICATION_FULFILLED"});
                dispatch({type: "SET_SUCCESS", payload: { header: success, text: text}});
                setTimeout(() => window.location.replace('/'), 5000);
            },
            (status, err) => {
                dispatch({type: "SUBMIT_APPLICATION_REJECTED"});
                dispatch({type: "SET_ERROR", payload: { header: 'Lähetysvirhe', data: err } });
            }
        );
    }
}