import { contentCreator, reflectionCreator, argumentCreator, rewardCreator } from "../../internal.js";

const DifficultyEnum = Object.freeze({ "beginner": 1, "intermediate": 2, "expert": 3 });

function challengeCreator(category){
    const content = contentCreator();
    //const activity = 

    //Må definere hvordan en challenge vet om den skal opprette en fri refleksjon eller et argument.
    const reflection = reflectionCreator();
    
    const reward = rewardCreator();
    const challenge = emptyData();

    return {
        ...content,
        ...activity,
        ...reflection,
        ...reward,
        ...category,
        ...challenge,
        ...addChallenge(challenge.data),
        ...removeChallenge(challenge.data),
        ...deleteChallenge(challenge.data),
    }
}

function addChallenge(challenge){
    const key = "addChallenge";
    const code = (challenge) => {
        //Fill in the blanks
    }

    return createObjectTemplate(key, code);
}

function removeChallenge(challenge){
    const key = "removeChallenge";
    const code = (challenge) => {
        //Fill in the blanks
    }

    return createObjectTemplate(key, code);
}

function deleteChallenge(challenge){
    const key = "deleteChallenge";
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
            "difficulty": DifficultyEnum.beginner,
            "difficulty_levels": DifficultyEnum,
        }
    }
}

export {
    challengeCreator
}