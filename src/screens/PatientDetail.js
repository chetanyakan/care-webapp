import React, { Component } from 'react';
import i18n from "i18next";
import PersonalDetail from 'Components/Cards/PersonalDetail';
import PersonalDetailForm from 'Components/Forms/PersonalDetail';

import ContactDetail from 'Components/Cards/ContactDetail';
import Timeline from 'Components/Cards/Timeline';
import ContactDetailForm from 'Components/Forms/ContactDetail';
import MedicationDetails from 'Containers/Patient/MedicationDetails';
import DoctorAttendant from 'Containers/Patient/DoctorAttendant';
import FacilityDetails from 'Containers/Patient/FacilityDetails';
import LabTestDetails from 'Containers/Patient/LabTestDetails';
import PortieDetails from 'Containers/Patient/PortieDetails';
import FamilyDetails from 'Containers/Patient/FamilyDetails';

import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';

// Importing mock data: Please remove upon integration
import { patientDetail } from 'Mockdata/patientDetail.json';
import { fetchPatient, updatePatientDetails, getPatientDetailsDependencies } from 'Actions/PatientsAction';
import _ from "underscore";
import Loader from 'react-loader-spinner';
import * as ReducerTypes from 'Reducers/Types';
import * as Routes from 'Src/routes';

class PatientDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formList: [
        'personal',
        'contact',
        'medication',
        'facility_details',
        'patient_lab_details',
        'portie_calling_details',
        'patient_family_details',
      ],
      isEditing: {
        personal: false,
        contact: false,
        medication: false,
        facility_details: false,
        patient_lab_details: false,
        portie_calling_details: false,
        patient_family_details: false,
      },
      profile: patientDetail
    }
    this.setEditable = this.setEditable.bind(this);
  }
  setEditable = (key, value) => {
    this.setState({
      isEditing: {
        ...this.state.isEditing,
        [key]: value
      }
    });
  }

  componentDidMount() {
    const patientId = this.props.match.params.patientId;
    this.props.fetchPatient(patientId);

    if (_.isEmpty(this.props.districtsList) || _.isEmpty(this.props.ownershipTypesList) || _.isEmpty(this.props.facilityTypesList) || _.isEmpty(this.props.currentStatus)) {
      let required_data = [[], []]

      const required = {
        'districtsList': [Routes.DISTRICT_LIST_URL, ReducerTypes.GET_DISTRICT_LIST],
        'ownershipTypesList': [Routes.OWNERSHIP_TYPE_LIST_URL, ReducerTypes.GET_OWNERSHIP_TYPE_LIST],
        'facilityTypesList': [Routes.FACILITY_TYPE_LIST_URL, ReducerTypes.GET_FACILITY_TYPE_LIST],
        'currentStatus': [Routes.PATIENT_STATUS_LIST_URL, ReducerTypes.GET_PATIENT_STATUS_LIST]
      }

      Object.keys(required).forEach((list) => {
        if (!this.props[list]) {
          required_data[0].push([required[list][0], 'GET', {}, {}])
          required_data[1].push(required[list][1])
        }
      })
      this.props.getPatientDetailsDependencies(required_data);
    }
  }
  onSubmit = (data, key) => {
    this.props.updatePatientDetails(data);
    this.setState({
      profile: {
        ...this.state.profile,
        [key]: data
      },
      isEditing: {
        ...this.state.isEditing,
        [key]: false
      }
    })
  }

  render() {
    const { formList, isEditing, profile } = this.state;
    if (!_.isEmpty(this.props.patient)) {
      return (
        <>
          <h2 className="page-header header-container">{i18n.t('Patient Detail')}</h2>
          <div className="page-container">
            {
              isEditing[formList[0]] ?
                <PersonalDetailForm
                  profile={this.props.patient.personal_details[0]}
                  handleSubmit={(data) => this.onSubmit(data, formList[0])}
                  editMode={true}
                  medicationDetails={this.props.patient.medication_details[0]}
                /> :
                <PersonalDetail
                  profile={this.props.patient.personal_details[0]}
                  handleEdit={() => this.setEditable(formList[0], true)}
                />
            }
            {
              isEditing[formList[1]] ?
                <ContactDetailForm
                  profile={this.props.patient.contact_details}
                  handleSubmit={(data) => { this.onSubmit(data, formList[1]) }}
                  editMode={true}
                /> :
                <ContactDetail
                  profile={this.props.patient.contact_details}
                  handleEdit={() => this.setEditable(formList[1], true)}
                />
            }
            <Timeline timeline={this.props.patient.patient_timeline}/>
            <MedicationDetails
              editMode={false} profile={this.props.patient.medication_details[0]}
            />
            {/* <DoctorAttendant
              profile={profile[formList[2]].attendant}
            /> */}
            <FacilityDetails
              profile={this.props.patient.facility_details}
            />
            <LabTestDetails
              profile={this.props.patient.patient_lab_details}
            />
            <PortieDetails
              profile={this.props.patient.portie_calling_details}
            />
            <FamilyDetails
              profile={this.props.patient.patient_family_details}
            />
          </div>
        </>
      );
    } else {
      return (
        <div>
          <Loader
            className="mr-3"
            type="ThreeDots"
            color="#138ca7"
            height={90}
            width={90}
          />
          <h3>Loading...</h3>
        </div>
      )
    }
  }
}


const mapStateToProps = state => {
  const { patient } = state;
  return {
    patient: patient,
  };
};


PatientDetail.propTypes = {
  patient: PropTypes.object.isRequired,
  fetchPatient: PropTypes.func.isRequired,
  updatePatientDetails: PropTypes.func.isRequired,
  getPatientDetailsDependencies: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, { fetchPatient, updatePatientDetails, getPatientDetailsDependencies })(PatientDetail);
