export const getDateStringFromTs = (timestamp: number) => {
    const datetimeString = new Date(timestamp).toISOString();
    return datetimeString.substring(0, datetimeString.indexOf('T'))
  }
  