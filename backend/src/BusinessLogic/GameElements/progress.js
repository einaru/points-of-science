
function progressCreator(){
    const progress = emptyData();

    return {
        progress: {
        ...progress,
        ...setProgress(progress.data),
        ...calculateProgress(progress.data),
        ...deleteProgress(progress.data),
        }
    }
}

function setProgress(progress){
    const key = "setProgress";
    const code = (percentage) => {
        //Fill in the blanks
    }

    return createObjectTemplate(key, code);
}

function calculateProgress(progress){
    const key = "calculateProgress";
    const code = (completeList, totalList) => {
        //Fill in the blanks
    }

    return createObjectTemplate(key, code);
}

function deleteProgress(progress){
    const key = "deleteProgress";
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
            "percentage": 0
        }
    }
}

export {
    progressCreator
}