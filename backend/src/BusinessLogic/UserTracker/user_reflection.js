
const VoteEnum = Object.freeze({ "neutral": -1, "up": 1, "down": 2 });

function userReflectionCreator(){
    const userReflection = emptyData();
    
    return {
        ...userReflection,
        ...updateData(userReflection.data),
        ...vote(userReflection.data),
        ...deleteUserReflection(userReflection.data),
    }
}

function updateData(userReflection){
    const key = "updateData";
    const code = (args) => {
        //Fill in the blanks
        for(const [key, value] of Object.entries(args)){
           userReflection[key] = value;
        }
    }

    return createObjectTemplate(key, code);
}

function vote(userReflection){
    const key = "vote";
    const code = (vote) => {
        //Fill in the blanks

    }

    return createObjectTemplate(key, code);
}



function deleteUserReflection(userReflection){
    const key = "deleteUserReflection";
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
            "reflection_id": 0,
            "date_started": "0000-00-00T00:00:00.000Z",
            "date_completed": "0000-00-00T00:00:00.000Z",
            "answer": "",
            "vote": -1,
            "vote_choices": VoteEnum,
        }
    }
}

export {
    userReflectionCreator
}