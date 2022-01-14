function activityCreator(){
    const activity = emptyData();

    return {
        activity: {
            ...activity,
            ...setID(activity.data),
            ...add(activity.data),
            ...remove(activity.data),
            ...deleteActivity(activity.data),
        }
    }
}

function setID(activity){
    const key = "setID";
    const code = (id) => {
        //Fill in the blanks
        
    }

    return createObjectTemplate(key, code);
}

function add(activity){
    const key = "add";
    const code = (list, element) => {
        //Fill in the blanks
    }

    return createObjectTemplate(key, code);
}

function remove(activity){
    const key = "remove";
    const code = (list, element) => {
        //Fill in the blanks
    }

    return createObjectTemplate(key, code);
}

function deleteActivity(activity){
    const key = "deleteActivity";
    const code = () => {
        //Fill in the blanks
    }

    return createObjectTemplate(key, code);
}


function createObjectTemplate(functionKey, code){
    const object = {};
    object[functionKey] = code;
    return object;
}

function emptyData(){
    return { 
        "data": {
            "id": 0,
            "hints": [],
            "resources": [],
        }
    }
}

export {
    activityCreator
}