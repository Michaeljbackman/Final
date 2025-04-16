export interface Entertainer {
  entertainerID: number;
  entStageName: string;
  entStreetAddress: string;
  entCity: string;
  entState: string;
  entZipCode: string;
  entPhoneNumber: string;
  entWebPage: string;
  entEMailAddress: string;
  dateEntered: string; // use string since dates are sent as ISO strings from .NET
}