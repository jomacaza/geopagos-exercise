import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { getProvinces, getLocations, postForm } from '../actions/data';
import StepIndicator from '../components/stepIndicator';
import Step1 from '../components/step1';
import Step2 from '../components/step2';
import Step3 from '../components/step3';
import success from '../success.svg';

class stepFormContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fields: {},
      step: 0
    };
  }

  componentWillMount() {
    this.props.onGetProvinces();

    // get data from local storage
    this.setState(JSON.parse(localStorage.getItem('register')));
  }

  componentDidUpdate(prevProps) {
    // if the post is success reset local storage
    if (this.props.postForm !== prevProps.postForm && this.props.postForm) {
      localStorage.removeItem('register');
    }
  }

  _getLocation(id) {
    this.props.onGetLocations(id);
  }

  _updateData(data) {
    const dataUpdated = _.merge(this.state, data);
    this.setState(dataUpdated);

    // persist data to local storage
    localStorage.setItem('register', JSON.stringify(dataUpdated));
  }

  _renderStep() {
    switch (this.state.step) {
      case 1:
        return (
          <Step2
            updateHandler={this._updateData.bind(this)}
            state={this.state.fields}
            provinces={this.props.provinces}
            locations={this.props.locations}
            pending={this.props.locationsPending}
            getLocation={this._getLocation.bind(this)}
          />
        );
        break;
      case 2:
        return (
          <Step3
            submitHandler={this._submit.bind(this)}
            updateHandler={this._updateData.bind(this)}
            state={this.state.fields}
            pending={this.props.postFormPending}
          />
        );
        break;
      default:
        return (
          <Step1
            updateHandler={this._updateData.bind(this)}
            state={this.state.fields}
          />
        );
    }
  }

  _submit(data) {
    this.props.onPostForm(_.merge(this.state.fields, data));
  }

  _renderSteps() {
    if (!this.props.postForm) {
      return (
        <div className="w-100">
          <div className="row d-flex align-items-center mb-5">
            <div className="col-6">
              <h2 className="text-primary">Registro</h2>
            </div>
            <div className="col-6 justify-content-end">
              <StepIndicator step={this.state.step} />
            </div>
          </div>

          {this._renderStep()}
        </div>
      );
    }
  }

  _renderSuccess() {
    if (this.props.postForm) {
      return (
        <div className="text-center">
          <img src={success} width="128" />
          <h3 className="text-primary mt-4">Te registraste exitosamente!</h3>
        </div>
      );
    }
  }

  render() {
    return (
      <div className="form-container d-flex align-items-center">
        {this._renderSteps()}
        {this._renderSuccess()}
      </div>
    );
  }
}

function mapProvinces(provinces) {
  return provinces.map(p => {
    return {
      value: p.id,
      label: p.name
    };
  });
}

function mapLocations(locations) {
  let cities = !_.isEmpty(locations) ? locations.cities : [];

  return cities.map(c => {
    return {
      value: c.id,
      label: c.name
    };
  });
}

const mapStateToProps = (state, ownProps) => {
  return {
    provincesPending: state.data.provincesPending,
    provinces: mapProvinces(state.data.provinces),
    provincesError: state.data.provincesError,

    locationsPending: state.data.locationsPending,
    locations: mapLocations(state.data.locations),
    locationsError: state.data.locationsError,

    postFormPending: state.data.postFormPending,
    postForm: state.data.postForm
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onGetProvinces: () => {
      dispatch(getProvinces());
    },
    onGetLocations: ID => {
      dispatch(getLocations(ID));
    },
    onPostForm: params => {
      dispatch(postForm(params));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(stepFormContainer);
