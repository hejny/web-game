export function wrapReducer(reducer){
    if('groupCollapsed' in console){
        return function (oldState,action) {
            console.groupCollapsed(`==[${action.type}]==>`);
            console.log(oldState);
            console.log('||');
            console.log('||');

            console.log(`[${action.type}]`, action);
            const newState = reducer(oldState, action);

            console.log('||');
            console.log('||');
            console.log('\\/');
            console.log(newState);

            console.groupEnd();
            return newState;
        }
    }else{

        return reducer;
    }
}