import * as Constants from "Constants/app.const";
import _ from 'underscore';

const getDictNameToId = list => {
    const listMap = {};
    list.forEach(item => {
        listMap[item.name] = item.id;
    });
    return listMap;
};

const mapNameToId = (nameToIdDict, nameList) => {
    return nameList.map(name => nameToIdDict[name]);
};

export const mapProps = (params, requiredLists) => {
    const updateParams = Object.assign({}, params);
    Object.keys(requiredLists).forEach(function(listKey) {
        Object.keys(updateParams).forEach(function(paramKey) {
            if (paramKey === listKey) {
                updateParams[paramKey] = mapNameToId(
                    getDictNameToId(requiredLists[listKey]),
                    updateParams[paramKey]
                );
            }
        });
    });
    return updateParams;
};

export const multiSelectBooleanFilterCallback = (
    selectedParams,
    requiredLists,
    val
) => {
    const updateSelectedParams = {
        ...selectedParams,
        ...mapProps(val, requiredLists),
    };
    return updateSelectedParams;
};

export const multiSelectNumberFilterCallback = (selectedParams, val) => {
    let update_select_params = { ...selectedParams };
    Object.keys(update_select_params).forEach(key => {
        if (key.includes(val.field)) delete update_select_params[key];
    });
    if (val.fromValue !== "" || val.toValue !== "") {
        if (val.type === Constants.EQUAL_TO) {
            update_select_params[val.field] = val.fromValue;
        } else if (val.type === Constants.LESS_THAN) {
            update_select_params[val.field + "__lt"] = val.fromValue;
        } else if (val.type === Constants.GREATER_THAN) {
            update_select_params[val.field + "__gt"] = val.fromValue;
        } else if (val.type === Constants.RANGE) {
            update_select_params[
                val.field + "__range"
            ] = `${val.fromValue},${val.toValue}`;
        }
    }
    return update_select_params;
};

export const numberFilterCallbackWithRange = (selectedParams, val) => {
    let update_select_params = { ...selectedParams }
    delete update_select_params[val.field + '_min']
    delete update_select_params[val.field + '_max']
    if(val.type === Constants.EQUAL_TO){
      update_select_params[val.field + '_min'] = [val.fromValue]
      update_select_params[val.field + '_max'] = [val.fromValue]
    } else if(val.type === Constants.LESS_THAN_EQUAL_TO){
      update_select_params[val.field + '_max'] = [val.fromValue]
    } else if(val.type === Constants.GREATER_THAN_EQUAL_TO){
      update_select_params[val.field + '_min'] = [val.fromValue]
    } else if(val.type === Constants.RANGE){
      update_select_params[val.field + '_min'] = [val.fromValue]
      update_select_params[val.field + '_max'] = [val.toValue]
    }
    return update_select_params
}

export const multiSelectDateCallBack = (selectedParams, val) => {
    let update_select_params = { ...selectedParams };
    delete update_select_params[val.field + "_after"];
    delete update_select_params[val.field + "_before"];
    if (val.type === Constants.EQUAL_TO) {
        update_select_params[val.field + "_after"] = [val.fromValue];
        update_select_params[val.field + "_before"] = [val.fromValue];
    } else if (val.type === Constants.LESS_THAN) {
        update_select_params[val.field + "_after"] = [val.fromValue];
    } else if (val.type === Constants.GREATER_THAN) {
        update_select_params[val.field + "_before"] = [val.fromValue];
    } else if (val.type === Constants.RANGE) {
        update_select_params[val.field + "_after"] = [val.fromValue];
        update_select_params[val.field + "_before"] = [val.toValue];
    }
    return update_select_params;
};

export const getFormattedColumnDefs = columnDefs => {
    const flatColumnDefs = [];
    columnDefs.forEach(column => {
        if (column.hasOwnProperty("children")) {
            column.children.forEach(child => {
                const flatChild = { ...child };
                flatChild.headerName = `${column.headerName} - ${flatChild.headerName}`;
                flatColumnDefs.push(flatChild);
            });
        } else {
            flatColumnDefs.push(column);
        }
    });
    return flatColumnDefs;
};

export const fillBooleanFilterOptions = (columnDefs, requiredLists) => {
    columnDefs.forEach(column => {
        Object.keys(requiredLists).forEach(function(listKey) {
            if (column.field === listKey) {
                column.cellRendererParams.options = requiredLists[listKey];
            }
        });
    });
    return columnDefs;
};

export const replaceIds = (IdList, mapList) => {
    return IdList && mapList ? IdList.map(id => {
        const element = mapList.find(item => item.id == id)
        return {
            'value': element.id,
            'label': element.name
        }
    }) : []
}
