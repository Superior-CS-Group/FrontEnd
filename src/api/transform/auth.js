export const transformSignUpResponse = (response) => {
  return {
    token: response.data.token,
    message: response.data.message,
    user: transformUserResponse(response.data.user),
  };
};

export const transformUserResponse = (response) => {
  return {
    id: response._id,
    name: response.name,
    email: response.email,
    profileImage: response.profileImage,
    userRole: response.userRole,
    createdAt: response.createdAt,
    updatedAt: response.updatedAt,
    companyName: response.companyName,
    companyImage: response.companyImage,
    currency: response.currency,
    timeZone: response.timeZone,
    activeStatus: response.activeStatus,
  };
};
