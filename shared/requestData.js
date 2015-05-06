export default async function requestData(routes, ...args) {
  return Promise.all(routes
    .map(route => route.handler.requestData)
    .filter(method => typeof method === "function")
    .map(method => method(...args))
  );
};
