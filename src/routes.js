const SERVER = process.env.REACT_APP_SERVER
const API_V1 = 'api/v1/';

// Accounts
export const LOGIN_URL = SERVER + API_V1 + 'accounts/login/';
export const LOGOUT_URL = SERVER + API_V1 + 'accounts/logout/';
export const PASSWORD_FORGOT_URL = SERVER + API_V1 + 'accounts/forgot-password/';
export const PASSWORD_RESET_URL = SERVER + API_V1 + 'accounts/password-reset-confirm/{0}/{1}/';
export const DISTRICT_LIST_URL = SERVER + API_V1 + 'accounts/districts/';
export const CITIES_LIST_URL = SERVER + API_V1 + 'accounts/cities/';
export const STATE_LIST_URL = SERVER + API_V1 + 'accounts/states/'
export const LOCAL_BODY_URL = SERVER + API_V1 + 'accounts/local-body/'
export const USER_PROFILE_URL = SERVER + API_V1 + 'accounts/users/';
export const USER_TYPE_URL = SERVER + API_V1 + 'accounts/user-types/';

// Facilities
export const FACILITY_LIST_URL = SERVER + API_V1 + 'facilities/facility';
export const FACILITY_TYPE_LIST_URL = SERVER + API_V1 + 'facilities/facility-type';
export const FACILITY_INVENTORY_LIST_URL = SERVER + API_V1 + 'facilities/inventories/';
export const FACILITY_INFRASTRUCTURE_LIST_URL = SERVER + API_V1 + 'facilities/infrastructures/?limit={0}&offset={1}';
export const FACILITY_INFRASTRUCTURE_UPDATE_URL = SERVER + API_V1 + 'facilities/infrastructures/{0}/';
export const FACILITY_INFRASTRUCTURE_CREATE_URL = SERVER + API_V1 + 'facilities/infrastructures/';
export const ROOM_TYPES_LIST_URL = SERVER + API_V1 + 'facilities/room-type/';
export const BED_TYPES_LIST_URL = SERVER + API_V1 + 'facilities/bed-type/';
export const FACILITY_SHORT_LIST_URL = SERVER + API_V1 + 'facilities/facility/short/';
export const FACILITY_STAFF_LIST_URL = SERVER + API_V1 + 'facilities/staffs/?limit={0}&offset={1}';
export const FACILITY_STAFF_UPDATE_URL = SERVER + API_V1 + 'facilities/staffs/{0}/';
export const FACILITY_STAFF_CREATE_URL = SERVER + API_V1 + 'facilities/staffs/';
export const STAFF_DESIGNATION_LIST_URL = SERVER + API_V1 + 'facilities/staff-designation';
export const FACILITY_ADMINSTRATORS_LIST_URL = SERVER + API_V1 + 'facilities/facility/{0}/managers'

// commons
export const OWNERSHIP_TYPE_LIST_URL = SERVER + API_V1 + 'commons/ownership-type/';

//inventories
export const INVENTORY_TYPE_LIST_URL = SERVER + API_V1 + 'facilities/inventory-items';
export const CREATE_INVENTORY_URL = SERVER + API_V1 + 'facilities/inventories/';

// Patients
export const PATIENT_LIST_URL = SERVER + API_V1 + 'patients/?limit={0}&offset={1}';
export const CLINICAL_STATUS_LIST_URL = SERVER + API_V1 + 'patients/clinical-status/';
export const CLUSTER_GROUP_LIST_URL = SERVER + API_V1 + 'patients/patient-groups/';
export const COVID_STATUS_LIST_URL = SERVER + API_V1 + 'patients/covid-status/';
export const GET_PATIENT_URL = SERVER + API_V1 + 'patients/'

//patient sample test
export const CREATE_PATIENT_SAMPLE_TEST_URL = SERVER + API_V1 + 'patients/sample-tests/'

//Patient Transfers
export const TRANSFER_LIST_URL = SERVER + API_V1 + 'patients/patient-transfer/';
export const TRANSFER_UPDATE_URL = SERVER + API_V1 + 'patients/patient-transfer/';
export const CREATE_PATIENT_LIST_URL = SERVER + API_V1 + 'patients/'
export const ADD_PATIENT_TRANSFER_URL = SERVER + API_V1 + 'patients/patient-transfer/';
export const GET_SHORT_PATIENT_LIST_URL = SERVER + API_V1 + 'patients/patients-short/'

//patient dependencies
export const PATIENT_STATUS_LIST_URL = SERVER + API_V1 + 'patients/current-status/'

//testing labs
export const GET_TESTING_LAB_LIST_URL = SERVER + API_V1 + 'facilities/testing-labs/'

//portie calling 
export const PORTIE_CALLING_URL = SERVER + API_V1 + 'patients/daily-callers/'
export const GET_PORTEA_USERS = SERVER + API_V1 + 'accounts/users/portea/'

// Relative paths to pages
export const RELATIVE_PATH_FACILITY_DETAIL = '/facilities/facility-details/{0}'
export const RELATIVE_LOGIN = '/login';

// patient family member
export const PATIENT_FAMILY_MEMBER_URL = SERVER + API_V1 + 'patients/family-members/'

//patient personal details
export const PERSONAL_DETAILS_URL  =  SERVER + API_V1 + 'patients/personal-details/'

//patient medication details
export const MEDICATION_DETAILS_URL = SERVER + API_V1 + 'patients/medication-details/'

//patient contact details
export const CONTACT_DETAILS_URL = SERVER + API_V1 + 'patients/contact-details/'
