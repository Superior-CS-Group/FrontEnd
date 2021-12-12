export const transformGetOrganizationResposne = (data) => {
  return {
    _id: data._id,
    address: data.address,
    name: data.name,
    phoneNumber: data.phoneNumber,
    coverPhoto: data.estimationCoverPhoto,
    logo: data.logo,
    teamPhoto: data.teamPhoto,
    paymentTerms: data.paymentTerms,
    termAndCondition: data.termAndCondition,
    createdAt: data.createdAt,
  };
};

/**
 * data:
address: ""
createdAt: "2021-12-12T14:39:19.834Z"
estimationCoverPhoto: ""
logo: ""
name: "company"
paymentTerms: (2) [{…}, {…}]
phoneNumber: "1234567890"
teamPhoto: ""
termAndCondition: ""
updatedAt: "2021-12-12T14:39:19.834Z"
__v: 0
_id: "61b60997675ccfb5a5706e3f"
 */
