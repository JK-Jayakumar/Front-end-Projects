import axios from "axios";
import apiURL from "helpers/apiURL";
import browserStore from "helpers/browserStore";
import { notification } from "antd";
import { removeNullValueFromObject } from 'helpers/Generic';


export const freeListingPaidReco = (
  id,
  limit,
  paidLimit,
  callingQueueId,
  isDownloadBrochure
) => {
  return dispatch => {
    return axios
      .get(apiURL("java") + `/v1/recommendations/listingreco`, {
        params: {
          listingId: id,
          limit: limit || "8",
          paidLimit: paidLimit || "8",
          callingQueueId:
            browserStore.getItem("clq") && browserStore.getItem("clq") !== ""
              ? browserStore.getItem("clq")
              : ""
        }
      })
      .then(json => {
        dispatch({
          type: "SET_PAID_RECO",
          homeBanner: json.data.message.result
        });
        dispatch({
          type: "SHOW_RECOMMENDATION",
          showReommend: json.data.message.result
        });
        if (isDownloadBrochure) {
          dispatch({ type: "TOGGLE_DOWNLOAD_BROCHURE" });
        }
        return true;
      }).catch(err => {
        console.error(err);
      });
  };
};






const bannerManager = {

  freeListingPaidReco,

};

export default bannerManager;
