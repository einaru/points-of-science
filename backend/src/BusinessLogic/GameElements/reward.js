
function rewardCreator(){
    const reward = emptyData();

    return {
        reward: {
        ...reward,
        ...updateData(reward.data),
        ...deleteReward(reward.data),
        }
    }
}

function updateData(content){
    const key = "updateData";
    const code = (args) => {
        //Fill in the blanks
        for(const [key, value] of Object.entries(args)){
            content[key] = value;
        }
    }

    return createObjectTemplate(key, code);
}

function deleteReward(reward){
    const key = "deleteReward";
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
            "max_points": 0,
            "first_try_points": 0,
            "bonus_points": 0,
        }
    }
}

export {
    rewardCreator
}