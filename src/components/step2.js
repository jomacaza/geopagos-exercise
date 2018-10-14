import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import Select from 'react-select';
import { validate } from './validator';
import spinner from '../spinner.svg';

class step2 extends Component {
  static propTypes = {
    state: PropTypes.object,
    provinces: PropTypes.array,
    locations: PropTypes.array,
    loationsPending: PropTypes.bool,
    updateHandler: PropTypes.func,
    getLocation: PropTypes.func
  };

  constructor(props) {
    super(props);
    const { streetName, streetNumber, province, location } = this.props.state;

    this.state = {
      streetName: streetName || '',
      streetNumber: streetNumber || '',
      province: province || null,
      location: location || null,
      errors: {}
    };
  }

  _handleStreetNameChange(e) {
    this.setState({
      streetName: e.target.value
    });
  }

  _handleStreetNumberChange(e) {
    const number = this._onlyNumber(e.target.value);

    this.setState({
      streetNumber: number
    });
  }

  _handleProvinceChange(value) {
    this.setState({ province: value, location: null });
    this.props.getLocation(value.value);
  }

  _handleLocationChange(value) {
    this.setState({ location: value });
  }

  _resetError(name) {
    let error = {};
    error[name] = null;

    this.setState({ errors: Object.assign({}, this.state.errors, error) });
  }

  _renderLocationSpinner() {
    if (this.props.pending) {
      return <img src={spinner} className="input-spinner" alt="spinner" />;
    }
  }

  _onlyNumber(str) {
    return str.replace(/\D+/g, '');
  }

  _prevStep() {
    this.props.updateHandler({ step: 0 });
  }

  _submit() {
    const fields = {
      streetName: this.state.streetName,
      streetNumber: this.state.streetNumber,
      province: this.state.province,
      location: this.state.location
    };

    const invalid = validate(fields, {
      streetName: {
        presence: {
          allowEmpty: false,
          message: '^Ingrese calle.'
        }
      },
      streetNumber: {
        presence: {
          allowEmpty: false,
          message: '^Ingrese número.'
        }
      },
      province: {
        presence: {
          allowEmpty: false,
          message: '^Seleccione provincia.'
        }
      },
      location: {
        presence: {
          allowEmpty: false,
          message: '^Seleccione localidad.'
        }
      }
    });

    if (!_.isEmpty(invalid)) {
      this.setState({ errors: invalid });
    } else {
      this.setState({ errors: {} });
      this.props.updateHandler({
        fields: fields,
        step: 2
      });
    }
  }

  render() {
    return (
      <form>
        <div className="row mb-4">
          <div className="col-sm-8">
            <div
              className={`form-group ${
                !_.isEmpty(this.state.errors['streetName']) ? 'is-invalid' : ''
              }`}
            >
              <label for="streetName" className="text-primary">
                Calle
              </label>
              <input
                type="text"
                className="form-control"
                id="streetName"
                placeholder="Ej: Av. de Mayo"
                value={this.state.streetName}
                onChange={this._handleStreetNameChange.bind(this)}
                onFocus={this._resetError.bind(this, 'streetName')}
              />
              <div className="invalid-feedback">
                {this.state.errors['streetName']}
              </div>
            </div>
          </div>
          <div className="col-sm-4">
            <div
              className={`form-group ${
                !_.isEmpty(this.state.errors['streetNumber'])
                  ? 'is-invalid'
                  : ''
              }`}
            >
              <label for="streetNumber" className="text-primary">
                Número
              </label>
              <input
                type="text"
                className="form-control"
                id="streetNumber"
                placeholder="Ej: 3651"
                value={this.state.streetNumber}
                onChange={this._handleStreetNumberChange.bind(this)}
                onFocus={this._resetError.bind(this, 'streetNumber')}
              />
              <div className="invalid-feedback">
                {this.state.errors['streetNumber']}
              </div>
            </div>
          </div>
        </div>

        <div className="row pb-5">
          <div className="col-sm-6">
            <div
              className={`form-group ${
                !_.isEmpty(this.state.errors['province']) ? 'is-invalid' : ''
              }`}
            >
              <label className="text-primary">Provincia</label>
              <Select
                ref={ref => {
                  this.select = ref;
                }}
                theme={theme => ({
                  ...theme,
                  borderRadius: 0,
                  colors: {
                    ...theme.colors,
                    primary: '#0058CC'
                  }
                })}
                classNamePrefix="react-select"
                options={this.props.provinces}
                value={this.state.province}
                placeholder="Provincia"
                onChange={this._handleProvinceChange.bind(this)}
                onFocus={this._resetError.bind(this, 'province')}
                clearable={false}
              />
              <div className="invalid-feedback">
                {this.state.errors['province']}
              </div>
            </div>
          </div>
          <div className="col-sm-6">
            <div
              className={`form-group ${
                !_.isEmpty(this.state.errors['location']) ? 'is-invalid' : ''
              }`}
            >
              <label className="text-primary">Localidad</label>
              <div className="position-relative">
                <Select
                  ref={ref => {
                    this.select = ref;
                  }}
                  theme={theme => ({
                    ...theme,
                    borderRadius: 0,
                    colors: {
                      ...theme.colors,
                      primary: '#0058CC'
                    }
                  })}
                  classNamePrefix="react-select"
                  options={this.props.locations}
                  value={this.state.location}
                  placeholder="Localidad"
                  onChange={this._handleLocationChange.bind(this)}
                  onFocus={this._resetError.bind(this, 'location')}
                  clearable={false}
                  isDisabled={this.props.pending}
                />
                {this._renderLocationSpinner()}
              </div>
              <div className="invalid-feedback">
                {this.state.errors['location']}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-5 row">
          <div className="col-sm-6 mb-3">
            <button
              type="button"
              className="btn btn-primary outline btn-block"
              onClick={this._prevStep.bind(this)}
            >
              Atrás
            </button>
          </div>
          <div className="col-sm-6">
            <button
              type="button"
              className="btn btn-primary btn-block"
              onClick={this._submit.bind(this)}
            >
              Siguiente
            </button>
          </div>
        </div>
      </form>
    );
  }
}

export default step2;
