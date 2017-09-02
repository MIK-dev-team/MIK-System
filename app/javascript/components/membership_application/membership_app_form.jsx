/**
 * Created by owlaukka on 22/08/17.
 */
import React from 'react';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap'

import ObjectSelectInput from '../form_fields/object_select_input';
import TextAreaInput from '../form_fields/textarea_input';
import GenericInput from "../form_fields/generic_bootstrap_input";

import { required, doesNotContainSpaces } from '../../services/validators/commonValidators';
import {
    isLongerThan8Characters, containsAtOnce, containsAtLeast1Period,
    valuesMatch, birthdayIsInCorrectFormat, birthdayIsNotTooOld,
    birthdayIsNotInTheFuture, nameIsValid, postalCodeIsValid, cityIsValid,
    phoneNumberIsValid
} from "../../services/validators/membershipApplicationValidators";


export class MembershipAppForm extends React.Component {
    render() {
        const { handleSubmit, submitting, firstEmail, memberTypes, joinSil } = this.props;
        const silOptions = [
            { id: 'willJoin', name: 'Liityn myös Suomen Ilmailuliiton jäsenyksi' },
            { id: 'willNot', name: 'En halua liittyä SIL:n jäseneksi' },
            { id: 'alreadyMember', name: 'Olen jo SIL:n jäsen' }
        ];
        const silNumberDisabled = joinSil !== 'alreadyMember';
        const validateEmail = valuesMatch(firstEmail);

        return (
            <form onSubmit={handleSubmit}>
                <Field label="Käyttäjätunnus" name="username"
                       id="app-username"  component={GenericInput}
                       validate={[doesNotContainSpaces, isLongerThan8Characters]} />
                <Field label="Sähköpostiosoite" name="email" id="app-email"
                       component={GenericInput} validate={[required, containsAtOnce, containsAtLeast1Period]} />
                <Field label="Kirjoita sähköpostiosoite uudelleen" name="repeatEmail" id="app-repeat-email"
                       component={GenericInput} validate={[required, validateEmail]} />
                <Field label="Syntymäaika (pp.kk.vvvv)" name="birthday" id="app-birthday"
                       component={GenericInput}
                       validate={[required, birthdayIsInCorrectFormat, birthdayIsNotTooOld, birthdayIsNotInTheFuture]} />
                <Field label="Jäsenlaji" name="member_type" id="app-member-type"
                       component={ObjectSelectInput} options={memberTypes} />
                <Field label="Kokonimi" name="full_name" id="app-full-name"
                       component={GenericInput} validate={[required, nameIsValid]} />
                <Field label="Osoite" name="address" id="app-address"
                       component={GenericInput} validate={[required]} />
                <Field label="Postinumero" name="postal_code" id="app-postal-code"
                       component={GenericInput} validate={[required, postalCodeIsValid]} />
                <Field label="Kaupunki" name="city" id="app-city"
                       component={GenericInput} validate={[required, cityIsValid]} />
                <Field label="Puhelinnumero" name="phone" id="app-phone"
                       component={GenericInput} validate={[required, phoneNumberIsValid]} />

                <hr />
                <Field label="Nykyiset lupakirjaluokat" name="licences" id="app-licences"
                       component={GenericInput} />
                <Field label="Lentokokemus moottorikoneilla (tuntia)" name="experience_with_engine" id="app-experience-with-engine"
                       type="number" min={0} component={GenericInput} />
                <Field label="Muu lentokokemus" name="other_experience" id="app-other-experience"
                       componentClass="textarea" rows="3" component={TextAreaInput} />
                <p><i>Suomen Ilmailuliitto ry - SIL - on urheilu- ja harrasteilmailun valtakunnallinen
                    keskusjärjestö Suomessa. <a href="http://www.ilmailuliitto.fi/fi/jasenille/jasenasiat/jasenedut">
                        Ilmailuliitto tarjoaa jäsenilleen useita jäsenetuja</a>, mm.
                    tapaturmavakuutuksen, joka on voimassa myös ilmailulajeja harrastettaessa ja kuukausittaisen
                    ILMAILU-lehden. Jokainen Ilmailuliittoon kuuluva Malmin Ilmailukerhon jäsen lisää kerhomme
                    painoarvoa ja vaikutusmahdollisuuksia liiton päätöksenteossa.
                    <a href="http://www.ilmailuliitto.fi/fi/jasenille/jasenasiat">Ilmailuliiton voimassaolevat
                        jäsenmaksut voit tarkistaa tästä.</a>
                </i></p>
                <Field label="Suomen Ilmailuliiton (SIL) jäsenyys" name="join_sil" id="app-join-sil"
                       component={ObjectSelectInput} options={silOptions} />
                <Field label="Muiden kerhojen jäsenyys" name="other_memberships" id="app-other-memberships"
                       component={GenericInput} />
                <Field label="SIL jäsennumerosi, jos olet jo SIL:n jäsen" name="sil_membership_number" id="app-sil-membership-number"
                       disabled={silNumberDisabled} component={GenericInput} />
                <Field label="Muuta aiheeseen liittyvää" name="extra_information" id="app-extra-information"
                       componentClass="textarea" rows="4" component={TextAreaInput} />

                <Button type="submit" disabled={ submitting }>Lähetä hakemus{ submitting ? ' ...' : ''}</Button>
            </form>
        )
    }

}

MembershipAppForm = reduxForm({
    form: 'MembershipAppForm'
})(MembershipAppForm);

const selector = formValueSelector('MembershipAppForm');
MembershipAppForm = connect((store) => {
    const firstEmail = selector(store, 'email'),
        joinSil = selector(store, 'join_sil');
    return {
        firstEmail,
        joinSil,
        memberTypes: store.applications.membershipTypes,
        initialValues: { member_type: 'Täysjäsen', join_sil: 'willJoin' }
    }
})(MembershipAppForm);

export default MembershipAppForm;