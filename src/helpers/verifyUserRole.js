module.exports = function verifyUserRole(request, userRole) {
  const { role } = request.user.payload;
  return role === userRole;
};
