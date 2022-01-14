import { clickStreamItemCreator } from '../internal.js';

function clickStreamCreator(){
    const clickStream = emptyData();
    const clickStreamItem = clickStreamItemCreator();

    return {
        ...clickStream,
        ...clickStreamItem,
        ...updateData(clickStream.data),
        ...deleteClickStream(clickStream.data),
    }
}

function updateData(clickStream){
    const key = "updateData";
    const code = (args) => {
        //Fill in the blanks
        for(const [key, value] of Object.entries(args)){
           clickStream[key] = value;
        }
    }

    return createObjectTemplate(key, code);
}

function deleteClickStream(clickStream){
    const key = "deleteClickStream";
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
        }
    }
}

export {
    clickStreamCreator
}