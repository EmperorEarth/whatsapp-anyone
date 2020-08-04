import React from 'react';
import IntlTelInput from 'react-intl-tel-input';
import CountryDropdown from './CountryDropdown';

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      contactVal: '',
      contact: '',
      messageText: 'Hello 👋',
      showCCPrompt: false,
    }
  }

  onSelectFlag = (inputVal, countryDetails, number, isValid) => {
    this.setState({
      contactVal: inputVal.replace(/[^0-9]/g, ''),
      contact: number.replace(/[^0-9]/g, ''),
      isValid,
      showCCPrompt: false,
    });
  }

  onPhoneNumberChange = (isValid, inputVal, countryDetails, number) => {
    this.setState({
      contactVal: inputVal.replace(/[^0-9]/g, ''),
      contact: number.replace(/[^0-9]/g, ''),
      isValid,
      showCCPrompt: false,
    });
  }

  handleSubmit = (ev) => {
    ev.preventDefault();

    const fullContact = this.state.contact;

    const encodedMsg = encodeURIComponent(this.state.messageText);

    if (this.state.isValid) {
      const waLink = `https://wa.me/${fullContact}?text=${encodedMsg}`;
      window.open(waLink, "_black");
    } else {
      this.setState({ showCCPrompt: true })
    }
  }

  render() {
    return (

      <form className="wa-form" onSubmit={this.handleSubmit}>
        <div className={`error ${this.state.showCCPrompt ? 'visible' : ''}`}>
          <div className="arrow">⤴</div> <div> make sure to enter country code</div>
        </div>
        <div className="form-inputs">
          <IntlTelInput
            preferredCountries={['in','us','ca','de']}
            containerClassName="intl-tel-input"
            inputClassName="form-control"
            fieldName="contact"
            onPhoneNumberChange={this.onPhoneNumberChange}
            onSelectFlag={this.onSelectFlag}
          />
          <button type="submit" style={{opacity: this.state.isValid ? 1 : 0.7}}>SEND</button>
        </div>
      </form>
      // <>
      // <style jsx global>{`
      //   #wa-form > * {
      //     max-width: 100%;
      //     width: 400px;
      //   }
      // `}</style>

      // <form onSubmit={this.handleSubmit} id="wa-form" className="my-5 d-flex flex-column align-items-center">
      //   {/* <CountryDropdown
      //     name="countryCode"
      //     value={this.state.countryCode}
      //     onChange={this.handleInputChange}
      //   /> */}

      //   <div className="form-group">
      //     <div className="input-group">
      //       {/* <div className="input-group-prepend">
      //         <span className="input-group-text">{this.state.countryCode}</span>
      //       </div> */}
      //       <input
      //         name="contact"
      //         type="tel"
      //         onChange={this.handleInputChange}
      //         className="form-control form-control-lg"
      //         placeholder="contact number"
      //       />
      //     </div>
      //   </div>

      //   {/* <div className="form-group">
      //     <textarea
      //       className="form-control"
      //       onChange={this.handleInputChange}
      //       name="messageText"
      //       rows="3"
      //       placeholder="Message (Optional)"></textarea>
      //   </div> */}

      //   <button type="submit" className="btn btn-success" >Start WhatsApp Chat</button>
      // </form>
      // </>
    )
  }
}

export default Form;