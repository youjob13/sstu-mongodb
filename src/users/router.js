import {
  getUsers,
  deleteUser,
  createUser,
  getUserByIdOrName,
} from "./controller.js";
import {
  returnResponse,
  parseBody,
  extractId,
  extractQueryParams,
} from "../shared.js";

export function getRouter() {
  return {
    "[GET]/users": async (req, res) => {
      const queryParams = extractQueryParams(req);
      returnResponse({
        res,
        data: await getUsers(queryParams),
      });
    },
    "[GET]/user": async (req, res) => {
      const userIdOrName = extractId(req);
      const user = await getUserByIdOrName(userIdOrName);

      returnResponse({
        res,
        data: user,
      });
    },
    "[POST]/user": async (req, res) => {
      parseBody(req, async (body) => {
        returnResponse({
          res,
          data: await createUser(body),
        });
      });
    },
    "[DELETE]/user": async (req, res) => {
      const serviceId = extractId(req);
      await deleteUser(serviceId);

      returnResponse({ res });
    },
  };
}
