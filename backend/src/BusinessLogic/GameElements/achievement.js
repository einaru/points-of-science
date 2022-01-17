import { contentCreator } from "../../internal.js";

const AchievementTypeEnum = Object.freeze({ "category": 1, "challenge": 2 });

function achievementCreator(){
    const content = contentCreator();
    const achievement = emptyData();

    return {
        ...content,
        ...achievement,
        ...setType(achievement.data),
        ...addCondition(achievement.data),
        ...removeCondition(achievement.data),
        ...checkCondition(achievement.data),
        ...deleteAchievement(achievement.data),
    }
}

function setType(achievement){
    const key = "setType";
    const code = (type) => {
        //Fill in the blanks
    }

    return createObjectTemplate(key, code);
}

function addCondition(achievement){
    const key = "addCondition";
    const code = (conditions) => {
        //Fill in the blanks
    }

    return createObjectTemplate(key, code);
}

function removeCondition(achievement){
    const key = "removeCondition";
    const code = (conditions) => {
        //Fill in the blanks
    }

    return createObjectTemplate(key, code);
}

function checkCondition(achievement){
    const key = "checkCondition";
    const code = () => {
        //Fill in the blanks
    }

    return createObjectTemplate(key, code);
}

function deleteAchievement(achievement){
    const key = "deleteAchievement";
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
            "condition": [],
            "type": -1,
        }
    }
}

export {
    achievementCreator
}