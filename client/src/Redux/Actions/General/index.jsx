import { CHANGE_LANGUAGE, GET_COUNTRY, SIGNATURE_CLOUDINARY } from '../Types';
import Nominatim from '~/services/Nominatim';
import GetLocation from '~/api/Location/GetLocation';

export const GetCountry = () => {
  return async (dispatch) => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(function (position) {
        Nominatim(position.coords.latitude, position.coords.longitude)
          .then((result) => {
            GetLocation('country', result.address.country)
              .then((result) => {
                dispatch({
                  type: GET_COUNTRY,
                  payload: result[0],
                });
                if (result[0]?.acronym) {
                  dispatch({
                    type: CHANGE_LANGUAGE,
                    payload: result[0]?.acronym,
                  });
                }
              })
              .catch((e) => console.log(e));
          })
          .catch((e) => console.log(e));
      });
    }
  };
};

export const ChangeLanguage = (value) => {
  return async (dispatch) => {
    dispatch({
      type: CHANGE_LANGUAGE,
      payload: value,
    });
  };
};

export const GetSignatureCloudinary = (signature, timestamp) => {
  return async (dispatch) => {
    dispatch({
      type: SIGNATURE_CLOUDINARY,
      payload: {
        signature,
        timestamp,
      },
    });
  };
};
