import React, {useState, useEffect} from 'react';
import Grid from '@material-ui/core/Grid';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import {PATCH, POST} from 'Src/constants'
import Button from '@material-ui/core/Button';
import CustomModal from 'Components/CustomModal';
import {useTranslation} from "react-i18next";
import {regex} from 'Constants/app.const';
import {Formik} from 'formik';
import Form from './form';
import useStyles from './styles';
import {updateCreateStaffList} from 'Actions/FacilityStaffAction';
import {PropTypes} from 'prop-types';
import {connect} from 'react-redux';
import {FACILITY_STAFF_UPDATE_URL, FACILITY_STAFF_CREATE_URL} from 'Src/routes';
import * as StringUtils from 'Src/utils/stringformatting';
import * as ToastUtils from 'Src/utils/toast';
import {createToastNotification} from 'Actions/ToastAction';
import {SUCCESS, DANGER, FACILITY_MANAGER} from "Src/constants";
import * as utils from 'Src/utils/utils';

export const DoctorAttendantForm = (props) => {
  const classes = useStyles();
  const [isAddAnother, setIsAddAnother] = useState(false);
  const [error, setError] = useState(false)
  const {open, data, onClose, updateOperation} = props;
  const [errors, setErrors] = useState({
    facility: true,
    designation: true,
    name: true,
    phone_number: true,
    email: true,
    form: ''
  });
  const [errorString, setErrorString] = useState({name: [""], phone_number: [""], email: [""], detail: ""});
  const [updatedData, setUpdateData] = useState({
    name: (updateOperation) ? data.name : "",
    phone_number: (updateOperation) ? data.phone_number : "",
    email: (updateOperation) ? data.email : ""
  });
  const [designation, setDesignation] = useState([]);
  const [facility, setFacility] = useState([]);
  const addAnother = (event) => {
    setIsAddAnother(event.target.checked)
  };

  useEffect(() => {
    const {designationList, facilityList, userType, associatedFacilities} = props
    let update_designation_list = [], update_facility_list = [];
    if (updateOperation && designationList) {
      update_facility_list.push(utils.dropDownDict(data.facility));
      designationList.forEach((row) => update_designation_list.push(utils.dropDownDict(row.name, row.id)));
      setUpdateData((prevState) => ({
        ...prevState,
        designation: update_designation_list[0].value,
      }));
      setErrors(prevState => ({
        ...prevState,
        name: false,
        phone_number: false,
        email: false,
      }))
    } else if (designationList && facilityList && userType && associatedFacilities) {
      facilityList.forEach((row) => update_facility_list.push(utils.dropDownDict(row.name, row.id)))
      if (userType === FACILITY_MANAGER) {
        update_facility_list = associatedFacilities.map((id) => {
          const facility = facilityList.find((value, index, array) => value.id === id);
          return utils.dropDownDict(facility.name, facility.id);
        });
      }
      designationList.forEach((row) => update_designation_list.push({value: row.id, label: row.name}));
    }
    setDesignation(update_designation_list);
    setFacility(update_facility_list);
  }, [props.designationList, props.facilityList, props.userType, props.associatedFacilities])

  const updateFacilityStaff = async () => {
    let url = updateOperation ? StringUtils.formatVarString(FACILITY_STAFF_UPDATE_URL, [data.id]) : FACILITY_STAFF_CREATE_URL;
    const response = await props.updateCreateStaffList(url, updatedData, (updateOperation) ? PATCH : POST);
    if (response.status) {
      (updateOperation) ?
        props.createToastNotification(ToastUtils.toastDict((new Date()).getTime(), "Updated", "Successfully updated ", SUCCESS)) :
        props.createToastNotification(ToastUtils.toastDict((new Date()).getTime(), "Created", "Successfully Added ", SUCCESS))
      if (!isAddAnother) {
        onClose();
      }
      setErrors(prevState => ({
        ...prevState,
        name: true,
        phone_number: true,
        email: true,
      }));
      setUpdateData(prevState => ({
        ...prevState,
        name: (updateOperation) ? data.name : "",
        phone_number: (updateOperation) ? data.phone_number : "",
        email: (updateOperation) ? data.email : ""
      }))
    } else {
      try {
        delete response.status;
        let errorMessage = '';
        Object.keys(response).forEach((key) => errorMessage += response[key].reduce((total, value, index, array) => total + value));
        props.createToastNotification(ToastUtils.toastDict((new Date()).getTime(), "Error", errorMessage, DANGER));
      } catch (e) {
        props.createToastNotification(ToastUtils.toastDict((new Date()).getTime(), "Error", "An Error Has Occurred.", DANGER));
      }
      setError(true);
      delete response['status'];
      setErrorString(prevState => ({...prevState, ...response}));
    }
  };

  const handleChange = (name, e) => {
    updatedData[name] = e;
    if (typeof e !== 'object') {
      switch (name) {
        case 'email':
          errors[name] = !(regex.email).test(e);
          break;
        case 'phone_number':
          errors[name] = !(regex.phone_number).test(e);
          break;
        default:
          errors[name] = !Boolean(e);
      }
    }

    setUpdateData(prevState => ({
      ...prevState,
      ...updatedData
    }));
    setErrors(prevState => ({
      ...prevState,
      ...errors
    }))
  };

  const {i18n} = useTranslation();

  return (
    <CustomModal open={open} onClose={onClose} title={i18n.t('Doctor/Attendant')}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Formik>
            {
              props => <Form
                {...props}
                data={data}
                updatedData={updatedData}
                handleChange={handleChange}
                updateOperation={updateOperation}
                designation={designation}
                facility={facility}
                errorString={errorString}/>
            }
          </Formik>
        </Grid>
        <Grid item xs={12}>
          {!data &&
          <FormControlLabel
            value="end"
            control={<Switch checked={isAddAnother} onChange={addAnother} color="primary"/>}
            label="Add Another"
            labelPlacement="end"
          />
          }
          <Button
            className={classes.button}
            variant="contained"
            color="primary"
            size="medium"
            onClick={updateFacilityStaff}
            disabled={
              errors.facility ||
              errors.designation ||
              errors.name ||
              errors.phone_number ||
              errors.email
            }
          >
            {i18n.t('Ok')}
          </Button>
        </Grid>
      </Grid>
    </CustomModal>
  );
}


const mapStateToProps = (state) => ({
  designationList: state.staffDesignation.results,
  facilityList: state.shortFacilities.results,
  userType: state.profile.user_type,
  associatedFacilities: state.profile.associated_facilities,
});

DoctorAttendantForm.propTypes = {
  userType: PropTypes.number,
  associatedFacilities: PropTypes.array,
  updateCreateStaffList: PropTypes.func,
  facilityList: PropTypes.array,
  designationList: PropTypes.array,
  createToastNotification: PropTypes.func
};

export default connect(mapStateToProps, {updateCreateStaffList, createToastNotification})(DoctorAttendantForm);
