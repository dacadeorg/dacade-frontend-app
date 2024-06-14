import { HttpResponse, http } from "msw";
import { mockNotification, mockUser } from "../fixtures/user";
import { mockReferral } from "../fixtures/referrals";

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

export const userHandler = [
  http.get(`${baseUrl}/notifications`, () => {
    return HttpResponse.json([mockNotification]);
  }),
  http.post(`${baseUrl}/notifications/mark-as-read`, () => {
    return;
  }),
  http.get(`${baseUrl}/referrals`, () => {
    return HttpResponse.json([mockReferral]);
  }),
  http.get(`${baseUrl}/referrals/tracking`, () => {
    return HttpResponse.json([mockReferral]);
  }),
  http.get(`${baseUrl}/referrals/current`, () => {
    return HttpResponse.json(mockUser);
  }),
  http.get(`${baseUrl}/users/search/:username`, () => {
    return HttpResponse.json([mockUser]);
  }),
  http.patch(`${baseUrl}users/update/name`, () => {
    return;
  }),
];
