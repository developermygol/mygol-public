import React, { Component } from 'react';
import Loc, { Localize } from '../../common/Locale/Loc';
import { observable } from '../../../../node_modules/mobx';
import { observer } from '../../../../node_modules/mobx-react';
import Spinner from '../../common/Spinner/Spinner';
import { requestAsync } from '../../helpers/Utils';
import axios from '../../../axios';

@observer
class InputField extends Component {
  onInputChange = e => {
    if (this.props.onChange) this.props.onChange(e.target.name, e.target.value);
  };

  render() {
    const input = this.props;
    const label = input.label && Localize(input.label);

    const inputProps = {
      className: 'FormInput Color1',
      id: input.id,
      name: input.name,
      onChange: this.onInputChange,
      type: input.type,
      value: input.value,
      rows: 10,
    };

    const inputComp = input.type === 'textarea' ? <textarea {...inputProps} /> : <input {...inputProps} />;

    return (
      <div className="FormField">
        <label htmlFor={input.id}>{label || input.name}</label>
        {inputComp}
      </div>
    );
  }
}

@observer
class Contact extends Component {
  @observable data = {
    name: '',
    email: '',
    subject: '',
    text: '',
  };

  @observable loading = false;
  @observable sent = false;
  @observable error = null;

  updateProperty = (key, value) => {
    this.data[key] = value;
  };

  submit = e => {
    e.preventDefault();

    requestAsync(this, axios.post, null, '/contents/contact', this.data).then(res => {
      if (res) this.sent = true;
    });
  };

  render() {
    const p = this.props;
    const d = this.data;

    if (this.sent)
      return (
        <div className="FormSent">
          <h2>
            <Loc>Contact</Loc>
          </h2>
          <p className="Main">
            <Loc>Contact.Sent1</Loc>
          </p>
          <p className="Second">
            <Loc>Contact.Sent2</Loc>
          </p>
        </div>
      );

    return (
      <div className="Form">
        <h2>
          <Loc>Contact</Loc>
        </h2>
        <p className="Intro">
          <Loc>Contact.Intro</Loc>
        </p>
        {this.error ? <p className="Error">{this.error}</p> : null}
        <Spinner loading={this.loading}>
          <form>
            <InputField
              type="text"
              label="Contact.Name"
              name="name"
              value={d.name}
              onChange={this.updateProperty}
            />
            <InputField
              type="text"
              label="Contact.Email"
              name="email"
              value={d.email}
              onChange={this.updateProperty}
            />
            <InputField
              type="text"
              label="Contact.Subject"
              name="subject"
              value={d.subject}
              onChange={this.updateProperty}
            />
            <InputField
              type="textarea"
              label="Contact.Message"
              name="text"
              value={d.text}
              onChange={this.updateProperty}
            />
            <button className="FormButton Color1Inverse" onClick={this.submit}>
              <Loc>Send</Loc>
            </button>
          </form>
        </Spinner>
      </div>
    );
  }
}

export default Contact;
