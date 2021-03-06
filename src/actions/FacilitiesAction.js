import * as Routes from 'Src/routes';
import * as HttpStatus from 'http-status-codes'
import * as ReducerTypes from 'Reducers/Types';
import { dispatchAction, dispatchDependentActions } from 'Actions/common';
import * as CommonService from "Src/utils/services";
import * as facilityService from "Src/services/facilityService";
import { GET, POST, PUT } from "Src/constants";;

const getFacilitiesList = (params) => async (dispatch) => {
    const response = await CommonService.makeAuthorizedApiCall(Routes.FACILITY_LIST_URL, GET, {}, params)
    dispatch(dispatchAction(ReducerTypes.GET_FACILITY_LIST, response));
};

const getFacilityDependencies = (params) => async (dispatch) => {
    dispatch(dispatchDependentActions(
        [
            [Routes.FACILITY_TYPE_LIST_URL, GET, {}, params],
            [Routes.OWNERSHIP_TYPE_LIST_URL, GET, {}, params],
            [Routes.DISTRICT_LIST_URL, GET, {}, params],
        ],
        [ReducerTypes.GET_FACILITY_TYPE_LIST, ReducerTypes.GET_OWNERSHIP_TYPE_LIST, ReducerTypes.GET_DISTRICT_LIST]
    ));
};

const getInventoryList = (params) => async (dispatch) => {
    const inventory_list_response = await CommonService.makeAuthorizedApiCall(Routes.FACILITY_INVENTORY_LIST_URL, GET, {}, params)
    dispatch(dispatchAction(ReducerTypes.GET_FACILITY_INVENTORY_LIST, inventory_list_response));
};

const getInventoryDependencies = (params) => async (dispatch) => {
    dispatch(dispatchDependentActions(
        [
            [Routes.FACILITY_SHORT_LIST_URL, GET, {}, params],
            [Routes.INVENTORY_TYPE_LIST_URL, GET, {}, params],
        ],
        [ReducerTypes.GET_SHORT_FACILITY_LIST, ReducerTypes.GET_INVENTORY_TYPE_LIST]
    ));
};

const getTransferDependencies = (params) => async (dispatch) => {
    dispatch(dispatchDependentActions(
        [
            [Routes.FACILITY_SHORT_LIST_URL, GET, {}, params],
        ],
        [ReducerTypes.GET_SHORT_FACILITY_LIST]
    ));
};

const getProfileDependencies = (params) => async (dispatch) => {
    dispatch(dispatchDependentActions(
        [
            [Routes.FACILITY_SHORT_LIST_URL, GET, {}, params],
            [Routes.DISTRICT_LIST_URL, GET, {}, params],
            [Routes.USER_TYPE_URL, GET, {}, params],
        ],
        [ReducerTypes.GET_SHORT_FACILITY_LIST, ReducerTypes.GET_DISTRICT_LIST, ReducerTypes.USER_TYPE_LIST]
    ));
};


const getShortFacilitiesList = () => async (dispatch) => {
    dispatch(dispatchDependentActions(
        [
            [Routes.FACILITY_SHORT_LIST_URL, GET, {}, {}],
        ],
        [ReducerTypes.GET_SHORT_FACILITY_LIST]
    ));
}

export { getFacilitiesList, getFacilityDependencies, getInventoryList, getInventoryDependencies, getTransferDependencies,getProfileDependencies, getShortFacilitiesList }
