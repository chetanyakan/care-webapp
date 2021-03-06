import React from 'react';
import { useTranslation } from "react-i18next";
import { PropTypes } from 'prop-types';
import {
  Grid,
  Button,
  Card,
} from '@material-ui/core';

import FamilyMemberCard from 'Components/Cards/FamilyMemberCard';
import NullState from 'Components/NullState';
import nullImage from 'Assets/images/family-null.jpg';
import { CreateUpdateForm } from './createUpdateForm';
import { createPatientFamilyDetails, updatePatientFamilyDetails } from 'Actions/PatientFamilyAction';
import { connect } from 'react-redux';
import { useParams } from "react-router-dom";
import { fetchPatient } from 'Actions/PatientsAction';
import { createToastNotification } from 'Actions/ToastAction';
import * as ToastUtils from 'Src/utils/toast';
import {SUCCESS, DANGER} from "Src/constants";

export function FamilyDetails(props) {
  let { patientId } = useParams();
  const { i18n } = useTranslation();
  const { profile, createPatientFamilyDetails, updatePatientFamilyDetails, fetchPatient, createToastNotification } = props;

  let editableId;
  const [editable, setEditable] = React.useState(editableId);

  const edit = (id) => {
    setEditable(id);
  };
  const add = () => {
    setEditable('new');
  };

  const handleSubmit = async (data) => {
    data['patient'] = patientId;
    let initial = data;
    let response;
    initial['patient'] = patientId;
    if (editable === 'new') {
      setEditable('');
      response = await createPatientFamilyDetails(initial);
      if (response.status) {
        profile.unshift(data);
        createToastNotification(
            ToastUtils.toastDict((new Date()).getTime(), "Added", "Family member Successfully added", SUCCESS)
        )
      } else {
        createToastNotification(
            ToastUtils.toastDict((new Date()).getTime(), "Error", "Some Error occurred", DANGER)
        )
      }
    }
    else {
      profile[editable] = data;
      setEditable('');
      response = await updatePatientFamilyDetails(initial, data.id);
      if (response.status) {
        createToastNotification(
            ToastUtils.toastDict((new Date()).getTime(), "Updated", "Family member Successfully updated", SUCCESS)
        )
      } else {
        createToastNotification(
            ToastUtils.toastDict((new Date()).getTime(), "Error", "Some Error occurred", DANGER)
        )
      }
    }
    fetchPatient(patientId);
  };

  const cancel = () => {
    setEditable('');
  };

  return (
    <div className="mb-20">
      <div className="section-header">
        <h4 className="heading--card">{i18n.t('Family Details')}</h4>
        <Button
          variant="contained"
          color="primary"
          disableElevation
          size="medium"
          className="btn"
          onClick={add}
        >
          + {i18n.t('Add Family member')}
        </Button>
      </div>
      <Grid container spacing={1}>
        {
          editable === 'new' &&
          <Grid item xs={12}>
            <CreateUpdateForm
              handleSubmit={handleSubmit}
              cancelCallback={cancel}
              editMode={false}
              details={{}}
            />
          </Grid>
        }
        {
          profile.map((member, index) =>
            <Grid key={index} className="mb-0" item xs={12}>
              {
                editable === index ?
                  <CreateUpdateForm
                    handleSubmit={handleSubmit}
                    cancelCallback={cancel}
                    editMode={true}
                    details={member}
                  />
                  :
                  <FamilyMemberCard
                    details={member}
                    editCallback={() => edit(index)}
                  />
              }
            </Grid>
          )
        }
        {
          !profile.length && editable !== 'new' &&
          <Grid item xs={12}>
            <Card>
              <NullState img={nullImage} message={i18n.t('null_messages.family')} />
            </Card>
          </Grid>
        }
      </Grid>
    </div>
  );
}

FamilyDetails.propTypes = {
  profile: PropTypes.array.isRequired,
  handleEdit: PropTypes.func,
  createPatientFamilyDetails: PropTypes.func,
  updatePatientFamilyDetails: PropTypes.func,
};

FamilyDetails.defaultProps = {
  profile: []
};

const mapStateToProps = (state) => ({
});

export default connect(mapStateToProps, { 
    createPatientFamilyDetails, 
    updatePatientFamilyDetails, 
    fetchPatient, 
    createToastNotification,
})(FamilyDetails);
