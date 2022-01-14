
function userAchievementCreator(){
    const userAchievement = emptyData();
    
    return {
        ...userAchievement,
        ...updateData(userAchievement.data),
        ...isCompleted(userAchievement.data),
        ...deleteUserAchievement(userAchievement.data),
    }
}

function updateData(userAchievement){
    const key = "updateData";
    const code = (args) => {
        //Fill in the blanks
        for(const [key, value] of Object.entries(args)){
           userAchievement[key] = value;
        }
    }

    return createObjectTemplate(key, code);
}

function isCompleted(userAchievement){
    const key = "isCompleted";
    const code = () => {
        //Fill in the blanks
    }

    return createObjectTemplate(key, code);
}

function deleteUserAchievement(userAchievement){
    const key = "deleteUserAchievement";
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
            "user_id": 0,
            "achievement_id": 0,
            "completed": false,
        }
    }
}

export {
    userAchievementCreator
}