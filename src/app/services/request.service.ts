import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class RequestService {
  requestsUrl: string = "http://localhost:3002/requests";
  constructor(private http: HttpClient) {}

  //get all sent requests with associated client
  getRequestsWithClients(obj) {
    return this.http.post<{ sentRequests: any }>(
      `${this.requestsUrl}/myRequests/clients`,
      obj
    );
  }
  sendRequestToNurse(obj) {
    return this.http.post<{ message: string }>(
      `${this.requestsUrl}/sendRequests`,
      obj
    );
  }
  //get all received requests with associated client

  getReceivedRequests(obj) {
    return this.http.post<{ receivedRequests: any }>(
      `${this.requestsUrl}/myRequests/received`,
      obj
    );
  }
  changeRequestStatus(obj) {
    return this.http.put<{ message: string }>(
      `${this.requestsUrl}/myRequests/sent`,
      obj
    );
  }
  //Get all sent request in the dashboard admin components
  getAllSentRequests() {
    return this.http.get<{ requestsTab: any }>(
      `${this.requestsUrl}/getAllRequests`
    );
  }
  //Get all accepted Job offers in the dashboard admin components
  getAllAcceptedJobOffers() {
    return this.http.get<{ acceptedJobsTab: any }>(
      `${this.requestsUrl}/acceptedOffers`
    );
  }

  //get all requests send by the connected client
  getClientRequests(obj: any) {
    return this.http.post<{ myRequestsTab: any }>(
      `${this.requestsUrl}/requests/user`,
      obj
    );
  }
}
