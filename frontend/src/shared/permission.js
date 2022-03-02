export const Permission = Object.freeze({
  ADMIN: 1,
  CONTROL: 2,
  EXPERIMENT: 3,
});

export const PermissionName = Object.keys(Permission).reduce((obj, key) => {
  return {
    ...obj,
    [Permission[key]]: key,
  };
}, {});
