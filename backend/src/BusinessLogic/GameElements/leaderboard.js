
function leaderboardCreator(){
    const leaderboard = emptyData();

    return {
        leaderboard: {
        ...leaderboard,
        ...setTitle(leaderboard.data),
        ...addToLeaderboard(leaderboard.data),
        ...removeFromLeaderboard(leaderboard.data),
        ...calculateTotalPoints(leaderboard.data),
        ...calculatePointsForCategory(leaderboard.data),
        ...calculateTotalPointsForDifficulty(leaderboard.data),
        ...calculatePointsForDifficultyWithinCategory(leaderboard.data),
        ...deleteLeaderboard(leaderboard.data),
        }
    }
}

function setTitle(leaderboard){
    const key = "setTitle";
    const code = (title) => {
        //Fill in the blanks
    }

    return createObjectTemplate(key, code);
}

function addToLeaderboard(leaderboard){
    const key = "addToLeaderboard";
    const code = (profileID) => {
        //Fill in the blanks
    }

    return createObjectTemplate(key, code);
}

function removeFromLeaderboard(leaderboard){
    const key = "removeFromLeaderboard";
    const code = (profileID) => {
        //Fill in the blanks
    }

    return createObjectTemplate(key, code);
}

function calculateTotalPoints(leaderboard){
    const key = "calculateTotalPoints";
    const code = () => {
        //Fill in the blanks
    }

    return createObjectTemplate(key, code);
}

function calculatePointsForCategory(leaderboard){
    const key = "calculatePointsForCategory";
    const code = () => {
        //Fill in the blanks
    }

    return createObjectTemplate(key, code);
}

function calculateTotalPointsForDifficulty(leaderboard){
    const key = "calculateTotalPointsForDifficulty";
    const code = () => {
        //Fill in the blanks
    }

    return createObjectTemplate(key, code);
}

function calculatePointsForDifficultyWithinCategory(leaderboard){
    const key = "calculatePointsForDifficultyWithinCategory";
    const code = () => {
        //Fill in the blanks
    }

    return createObjectTemplate(key, code);
}

function deleteLeaderboard(leaderboard){
    const key = "deleteLeaderboard";
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
            "title": "",
            "leaderboard": [],
        }
    }
}

export {
    leaderboardCreator
}