const BASE_TEACHER = [];
const BASE_ADMIN = [
  // student
  "view:student",
  "update:student",

  // teacher
  "select:teacher",

  // user
  "create:user",
  "update:user",
  "delete:user",

  // menu
  "view:menu",
  "view:setting",
];
const BASE_SUPER_ADMIN = [
  // teacher
  "select:teacher",

  // student
  "view:student",
  "update:student",

  // user
  "create:user",
  "update:user",
  "delete:user",
  "change_password:change_password",

  // menu
  "view:menu",
  "view:setting",
];

export const ROLES = {
  Teacher: BASE_TEACHER,
  Admin: BASE_ADMIN,
  SuperAdmin: BASE_SUPER_ADMIN,
};

export function hasPermission(role, permission) {
  const permissions = ROLES[role] || [];
  return permissions.includes(permission);
}
