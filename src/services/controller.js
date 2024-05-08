import * as MongoDb from "mongodb";
import { connectToCollection } from "../mongodb.js";

const servicesCollection = connectToCollection("services");

// Order is important!
// The first query parameter is for projections and the second one is for sorting
function parseQueryParams(queryParams) {
  return queryParams.reduce((acc, query) => {
    const aggregation = query.split("=");
    if (aggregation.length === 2) {
      acc["sort"] = { [aggregation[0]]: Number(aggregation[1]) };
    } else {
      const projections = query.split(",");
      acc["project"] = projections.reduce((acc, projection) => {
        acc[projection] = 1;
        return acc;
      }, {});
    }
    return acc;
  }, {});
}

export async function getServices(queryParams) {
  const query = queryParams != undefined ? parseQueryParams(queryParams) : {};
  let aggregateQuery = [];

  if (query.project) {
    aggregateQuery.push({ $project: query.project });
  }
  if (query.sort) {
    aggregateQuery.push({ $sort: query.sort });
  }

  return await servicesCollection.aggregate(aggregateQuery).toArray();
}

export async function getGroupedByPriceServices() {
  return await servicesCollection
    .aggregate([
      {
        $group: {
          _id: "$price",
          services: { $push: "$$ROOT" },
        },
      },
    ])
    .toArray();
}

export async function getServiceById(id) {
  return await servicesCollection.findOne({ _id: new MongoDb.ObjectId(id) });
}

export async function createService(service) {
  return await servicesCollection.insertOne({
    _id: new MongoDb.ObjectId(),
    ...service,
  });
}

export async function updateService(id, service) {
  return await servicesCollection.updateOne(
    { _id: new MongoDb.ObjectId(id) },
    { $set: service }
  );
}

export async function deleteService(id) {
  return await servicesCollection.deleteOne({ _id: new MongoDb.ObjectId(id) });
}

export async function getServicesByGivenPriceRange({ from, to }) {
  return await servicesCollection
    .find({
      price: { $gte: from, $lte: to },
    })
    .toArray();
}
