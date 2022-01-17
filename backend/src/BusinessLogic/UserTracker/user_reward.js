
function userRewardCreator(){
    const userReward = emptyData();
    
    return {
        ...userReward,
        ...updateData(userReward.data),
        ...deleteUserReward(userReward.data),
    }
}

function updateData(userReward){
    const key = "updateData";
    const code = (args) => {
        //Fill in the blanks
        for(const [key, value] of Object.entries(args)){
           userReward[key] = value;
        }
    }

    return createObjectTemplate(key, code);
}

function deleteUserReward(userReward){
    const key = "deleteUserReward";
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
            "reward_id": 0,
            "points": 0,
            "bonus_points": 0,
        }
    }
}

export {
    userRewardCreator
}