export function transformUserResponse(user) {
  console.log("UserDetails; ", user);
  return {
    id: user._id,
    userRole: user.userRole,
    contactNo: user.contactNo,
    email: user.email,
    name: user.name,
    profileImage: user.profileImage,
    companyName: user.companyName,
    activeStatus: user.activeStatus,
    companyImage: user.companyImage,
    currency: user.currency,
    timeZone: user.timeZone,
    createdAt: user.createdAt,
    isAdmin: user.isAdmin,
  };
}
