import * as CommonService from "Src/utils/services";
import * as Routes from 'Src/routes';
import { POST, PUT } from "Src/constants";

/**
 * service for create or update inventory object
 * @param {object} body: details regarding portie or family member associated with patient 
 * @param {id} id: only when details required to be updated 
 */
async function makeAuthorizedFacilityApiCall(body, id = null) {
    let url = Routes.CREATE_INVENTORY_URL;
    let method = POST;
    if(id) {
        method = PUT;
        url += `${id}/`;
    }
    return  CommonService.makeAuthorizedApiCall(url, method, body, {}, {})
}

export { makeAuthorizedFacilityApiCall };
