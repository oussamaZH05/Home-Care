import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class UserService {
  userUrl: string = "http://localhost:3002/users";
  constructor(private http: HttpClient) {}
  //signup
  signup(user: any, img: any, cv: any) {
    let formData = new FormData();
    formData.append("firstName", user.firstName);
    formData.append("lastName", user.lastName);
    formData.append("experience", user.experience);
    formData.append("address", user.address);
    formData.append("phone", user.phone);
    formData.append("email", user.email);
    formData.append("password", user.password);
    formData.append("gender", user.gender);
    formData.append("status", user.status);
    formData.append("role", user.role);
    formData.append("cv", cv);
    formData.append("img", img);
    return this.http.post<{ message: string; isAdded: boolean }>(
      `${this.userUrl}/signup`,
      formData
    );
  }
  // login
  login(user: any) {
    return this.http.post<{ user: any; message: string }>(
      `${this.userUrl}/login`,
      user
    );
  }

  //get all users
  getAllUsers() {
    return this.http.get<{ usersTab: any }>(`${this.userUrl}/allUsers`);
  }
  //get all nurses
  getAllNurses() {
    return this.http.get<{ nursesTab: any }>(`${this.userUrl}/nurses`);
  }

  // get User by Id
  getUserById(id: any) {
    return this.http.get<{ user: any }>(`${this.userUrl}/${id}`);
  }

  // edit user
  editUser(obj: any) {
    return this.http.put<{ message: string }>(this.userUrl, obj);
  }

  // search Nurses
  searchNurses(obj: any) {
    return this.http.post<{ searchTab: string }>(
      `${this.userUrl}/search/nurses`,
      obj
    );
  }

  // Confirm user status
  ConfirmUser(obj: any) {
    return this.http.put<{ message: string }>(
      `${this.userUrl}/user/confirm`,
      obj
    );
  }

  //delete User By Id
  deleteUser(id: any) {
    return this.http.delete<{ isDeleted: boolean }>(`${this.userUrl}/${id}`);
  }
}

// $or: [
//   { address: searchObj.address },
//   {
//     experience: {
//       $gte: searchObj.experienceMin,
//       $lte: searchObj.experienceMax,
//     },
//   },
// ],
