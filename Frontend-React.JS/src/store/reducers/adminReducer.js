import actionTypes from '../actions/actionTypes';

const initialState = {
    isLoadingGender: false,
    genders: [],
    roles: [],
    positions: [],
    users: [],
    topDoctors: [],
    allDoctors: [],
    allDoctors2: [],
    totalPages: 0,
    allSchedule: [],
    activeMenu: null,
    allRequiredDoctorInfo: [],
    allHandbooks: [],
    totalPagesHB: 0,
    dataSpecialty: [],
}

const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_GENDER_START:
            state.isLoadingGender = true;
            return {
                ...state,
            }
        
        case actionTypes.FETCH_GENDER_SUCCESS:
            state.genders = action.data;
            state.isLoadingGender = false;
            return {
                ...state,
            }
        
        case actionTypes.FETCH_GENDER_FAILED:
            state.isLoadingGender = false;
            state.genders = [];
            return {
                ...state,
            }
        
        case actionTypes.FETCH_POSITION_SUCCESS:
            state.positions = action.data;
            return {
                ...state,
            }
        
        case actionTypes.FETCH_POSITION_FAILED:
            state.positions = [];
            return {
                ...state,
            }
        
        case actionTypes.FETCH_ROLE_SUCCESS:
            state.roles = action.data;
            return {
                ...state,
            }
        
        case actionTypes.FETCH_ROLE_FAILED:
            state.roles = [];
            return {
                ...state,
            }
        
        case actionTypes.FETCH_ALL_USERS_SUCCESS:
            state.users = action.users;
            return {
                ...state,
            }
        
        case actionTypes.FETCH_ALL_USERS_FAILED:
            state.users = [];
            return {
                ...state,
            }
        
        case actionTypes.FETCH_TOP_DOCTORS_SUCCESS:
            state.topDoctors = action.dataDoctors;
            return {
                ...state,
            }
        
        case actionTypes.FETCH_TOP_DOCTORS_FAILED:
            state.topDoctors = [];
            return {
                ...state,
            }
        
        case actionTypes.FETCH_ALL_DOCTORS_SUCCESS:
            state.allDoctors = action.dataDr;
            state.totalPages = action.totalPage
            return {
                ...state,
            }
        
        case actionTypes.FETCH_ALL_DOCTORS_FAILED:
            state.allDoctors = [];
            return {
                ...state,
            }

        case actionTypes.FETCH_ALL_DOCTORS2_SUCCESS:
            state.allDoctors2 = action.dataDr2;
            
            return {
                ...state,
            }
        
        case actionTypes.FETCH_ALL_HANDBOOK_SUCCESS:
            state.allHandbooks = action.dataHB;
            state.totalPagesHB = action.totalPage
            return {
                ...state,
            }
        
        case actionTypes.FETCH_ALL_HANDBOOK_FAILED:
            state.allHandbooks = [];
            return {
                ...state,
            }
    
        
        case actionTypes.FETCH_ALLCODE_SCHEDULE_HOUR_SUCCESS:
            state.allSchedule = action.dataTime;
            return {
                ...state,
            }
        
        case actionTypes.FETCH_ALLCODE_SCHEDULE_HOUR_FAILED:
            state.allSchedule = [];
            return {
                ...state,
            }
        
        case actionTypes.FETCH_REQUIRED_DOCTOR_INFO_SUCCESS:
            state.allRequiredDoctorInfo = action.data;
            return {
                ...state,
            }
        
        case actionTypes.FETCH_REQUIRED_DOCTOR_INFO_FAILED:
            state.allRequiredDoctorInfo = [];
            return {
                ...state,
            }
        
        case actionTypes.SEARCH_SPECIALTY_SUCCESS:
            state.dataSpecialty = action.dataSpecialty;
            return {
                ...state,
            }
        
        case actionTypes.SEARCH_SPECIALTY_FAILED:
            state.dataSpecialty = [];
            return {
                ...state,
            }

        case actionTypes.SET_ACTIVE_MENU:
            return {
                ...state,
                activeMenu: action.payload,
            };
        
        default:
            return state;
    }
}

export default adminReducer;