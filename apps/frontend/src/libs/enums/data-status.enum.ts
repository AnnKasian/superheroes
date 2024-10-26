const DataStatus = {
  IDLE: "IDLE",
  PENDING: "PENDING",
  FULFILLED: "FULFILLED",
  REJECTED: "REJECTED",
} as const;

type DataStatus = (typeof DataStatus)[keyof typeof DataStatus];

export { DataStatus };
