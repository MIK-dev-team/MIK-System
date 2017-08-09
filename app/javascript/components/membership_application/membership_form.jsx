/**
 * Created by owlaukka on 29/06/17.
 */
import React from 'react';
import { connect } from 'react-redux'
import { FormGroup, ControlLabel, FormControl, HelpBlock, Button, InputGroup, Glyphicon } from 'react-bootstrap';

import * as actions from '../../store/actions/applicationActions';
import { validationStateForForm } from '../../store/actions/applicationValidationActions';
export class MembershipForm extends React.Component {
    render() {
        return (
            <div>
                <form onSubmit={(event) => {
                    this.props.dispatch(actions.submitApplication(this.props.submitObject, this.props.applications.repeatEmail, event));
                }}>
                    <FormGroup controlId="username" validationState={validationStateForForm("username", this.props.applications.username)}>
                        <ControlLabel>Käyttäjätunnus</ControlLabel>
                        <FormControl type="text" onChange={(event) => this.props.dispatch(actions.setUsername(event.target.value))}/>
                        <HelpBlock>Voit jättää tyhjäksi halutessasi ja käyttää sähköpostiosoitetta kirjautumiseen</HelpBlock>
                    </FormGroup>
                    <FormGroup controlId="email" validationState={validationStateForForm("email", this.props.applications.email)}>
                        <ControlLabel>Sähköpostiosoite</ControlLabel>
                        <InputGroup>
                            <FormControl type="text" onChange={(event) => this.props.dispatch(actions.setEmail(event.target.value))}/>
                            <InputGroup.Addon><Glyphicon glyph="fire" /></InputGroup.Addon>
                        </InputGroup>
                    </FormGroup>
                    <FormGroup controlId="repeatEmail" validationState={validationStateForForm("repeatEmail", this.props.applications.email, this.props.applications.repeatEmail)}>
                        <ControlLabel>Kirjoita sähköpostiosoite uudelleen</ControlLabel>
                        <InputGroup>
                            <FormControl type="text" onChange={(event) => this.props.dispatch(actions.setRepeatEmail(event.target.value))}/>
                            <InputGroup.Addon><Glyphicon glyph="fire" /></InputGroup.Addon>
                        </InputGroup>
                    </FormGroup>
                    <FormGroup controlId="birthday" validationState={validationStateForForm("birthday", this.props.applications.birthday)}>
                        <ControlLabel>Syntymäaika (pp.kk.vvvv)</ControlLabel>
                        <InputGroup>
                            <FormControl type="text" onChange={(event) => this.props.dispatch(actions.setBirthday(event.target.value))}/>
                            <InputGroup.Addon><Glyphicon glyph="fire" /></InputGroup.Addon>
                        </InputGroup>
                    </FormGroup>
                    <FormGroup id="memberType" controlId="memberType">
                        <ControlLabel>Jäsenlaji</ControlLabel>
                        <InputGroup>
                            <FormControl componentClass="select" onChange={(event) => this.props.dispatch(actions.setMemberType(event.target.value))}>
                                <option value="null">** Valitse jäsenlaji **</option>
                                {this.props.membershipTypes.map((type) =>
                                    <option key={type.name} value={type.name}>{type.name}</option>
                                )}
                            </FormControl>
                            <InputGroup.Addon><Glyphicon glyph="fire" /></InputGroup.Addon>
                        </InputGroup>
                    </FormGroup>
                    <FormGroup controlId="fullName" validationState={validationStateForForm("fullName", this.props.applications.full_name)}>
                        <ControlLabel>Koko nimi</ControlLabel>
                        <InputGroup>
                            <FormControl type="text" onChange={(event) => this.props.dispatch(actions.setFullName(event.target.value))}/>
                            <InputGroup.Addon><Glyphicon glyph="fire" /></InputGroup.Addon>
                        </InputGroup>
                    </FormGroup>
                    <FormGroup controlId="address" validationState={validationStateForForm("address", this.props.applications.address)}>
                        <ControlLabel>Osoite</ControlLabel>
                        <InputGroup>
                            <FormControl type="text" onChange={(event) => this.props.dispatch(actions.setAddress(event.target.value))}/>
                            <InputGroup.Addon><Glyphicon glyph="fire" /></InputGroup.Addon>
                        </InputGroup>
                    </FormGroup>
                    <FormGroup controlId="postalCode" validationState={validationStateForForm("postalCode", this.props.applications.postal_code)}>
                        <ControlLabel>Postinumero</ControlLabel>
                        <InputGroup>
                            <FormControl type="text" onChange={(event) => this.props.dispatch(actions.setPostalCode(event.target.value))}/>
                            <InputGroup.Addon><Glyphicon glyph="fire" /></InputGroup.Addon>
                        </InputGroup>
                    </FormGroup>
                    <FormGroup controlId="city" validationState={validationStateForForm("city", this.props.applications.city)}>
                        <ControlLabel>Postitoimipaikka</ControlLabel>
                        <InputGroup>
                            <FormControl type="text" onChange={(event) => this.props.dispatch(actions.setCity(event.target.value))}/>
                            <InputGroup.Addon><Glyphicon glyph="fire" /></InputGroup.Addon>
                        </InputGroup>
                    </FormGroup>
                    <FormGroup controlId="phoneNumber" validationState={validationStateForForm("phoneNumber", this.props.applications.phone)}>
                        <ControlLabel>Puhelinnumero</ControlLabel>
                        <InputGroup>
                            <FormControl type="text" onChange={(event) => this.props.dispatch(actions.setPhoneNumber(event.target.value))}/>
                            <InputGroup.Addon><Glyphicon glyph="fire" /></InputGroup.Addon>
                        </InputGroup>
                    </FormGroup>

                    <br />
                    <hr />
                    <h4>Valinnaiset tiedot</h4>

                    <FormGroup controlId="licences">
                        <ControlLabel>Nykyiset lupakirjaluokat</ControlLabel>
                        <FormControl type="text" onChange={(event) => this.props.dispatch(actions.setLicences(event.target.value))} />
                    </FormGroup>
                    <FormGroup controlId="expWithEngine">
                        <ControlLabel>Lentokokemus moottorikoneilla (tuntia)</ControlLabel>
                        <InputGroup>
                            <FormControl type="number" min={0} onChange={(event) => this.props.dispatch(actions.setEngineExp(event.target.value))}/>
                            <InputGroup.Addon>h</InputGroup.Addon>
                        </InputGroup>
                    </FormGroup>
                    <FormGroup controlId="otherExp">
                        <ControlLabel>Muu lentokokemus</ControlLabel>
                        <FormControl type="text" onChange={(event) => this.props.dispatch(actions.setOtherExp(event.target.value))} />
                    </FormGroup>
                    <FormGroup controlId="otherMemberships">
                        <ControlLabel>Muiden kerhojen jäsenyys</ControlLabel>
                        <FormControl type="text" onChange={(event) => this.props.dispatch(actions.setOtherMemberships(event.target.value))}/>
                    </FormGroup>
                    <FormGroup controlId="silMembership">
                        <ControlLabel>Suomen Ilmailuliiton (SIL) jäsenyys</ControlLabel>
                        <FormControl componentClass="select" onChange={(event) => this.props.dispatch(actions.setSilMembership(event.target.value))}>
                            <option value="willJoin">Liityn myös Suomen Ilmailuliiton jäsenyksi</option>
                            <option value="willNot">En halua liittyä SIL:n jäseneksi</option>
                            <option value="alreadyMember">Olen jo SIL:n jäsen</option>
                        </FormControl>
                    </FormGroup>
                    <FormGroup controlId="silNumber">
                        <ControlLabel>SIL jäsennumerosi, jos olet jo SIL:n jäsen</ControlLabel>
                        <FormControl type="text" onChange={(event) => this.props.dispatch(actions.setSilNumber(event.target.value))}/>
                    </FormGroup>

                    <p><i>Suomen Ilmailuliitto ry - SIL - on urheilu- ja harrasteilmailun valtakunnallinen
                        keskusjärjestö Suomessa. <a href="http://www.ilmailuliitto.fi/fi/jasenille/jasenasiat/jasenedut">
                            Ilmailuliitto tarjoaa jäsenilleen useita jäsenetuja</a>, mm.
                        tapaturmavakuutuksen, joka on voimassa myös ilmailulajeja harrastettaessa ja kuukausittaisen
                        ILMAILU-lehden. Jokainen Ilmailuliittoon kuuluva Malmin Ilmailukerhon jäsen lisää kerhomme
                        painoarvoa ja vaikutusmahdollisuuksia liiton päätöksenteossa.
                        <a href="http://www.ilmailuliitto.fi/fi/jasenille/jasenasiat">Ilmailuliiton voimassaolevat
                            jäsenmaksut voit tarkistaa tästä.</a>
                    </i></p>

                    <FormGroup controlId="additionalInfo">
                        <ControlLabel>Muuta aiheeseen liittyvää</ControlLabel>
                        <FormControl componentClass="textarea" style={{'height': 200}} onChange={(event) => this.props.dispatch(actions.setAdditionalInfo(event.target.value))}/>
                    </FormGroup>

                    <Button type="submit">
                        Lähetä hakemus
                    </Button>
                </form>
            </div>
        )
    }
}

export default connect((store) => {
    return {
        membershipTypes: store.applications.membershipTypes,
        applications: store.applications,
        submitObject: store.applications.submitObject,
        // successMsg: store.applications.successMsg,
        // submitError: store.applications.submitError,
    }
})(MembershipForm)