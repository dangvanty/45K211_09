import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    REGISTER_REQUEST,
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOAD_USER_REQUEST,
    LOAD_USER_SUCCESS,
    LOAD_USER_FAIL,
    LOGOUT_SUCCESS,
    LOGOUT_FAIL,
    UPDATE_PROFILE_REQUEST,
    UPDATE_PROFILE_SUCCESS,
    UPDATE_PROFILE_FAIL,
    UPDATE_PROFILE_RESET,
    CLEAR_ERRORS

} from "../constants/userConstants";




export const userReducer = (state = { user: {} }, action) => {
    switch (action.type) {
        case LOGIN_REQUEST:
        case REGISTER_REQUEST:
        case LOAD_USER_REQUEST:
            return{
                loading: true,
                isAuthenticated: false,
            }

        case LOAD_USER_FAIL:
            return {
                loading: false,
                isAuthenticated: false,
                user: null,
                error: action.payload,
            };
        case LOGIN_SUCCESS:
        case REGISTER_SUCCESS:
        case LOAD_USER_SUCCESS:
            return{
                ...state,
                loading: false,
                isAuthenticated: true,
                user: action.payload,
            }
        case LOGOUT_SUCCESS:
            return {
                loading: false,
                user: null,
                isAuthenticated: false,
            };
            
        case LOGOUT_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };    
        case LOGIN_FAIL:
        case REGISTER_FAIL:
            return {
                ...state,
                loading: false,
                isAuthenticated: false,
                user: null,
                error: action.payload,
        };

        case CLEAR_ERRORS:
            return {
              ...state,
              error: null,
            };
        default:
            return state;
    }
}



export const profileReducer = (state = {}, action) => {
    switch (action.type) {
      case UPDATE_PROFILE_REQUEST:
    //   case UPDATE_PASSWORD_REQUEST:
    //   case UPDATE_USER_REQUEST:
    //   case DELETE_USER_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case UPDATE_PROFILE_SUCCESS:
    //   case UPDATE_PASSWORD_SUCCESS:
    //   case UPDATE_USER_SUCCESS:
        return {
          ...state,
          loading: false,
          isUpdated: action.payload,
        };
  
    //   case DELETE_USER_SUCCESS:
    //     return {
    //       ...state,
    //       loading: false,
    //       isDeleted: action.payload.success,
    //       message: action.payload.message,
    //     };
  
      case UPDATE_PROFILE_FAIL:
    //   case UPDATE_PASSWORD_FAIL:
    //   case UPDATE_USER_FAIL:
    //   case DELETE_USER_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
  
      case UPDATE_PROFILE_RESET:
    //   case UPDATE_PASSWORD_RESET:
    //   case UPDATE_USER_RESET:
        return {
          ...state,
          isUpdated: false,
        };
  
    //   case DELETE_USER_RESET:
    //     return {
    //       ...state,
    //       isDeleted: false,
    //     };
  
      case CLEAR_ERRORS:
        return {
          ...state,
          error: null,
        };
  
      default:
        return state;
    }
  };
  