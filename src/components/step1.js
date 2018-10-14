import React, { Component } from 'react';
import { validate } from './validator';
import _ from 'lodash';
import PropTypes from 'prop-types';

class step1 extends Component {
  static propTypes = {
    state: PropTypes.object,
    updateHandler: PropTypes.func
  };

  constructor(props) {
    super(props);

    this.state = {
      fullName: '',
      cuil: '',
      errors: {}
    };
  }

  componentWillMount() {
    const { fullName, cuil } = this.props.state;

    this.setState({
      fullName: fullName
    });
    this._handleCuilChange({ target: { value: cuil || '' } });
  }

  _handleFullNameChange(e) {
    this.setState({
      fullName: e.target.value
    });
  }

  _handleCuilChange(e) {
    const cuil = this._onlyNumber(e.target.value);
    let mask = cuil;

    if (cuil.length === 12) {
      return false;
    }

    if (cuil.length > 2) {
      mask = cuil.replace(/(\d{2})/, '$1-');
    }

    if (cuil.length > 10) {
      mask = cuil.replace(/(\d{2})(\d{8})(\d{1})/, '$1-$2-$3');
    }

    this.setState({
      cuil: mask
    });
  }

  _resetError(name) {
    let error = {};
    error[name] = null;

    this.setState({ errors: Object.assign({}, this.state.errors, error) });
  }

  _onlyNumber(str) {
    return str.replace(/\D+/g, '');
  }

  _submit() {
    const fields = {
      fullName: this.state.fullName,
      cuil: this._onlyNumber(this.state.cuil)
    };

    const invalid = validate(fields, {
      fullName: {
        presence: {
          allowEmpty: false,
          message: '^Ingrese nombre completo.'
        },
        length: {
          minimum: 2,
          message: '^El nombre es muy corto.'
        }
      },
      cuil: {
        presence: {
          allowEmpty: false,
          message: '^Ingrese número de cuil.'
        },
        length: {
          minimum: 11,
          message: '^El número de cuil debe ser de 11 digitos.'
        }
      }
    });

    if (!_.isEmpty(invalid)) {
      this.setState({ errors: invalid });
    } else {
      this.setState({ errors: {} });
      this.props.updateHandler({
        fields: fields,
        step: 1
      });
    }
  }

  render() {
    return (
      <form>
        <div
          className={`form-group ${
            !_.isEmpty(this.state.errors['fullName']) ? 'is-invalid' : ''
          }`}
        >
          <label className="text-primary">Nombre completo</label>
          <input
            type="text"
            className="form-control"
            id="fullName"
            aria-describedby="fullName"
            placeholder="Nombre completo"
            value={this.state.fullName}
            onChange={this._handleFullNameChange.bind(this)}
            onFocus={this._resetError.bind(this, 'fullName')}
          />
          <div className="invalid-feedback">
            {this.state.errors['fullName']}
          </div>
        </div>
        <div
          className={`form-group pb-5 ${
            !_.isEmpty(this.state.errors['cuil']) ? 'is-invalid' : ''
          }`}
        >
          <label className="text-primary">N de CUIL</label>
          <input
            type="text"
            className="form-control"
            id="cuil"
            placeholder="Ej: 23-45678901-2"
            value={this.state.cuil}
            onChange={this._handleCuilChange.bind(this)}
            onFocus={this._resetError.bind(this, 'cuil')}
          />
          <div className="invalid-feedback">{this.state.errors['cuil']}</div>
        </div>
        <div className="mt-5 d-flex justify-content-end">
          <button
            type="button"
            className="btn btn-primary col-sm-6"
            onClick={this._submit.bind(this)}
          >
            Siguiente
          </button>
        </div>
      </form>
    );
  }
}

export default step1;
