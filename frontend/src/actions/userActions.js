import axios from 'axios';
import {
  LOGIN_FAIL,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  CLEAR_ERRORS,
} from '../constants/userConstants';

//Login

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: LOGIN_REQUEST,
    });
    const config = {
      headers: {
        'content-Type': 'application/json',
      },
    };
    const { data } = await axios.post(
      '/api/v1/login',
      { email, password },
      config
    );
    dispatch({
      type: LOGIN_SUCCESS,
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: LOGIN_FAIL,
      payload: error.response.data.message,
    });
  }
};
