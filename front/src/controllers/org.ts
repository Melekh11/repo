import { type OrgFromServer, orgModal } from "../models/org";
import { userModel } from "../models/user";
import { type OrgValues } from "../pages/CreateOrg";
import { closeLoading, setLoading } from "../redux/slices/loading";
import { setUser } from "../redux/slices/user";
import { type AppDispatch } from "../redux/store";

async function createOrg (orgData: OrgValues, userId: number, dispatch: AppDispatch) {
  dispatch(setLoading());

  await orgModal
    .createOrg(orgData)
    .then((org: OrgFromServer) => {
      // подтянуть новые данные пользователя

      userModel.getUserData(userId).then((user) => {
        userModel
          .createPosition(user.login, orgData.name, "moder")
          .then((val) => {
            console.log(val.user);
            dispatch(setUser(val.user));
            dispatch(closeLoading());
          });
      });
    })
    .catch(async (err) => {
      dispatch(closeLoading());
      return await Promise.reject(err);
    });
}

export const orgController = {
  createOrg
};
