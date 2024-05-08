import {
  getServices,
  deleteService,
  createService,
  getServiceById,
  updateService,
  getServicesByGivenPriceRange,
  getGroupedByPriceServices,
} from "./controller.js";
import {
  returnResponse,
  parseBody,
  extractId,
  extractQueryParams,
} from "../shared.js";

export function getRouter() {
  return {
    "[GET]/services": async (req, res) => {
      const queryParams = extractQueryParams(req);
      const services = await getServices(queryParams);

      returnResponse({
        res,
        data: services,
      });
    },
    "[GET]/services/grouped": async (req, res) => {
      returnResponse({
        res,
        data: await getGroupedByPriceServices(),
      });
    },
    "[GET]/service": async (req, res) => {
      const serviceId = extractId(req);
      const service = await getServiceById(serviceId);

      returnResponse({
        res,
        data: service,
      });
    },
    "[POST]/service": async (req, res) => {
      parseBody(req, async (body) => {
        const services = await createService(body);

        returnResponse({
          res,
          data: services,
        });
      });
    },
    "[PUT]/service": async (req, res) => {
      parseBody(req, async (body) => {
        const serviceId = extractId(req);
        const services = await updateService(serviceId, body);

        returnResponse({
          res,
          data: services,
        });
      });
    },
    "[DELETE]/service": async (req, res) => {
      const serviceId = extractId(req);
      await deleteService(serviceId);

      returnResponse({ res });
    },
    "[POST]/services/price/range": async (req, res) => {
      parseBody(req, async (body) => {
        const services = await getServicesByGivenPriceRange(body);

        returnResponse({
          res,
          data: services,
        });
      });
    },
  };
}
