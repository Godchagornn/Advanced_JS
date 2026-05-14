const loggerMiddleware = (storeAPI) => (next) => (action) => {
  if (process.env.NODE_ENV === 'development') {
    console.group(action.type);
    console.log('prev state', storeAPI.getState());
    console.log('action', action);
    const result = next(action);
    console.log('next state', storeAPI.getState());
    console.groupEnd();
    return result;
  }
  return next(action);
};

export default loggerMiddleware;
