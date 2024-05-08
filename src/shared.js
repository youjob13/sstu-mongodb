export function returnResponse({ res, statusCode, contentType, data }) {
  res.writeHead(statusCode || 200, {
    "Content-Type": contentType || "application/json",
  });
  res.end(JSON.stringify(data));
}

export function parseBody(req, cb) {
  let body = "";

  // Listen for data events to accumulate the request body
  req.on("data", (chunk) => {
    body += chunk;
  });

  // Listen for the end of the request to process the body
  req.on("end", () => {
    // Process the request body

    cb(JSON.parse(body));
  });
}

export function extractId(req) {
  return req.url.split("?")[1].split("=")[1];
}

export function extractQueryParams(req) {
  const queryParamsString = req.url.split("?")?.[1];
  if (!queryParamsString) {
    return null;
  }
  return queryParamsString.split("&");
}
