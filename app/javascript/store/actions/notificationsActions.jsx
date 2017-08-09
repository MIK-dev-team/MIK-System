/**
 * Created by owlaukka on 09/08/17.
 */

export function resetNotifications() {
    return (dispatch) => {
        dispatch({type: "RESET_NOTIFICATIONS"});
    };
}