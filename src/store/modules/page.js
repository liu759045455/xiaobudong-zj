
const page = {
    state: {
        stepIndex: 5,
        setEditor: false,
        regInfo: {}
    },
    mutations: {
        'SET_STEP': (state, result) => {
            state.stepIndex = result;
        },
        'SET_Editor': (state, result) => {
            state.setEditor = result;
        },
        'SET_RegInfo': (state, result) => {
            state.regInfo = result;
        },
    },
    actions: {
        SET_STEP({
            commit
        }, result) {
            commit('SET_STEP', result);
        },
        SET_Editor({
            commit
        }, result) {
            commit('SET_Editor', result);
        },
        SET_RegInfo({
            commit
        }, result) {
            commit('SET_RegInfo', result);
        },

    },
    namespaced: true
};
export default page;