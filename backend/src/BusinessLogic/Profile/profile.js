
function profileCreator(){
    const profile = emptyData();

    return {
        ...profile,
        ...updateData(profile.data),
        ...getPoints(profile.data),
        ...changePassword(profile.data),
        ...deleteProfile(profile.data),
        ...requestUserData(profile.data),
    }
}

function updateData(profile){
    const key = "updateData";
    const code = (args) => {
        //Fill in the blanks
        for(const [key, value] of Object.entries(args)){
            profile[key] = value;
        }
    }

    return createObjectTemplate(key, code);
}

function getPoints(profile){
    const key = "getPoints";
    const code = () => {
        //Fill in the blanks
    }

    return createObjectTemplate(key, code);
}

function changePassword(profile){
    const key = "changePassword";
    const code = (oldPassword, newPassword) => {
        //Fill in the blanks
    }

    return createObjectTemplate(key, code);
}

function deleteProfile(profile){
    const key = "deleteProfile";
    const code = () => {
        //Fill in the blanks
    }

    return createObjectTemplate(key, code);
}

function requestUserData(profile){
    const key = "requestUserData";
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
            "user_id": 0,
            "password": "",
            "name": "", 
            "permission": "",
            "achievements": [],
            "challenges": [],
            "data_collection": {}
        }
    }
}

export {
    profileCreator
}