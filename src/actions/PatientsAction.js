import * as CommonService from "Src/utils/services";
import * as Routes from 'Src/routes';
import { GET, POST, PUT } from "Src/constants";
import * as ReducerTypes from 'Reducers/Types';
import { dispatchAction, dispatchDependentActions } from 'Actions/common';
import * as HttpStatus from 'http-status-codes'
import * as patientDetailsService from "Src/services/patientDetailsService";

const getPatientList = (url, params = {}) => async (dispatch) => {
    const response = await CommonService.makeAuthorizedApiCall(url, GET, {},  params)
    dispatch(dispatchAction(ReducerTypes.GET_PATIENT_LIST, response));
};


const getsPatientDependencies = (required_data) => async (dispatch) => {
    return await dispatch(dispatchDependentActions(...required_data));
};


const getProfileDependencies = (params) => async (dispatch) => {
    return await dispatch(dispatchDependentActions(
        [
            [Routes.CLINICAL_STATUS_LIST_URL, GET, {}, params],
            [Routes.DISTRICT_LIST_URL, GET, {}, params],
            [Routes.CLUSTER_GROUP_LIST_URL, GET, {}, params],
            [Routes.COVID_STATUS_LIST_URL, GET, {}, params],
            [Routes.FACILITY_LIST_URL, GET, {}, params],
            [Routes.PATIENT_STATUS_LIST_URL, GET, {}, params],
            [Routes.STATE_LIST_URL, GET, {}, params],
        ],
        [
            ReducerTypes.GET_CLINICAL_STATUS_LIST,
            ReducerTypes.GET_DISTRICT_LIST,
            ReducerTypes.GET_CLUSTER_GROUP_LIST,
            ReducerTypes.GET_COVID_STATUS_LIST,
            ReducerTypes.GET_FACILITY_LIST,
            ReducerTypes.GET_PATIENT_STATUS_LIST,
            ReducerTypes.GET_STATE_LIST
        ]
    ));
};

/**
 * create patient object
 * @param {object} state: body of the patient object to be created 
 */
const createPatient = state => async (dispatch) => {
    const create_patient_response = await CommonService.makeAuthorizedApiCall(Routes.CREATE_PATIENT_LIST_URL, POST, state, {})
    const patient_data = await create_patient_response.json();
    if(create_patient_response.ok) {
        return {status: true, patientId: patient_data.personal_details[0].id};
    } else if(create_patient_response.status === HttpStatus.BAD_REQUEST) {
        let error = "Some Error Occurred";
        if(patient_data.icmr_id && patient_data.govt_id) {
            error = patient_data.icmr_id[0] + "\n" + patient_data.govt_id[0]
        }
        else if(patient_data.icmr_id) {
            error = patient_data.icmr_id[0];
        }
        else if(patient_data.govt_id) {
            error = patient_data.govt_id[0];
        } 
        return { status: false, error: error };
    }
    return {status:false, error:  "Some Error Occurred"}
}


const fetchPatient = id => async (dispatch) => {
    const fetch_patient_response = await CommonService.makeAuthorizedApiCall(`${Routes.GET_PATIENT_URL}${id}/`, GET, {}, {})
    if(fetch_patient_response.ok){
        const data = await fetch_patient_response.json()
        dispatch({
            type: ReducerTypes.SET_CURRENT_PATIENT,
            data: data
        });
    }
}

/**
 * update the patient details 
 * @param {object} body: body of the patient details
 * @param {number} id: patient id required to update the patient details
 */
const updatePatientDetails = (body, id) => async (dispatch) => {
    const update_patient_response = await CommonService.makeAuthorizedApiCall(`${Routes.GET_PATIENT_URL}${id}/`, PUT, body, {})
    if(update_patient_response.ok) {
        const update_patient_data = await update_patient_response.json();
    }
}

/**
 * fetch the dependencies required for patient details
 * @param {list} required_data: contains the list for route with reducer types
 */
const getPatientDetailsDependencies = required_data => async (dispatch) => {
    return await dispatch(dispatchDependentActions(...required_data));
};

/**
 * create patient sample test associated with the patient
 * @param {Object} lab_data: data of the sample test to be created of patient
 */
const createPatientSampleTest = lab_data => async (dispatch) => {
    const patient_test_response = await CommonService.makeAuthorizedApiCall(Routes.CREATE_PATIENT_SAMPLE_TEST_URL, POST, lab_data, {})
    return patient_test_response.ok;
};

/**
 * fetch the list of all testing labs
 */
const getTestingLabList = () => async (dispatch) => {
    const testing_lab_response = await CommonService.makeAuthorizedApiCall(Routes.GET_TESTING_LAB_LIST_URL, GET, {}, {})
    dispatch(dispatchAction(ReducerTypes.GET_TESTING_LABS_LIST, testing_lab_response));
};

export { getPatientList, getsPatientDependencies, getProfileDependencies, createPatient, fetchPatient, updatePatientDetails, getPatientDetailsDependencies, createPatientSampleTest, getTestingLabList };
