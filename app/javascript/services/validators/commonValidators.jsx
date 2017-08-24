/**
 * Created by owlaukka on 24/08/17.
 */
export const required = value =>
    value ? undefined : 'Ei voi olla tyhjä'

export const doesNotContainSpaces = value =>
    value && value.indexOf(' ') > -1 ? 'Ei voi sisältää välilyöntejä' : undefined

export const minLength = min => value =>
    value && value.length < min ? `Pitää olla vähintään ${min} merkkiä pitkä` : undefined

export const containsExactly = (character, times) => value => {
    const re = new RegExp("[^" + character + "]", "g");
    let copy = (' ' + value).slice(1);
    if (times === 1) {
        return copy.replace(re, "").length !== times ? `Tulee sisältää ${character} tasan kerran` : undefined
    }
    return copy.replace(re, "").length !== times ? `Tulee sisältää ${character} tasan ${times} kertaa` : undefined
};

export const containsAtLeast = (character, times) => value => {
    const re = new RegExp("[^" + character + "]", "g");
    let copy = (' ' + value).slice(1);
    if (times === 1) {
        return copy.replace(re, "").length < times ? `Tulee sisältää ${character} ainakin kerran` : undefined
    }
    return copy.replace(re, "").length < times ? `Tulee sisältää ${character} ainakin ${times} kertaa` : undefined
};