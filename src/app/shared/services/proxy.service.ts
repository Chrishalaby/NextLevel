import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CommonService } from './common.service';
@Injectable()
export class ProxyService {
  APIBaseUrl = '';
  url = '';
  ownerId = 1;

  constructor(public api: HttpClient, private common: CommonService) {
    this.APIBaseUrl = common.APIUrl;
  }
  Get_User_By_USER_ID_Adv(
    i_Params_Get_User_By_USER_ID: Params_Get_User_By_USER_ID
  ): Observable<User> {
    this.url =
      this.APIBaseUrl + '/Get_User_By_USER_ID_Adv?Ticket=' + this.common.ticket;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      ticket: this.common.ticket,
    });
    const options = { headers: headers };
    return this.api
      .post<Result_Get_User_By_USER_ID_Adv>(
        this.url,
        JSON.stringify(i_Params_Get_User_By_USER_ID),
        options
      )
      .pipe(
        map((response) => {
          this.common.Handle_Exception(response.ExceptionMsg);
          return response.My_Result;
        })
      );
  }
  UPC_VALIDATE_VALIDATION_CODE(
    i_Params_UPC_VALIDATE_VALIDATION_CODE: Params_UPC_VALIDATE_VALIDATION_CODE
  ): Observable<oUPC_VALIDATE_VALIDATION_CODE> {
    this.url =
      this.APIBaseUrl +
      '/UPC_VALIDATE_VALIDATION_CODE?Ticket=' +
      this.common.ticket;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      ticket: this.common.ticket,
    });
    const options = { headers: headers };
    return this.api
      .post<Result_UPC_VALIDATE_VALIDATION_CODE>(
        this.url,
        JSON.stringify(i_Params_UPC_VALIDATE_VALIDATION_CODE),
        options
      )
      .pipe(
        map((response) => {
          this.common.Handle_Exception(response.ExceptionMsg);
          return response.My_Result;
        })
      );
  }
  Add_Guest_Client(
    i_Params_Add_Guest_Client: Params_Add_Guest_Client
  ): Observable<Guest_password> {
    this.url =
      this.APIBaseUrl + '/Add_Guest_Client?Ticket=' + this.common.ticket;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      ticket: this.common.ticket,
    });
    const options = { headers: headers };
    return this.api
      .post<Result_Add_Guest_Client>(
        this.url,
        JSON.stringify(i_Params_Add_Guest_Client),
        options
      )
      .pipe(
        map((response) => {
          this.common.Handle_Exception(response.ExceptionMsg);
          return response.My_Result;
        })
      );
  }
  Get_Gender_By_OWNER_ID(
    i_Params_Get_Gender_By_OWNER_ID: Params_Get_Gender_By_OWNER_ID
  ): Observable<Gender[]> {
    this.url =
      this.APIBaseUrl + '/Get_Gender_By_OWNER_ID?Ticket=' + this.common.ticket;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      ticket: this.common.ticket,
    });
    const options = { headers: headers };
    return this.api
      .post<Result_Get_Gender_By_OWNER_ID>(
        this.url,
        JSON.stringify(i_Params_Get_Gender_By_OWNER_ID),
        options
      )
      .pipe(
        map((response) => {
          this.common.Handle_Exception(response.ExceptionMsg);
          return response.My_Result;
        })
      );
  }
  Get_Role_By_OWNER_ID(): // i_Params_Get_Role_By_OWNER_ID: Params_Get_Role_By_OWNER_ID
  Observable<Role[]> {
    this.url =
      this.APIBaseUrl + '/Get_Role_By_OWNER_ID?Ticket=' + this.common.ticket;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      ticket: this.common.ticket,
    });
    const options = { headers: headers };
    return this.api
      .post<Result_Get_Role_By_OWNER_ID>(
        this.url,
        // JSON.stringify(i_Params_Get_Role_By_OWNER_ID),
        JSON.stringify({ OWNER_ID: 1 }),
        options
      )
      .pipe(
        map((response) => {
          this.common.Handle_Exception(response.ExceptionMsg);
          return response.My_Result;
        })
      );
  }
  Get_Country_By_OWNER_ID(
    i_Params_Get_Country_By_OWNER_ID: Params_Get_Country_By_OWNER_ID
  ): Observable<Country[]> {
    this.url =
      this.APIBaseUrl + '/Get_Country_By_OWNER_ID?Ticket=' + this.common.ticket;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      ticket: this.common.ticket,
    });
    const options = { headers: headers };
    return this.api
      .post<Result_Get_Country_By_OWNER_ID>(
        this.url,
        JSON.stringify(i_Params_Get_Country_By_OWNER_ID),
        options
      )
      .pipe(
        map((response) => {
          this.common.Handle_Exception(response.ExceptionMsg);
          return response.My_Result;
        })
      );
  }
  Get_Specialty_By_OWNER_ID(
    i_Params_Get_Specialty_By_OWNER_ID: Params_Get_Specialty_By_OWNER_ID
  ): Observable<Specialty[]> {
    this.url =
      this.APIBaseUrl +
      '/Get_Specialty_By_OWNER_ID?Ticket=' +
      this.common.ticket;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      ticket: this.common.ticket,
    });
    const options = { headers: headers };
    return this.api
      .post<Result_Get_Specialty_By_OWNER_ID>(
        this.url,
        JSON.stringify(i_Params_Get_Specialty_By_OWNER_ID),
        options
      )
      .pipe(
        map((response) => {
          this.common.Handle_Exception(response.ExceptionMsg);
          return response.My_Result;
        })
      );
  }
  Edit_Role(i_Role: Role): Observable<Role> {
    this.url = this.APIBaseUrl + '/Edit_Role?Ticket=' + this.common.ticket;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      ticket: this.common.ticket,
    });
    const options = { headers: headers };
    return this.api
      .post<Result_Edit_Role>(this.url, JSON.stringify(i_Role), options)
      .pipe(
        map((response) => {
          this.common.Handle_Exception(response.ExceptionMsg);
          return response.My_Role;
        })
      );
  }
  Edit_User(i_User: User): Observable<User> {
    this.url = this.APIBaseUrl + '/Edit_User?Ticket=' + this.common.ticket;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      ticket: this.common.ticket,
    });
    const options = { headers: headers };
    return this.api
      .post<Result_Edit_User>(this.url, JSON.stringify(i_User), options)
      .pipe(
        map((response) => {
          this.common.Handle_Exception(response.ExceptionMsg);
          return response.My_User;
        })
      );
  }
  Edit_Specialty(i_Specialty: Specialty): Observable<Specialty> {
    this.url = this.APIBaseUrl + '/Edit_Specialty?Ticket=' + this.common.ticket;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      ticket: this.common.ticket,
    });
    const options = { headers: headers };
    return this.api
      .post<Result_Edit_Specialty>(
        this.url,
        JSON.stringify(i_Specialty),
        options
      )
      .pipe(
        map((response) => {
          this.common.Handle_Exception(response.ExceptionMsg);
          return response.My_Specialty;
        })
      );
  }
  Edit_Sessions_bundle(
    i_Sessions_bundle: Sessions_bundle
  ): Observable<Sessions_bundle> {
    this.url =
      this.APIBaseUrl + '/Edit_Sessions_bundle?Ticket=' + this.common.ticket;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      ticket: this.common.ticket,
    });
    const options = { headers: headers };
    return this.api
      .post<Result_Edit_Sessions_bundle>(
        this.url,
        JSON.stringify(i_Sessions_bundle),
        options
      )
      .pipe(
        map((response) => {
          this.common.Handle_Exception(response.ExceptionMsg);
          return response.My_Sessions_bundle;
        })
      );
  }
  Edit_Sessions_bundle_session(
    i_Sessions_bundle_session: Sessions_bundle_session
  ): Observable<Sessions_bundle_session> {
    this.url =
      this.APIBaseUrl +
      '/Edit_Sessions_bundle_session?Ticket=' +
      this.common.ticket;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      ticket: this.common.ticket,
    });
    const options = { headers: headers };
    return this.api
      .post<Result_Edit_Sessions_bundle_session>(
        this.url,
        JSON.stringify(i_Sessions_bundle_session),
        options
      )
      .pipe(
        map((response) => {
          this.common.Handle_Exception(response.ExceptionMsg);
          return response.My_Sessions_bundle_session;
        })
      );
  }
  Edit_Trainer_specialty(
    i_Trainer_specialty: Trainer_specialty
  ): Observable<Trainer_specialty> {
    this.url =
      this.APIBaseUrl + '/Edit_Trainer_specialty?Ticket=' + this.common.ticket;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      ticket: this.common.ticket,
    });
    const options = { headers: headers };
    return this.api
      .post<Result_Edit_Trainer_specialty>(
        this.url,
        JSON.stringify(i_Trainer_specialty),
        options
      )
      .pipe(
        map((response) => {
          this.common.Handle_Exception(response.ExceptionMsg);
          return response.My_Trainer_specialty;
        })
      );
  }
  Get_Trainer_specialty_By_USER_ID(
    i_Params_Get_Trainer_specialty_By_USER_ID: Params_Get_Trainer_specialty_By_USER_ID
  ): Observable<Trainer_specialty[]> {
    this.url =
      this.APIBaseUrl +
      '/Get_Trainer_specialty_By_USER_ID?Ticket=' +
      this.common.ticket;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      ticket: this.common.ticket,
    });
    const options = { headers: headers };
    return this.api
      .post<Result_Get_Trainer_specialty_By_USER_ID>(
        this.url,
        JSON.stringify(i_Params_Get_Trainer_specialty_By_USER_ID),
        options
      )
      .pipe(
        map((response) => {
          this.common.Handle_Exception(response.ExceptionMsg);
          return response.My_Result;
        })
      );
  }
  Get_Sessions_bundle_By_SESSIONS_BUNDLE_ID(
    i_Params_Get_Sessions_bundle_By_SESSIONS_BUNDLE_ID: Params_Get_Sessions_bundle_By_SESSIONS_BUNDLE_ID
  ): Observable<Sessions_bundle> {
    this.url =
      this.APIBaseUrl +
      '/Get_Sessions_bundle_By_SESSIONS_BUNDLE_ID?Ticket=' +
      this.common.ticket;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      ticket: this.common.ticket,
    });
    const options = { headers: headers };
    return this.api
      .post<Result_Get_Sessions_bundle_By_SESSIONS_BUNDLE_ID>(
        this.url,
        JSON.stringify(i_Params_Get_Sessions_bundle_By_SESSIONS_BUNDLE_ID),
        options
      )
      .pipe(
        map((response) => {
          this.common.Handle_Exception(response.ExceptionMsg);
          return response.My_Result;
        })
      );
  }
  Get_Sessions_bundle_By_CLIENT_ID(
    i_Params_Get_Sessions_bundle_By_CLIENT_ID: Params_Get_Sessions_bundle_By_CLIENT_ID
  ): Observable<Sessions_bundle[]> {
    this.url =
      this.APIBaseUrl +
      '/Get_Sessions_bundle_By_CLIENT_ID?Ticket=' +
      this.common.ticket;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      ticket: this.common.ticket,
    });
    const options = { headers: headers };
    return this.api
      .post<Result_Get_Sessions_bundle_By_CLIENT_ID>(
        this.url,
        JSON.stringify(i_Params_Get_Sessions_bundle_By_CLIENT_ID),
        options
      )
      .pipe(
        map((response) => {
          this.common.Handle_Exception(response.ExceptionMsg);
          return response.My_Result;
        })
      );
  }
  Get_Sessions_bundle_By_TRAINER_ID(
    i_Params_Get_Sessions_bundle_By_TRAINER_ID: Params_Get_Sessions_bundle_By_TRAINER_ID
  ): Observable<Sessions_bundle[]> {
    this.url =
      this.APIBaseUrl +
      '/Get_Sessions_bundle_By_TRAINER_ID?Ticket=' +
      this.common.ticket;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      ticket: this.common.ticket,
    });
    const options = { headers: headers };
    return this.api
      .post<Result_Get_Sessions_bundle_By_TRAINER_ID>(
        this.url,
        JSON.stringify(i_Params_Get_Sessions_bundle_By_TRAINER_ID),
        options
      )
      .pipe(
        map((response) => {
          this.common.Handle_Exception(response.ExceptionMsg);
          return response.My_Result;
        })
      );
  }
  Get_Sessions_bundle_By_SESSIONS_BUNDLE_ID_Adv(
    i_Params_Get_Sessions_bundle_By_SESSIONS_BUNDLE_ID: Params_Get_Sessions_bundle_By_SESSIONS_BUNDLE_ID
  ): Observable<Sessions_bundle> {
    this.url =
      this.APIBaseUrl +
      '/Get_Sessions_bundle_By_SESSIONS_BUNDLE_ID_Adv?Ticket=' +
      this.common.ticket;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      ticket: this.common.ticket,
    });
    const options = { headers: headers };
    return this.api
      .post<Result_Get_Sessions_bundle_By_SESSIONS_BUNDLE_ID_Adv>(
        this.url,
        JSON.stringify(i_Params_Get_Sessions_bundle_By_SESSIONS_BUNDLE_ID),
        options
      )
      .pipe(
        map((response) => {
          this.common.Handle_Exception(response.ExceptionMsg);
          return response.My_Result;
        })
      );
  }
  Authenticate(
    i_Params_Authenticate: Params_Authenticate
  ): Observable<UserInfo> {
    this.url = this.APIBaseUrl + '/Authenticate?Ticket=' + this.common.ticket;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      ticket: this.common.ticket,
    });
    const options = { headers: headers };
    return this.api
      .post<Result_Authenticate>(
        this.url,
        JSON.stringify(i_Params_Authenticate),
        options
      )
      .pipe(
        map((response) => {
          this.common.Handle_Exception(response.ExceptionMsg);
          return response.My_Result;
        })
      );
  }
  Authenticate_Guest(
    i_Params_Authenticate_Guest: Params_Authenticate_Guest
  ): Observable<oAuthenticate_Guest> {
    this.url =
      this.APIBaseUrl + '/Authenticate_Guest?Ticket=' + this.common.ticket;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      ticket: this.common.ticket,
    });
    const options = { headers: headers };
    return this.api
      .post<Result_Authenticate_Guest>(
        this.url,
        JSON.stringify(i_Params_Authenticate_Guest),
        options
      )
      .pipe(
        map((response) => {
          this.common.Handle_Exception(response.ExceptionMsg);
          return response.My_Result;
        })
      );
  }
}
export interface Params_Get_User_By_USER_ID {
  USER_ID?: number;
}
export interface User {
  USER_ID?: number;
  OWNER_ID?: number;
  USERNAME: string;
  PASSWORD: string;
  EMAIL: string;
  USER_TYPE_CODE: string;
  IS_ACTIVE?: boolean;
  ENTRY_DATE: string;
  ROLE_ID?: number;
  IS_GUEST?: boolean;
  My_Role: Role;
}
export interface Role {
  Role_Id?: number;
  VALUE: string;
  ENTRY_USER_ID?: number;
  OWNER_ID?: number;
  ENTRY_DATE: string;
}
export interface Params_UPC_VALIDATE_VALIDATION_CODE {
  USER_ID?: number;
  VALIDATION_CODE: string;
}
export interface oUPC_VALIDATE_VALIDATION_CODE {
  VERIFICATION_CODE_ID?: number;
  USER_ID?: number;
  VERIFICATION_CODE: string;
  ENTRY_USER_ID?: number;
  OWNER_ID?: number;
  ENTRY_DATE: string;
}
export interface Params_Add_Guest_Client {
  TRAINER_ID: number;
  CLIENT_USER_NAME: string;
}
export interface Guest_password {
  GUEST_PASSWORD_ID?: number;
  TRAINER_ID?: number;
  GUEST_ID?: number;
  GENERATED_PASSWORD: string;
  ENTRY_USER_ID?: number;
  ENTRY_DATE: string;
  OWNER_ID?: number;
  My_Trainer: User;
  My_Guest: User;
}
export interface Params_Get_Gender_By_OWNER_ID {
  OWNER_ID?: number;
}
export interface Gender {
  GENDER_ID?: number;
  VALUE: string;
  ENTRY_USER_ID?: number;
  OWNER_ID?: number;
  ENTRY_DATE: string;
}
export interface Params_Get_Role_By_OWNER_ID {
  OWNER_ID?: number;
}
export interface Params_Get_Country_By_OWNER_ID {
  OWNER_ID?: number;
}
export interface Country {
  COUNTRY_ID?: number;
  NAME: string;
  PHONE_EXT: string;
  ENTRY_USER_ID?: number;
  OWNER_ID?: number;
  ENTRY_DATE: string;
}
export interface Params_Get_Specialty_By_OWNER_ID {
  OWNER_ID?: number;
}
export interface Specialty {
  SPECIALTY_ID?: number;
  VALUE: string;
  IS_PREDEFINED?: boolean;
  ENTRY_USER_ID?: number;
  OWNER_ID?: number;
  ENTRY_DATE: string;
}
export interface Sessions_bundle {
  SESSIONS_BUNDLE_ID?: number;
  TRAINER_ID?: number;
  CLIENT_ID?: number;
  SESSIONS_NUMBER?: number;
  TOTAL_PRICE: number;
  CURRENCY_ID?: number;
  ENTRY_USER_ID?: number;
  OWNER_ID?: number;
  ENTRY_DATE: string;
  DESCRIPTION: string;
  My_Trainer: User;
  My_Client: User;
  My_Currency: Currency;
}
export interface Sessions_bundle_session {
  SESSIONS_BUNDLE_SESSION_ID?: number;
  SESSIONS_BUNDLE_ID?: number;
  SESSION_NUMBER?: number;
  START_DATE_TIME1: string;
  END_DATE_TIME: string;
  PRICE: number;
  ENTRY_USER_ID?: number;
  DONE?: boolean;
  ENTRY_DATE: string;
  OWNER_ID?: number;
  DESCRIPTION: string;
  My_Sessions_bundle: Sessions_bundle;
}
export interface Trainer_specialty {
  TRAINER_SPECIALTY_ID?: number;
  USER_ID?: number;
  SPECIALTY_ID?: number;
  ENTRY_USER_ID?: number;
  OWNER_ID?: number;
  ENTRY_DATE: string;
  DESCRIPTION: string;
  My_User: User;
  My_Specialty: Specialty;
}
export interface Params_Get_Trainer_specialty_By_USER_ID {
  USER_ID?: number;
}
export interface Params_Get_Sessions_bundle_By_SESSIONS_BUNDLE_ID {
  SESSIONS_BUNDLE_ID?: number;
}
export interface Params_Get_Sessions_bundle_By_CLIENT_ID {
  CLIENT_ID?: number;
}
export interface Params_Get_Sessions_bundle_By_TRAINER_ID {
  TRAINER_ID?: number;
}
export interface Params_Authenticate {
  USER_NAME: string;
  PASSWORD: string;
}
export interface UserInfo {
  UserID?: number;
  RoleID?: number;
  UserName: string;
  Email: string;
  Password: string;
  IsAuthenticated: boolean;
  Language: number;
  OwnerID?: number;
  Ticket: string;
  USER_TYPE_CODE: string;
}
export interface Params_Authenticate_Guest {
  GUEST_ID: number;
  GUEST_PASSWORD: string;
}
export interface oAuthenticate_Guest {
  GUEST_ID: number;
  TRAINER_ID: number;
}
export interface Currency {
  CURRENCY_ID?: number;
  SYMBOL: string;
  FULL_NAME: string;
  ENTRY_USER_ID?: number;
  ENTRY_DATE: string;
  OWNER_ID?: number;
}
export interface Action_Result {
  ExceptionMsg: string;
}
export interface Result_Get_User_By_USER_ID_Adv extends Action_Result {
  My_Result: User;
  My_Params_Get_User_By_USER_ID: Params_Get_User_By_USER_ID;
}
export interface Result_UPC_VALIDATE_VALIDATION_CODE extends Action_Result {
  My_Result: oUPC_VALIDATE_VALIDATION_CODE;
  My_Params_UPC_VALIDATE_VALIDATION_CODE: Params_UPC_VALIDATE_VALIDATION_CODE;
}
export interface Result_Add_Guest_Client extends Action_Result {
  My_Result: Guest_password;
  My_Params_Add_Guest_Client: Params_Add_Guest_Client;
}
export interface Result_Get_Gender_By_OWNER_ID extends Action_Result {
  My_Result: Gender[];
  My_Params_Get_Gender_By_OWNER_ID: Params_Get_Gender_By_OWNER_ID;
}
export interface Result_Get_Role_By_OWNER_ID extends Action_Result {
  My_Result: Role[];
  My_Params_Get_Role_By_OWNER_ID: Params_Get_Role_By_OWNER_ID;
}
export interface Result_Get_Country_By_OWNER_ID extends Action_Result {
  My_Result: Country[];
  My_Params_Get_Country_By_OWNER_ID: Params_Get_Country_By_OWNER_ID;
}
export interface Result_Get_Specialty_By_OWNER_ID extends Action_Result {
  My_Result: Specialty[];
  My_Params_Get_Specialty_By_OWNER_ID: Params_Get_Specialty_By_OWNER_ID;
}
export interface Result_Edit_Role extends Action_Result {
  My_Role: Role;
}
export interface Result_Edit_User extends Action_Result {
  My_User: User;
}
export interface Result_Edit_Specialty extends Action_Result {
  My_Specialty: Specialty;
}
export interface Result_Edit_Sessions_bundle extends Action_Result {
  My_Sessions_bundle: Sessions_bundle;
}
export interface Result_Edit_Sessions_bundle_session extends Action_Result {
  My_Sessions_bundle_session: Sessions_bundle_session;
}
export interface Result_Edit_Trainer_specialty extends Action_Result {
  My_Trainer_specialty: Trainer_specialty;
}
export interface Result_Get_Trainer_specialty_By_USER_ID extends Action_Result {
  My_Result: Trainer_specialty[];
  My_Params_Get_Trainer_specialty_By_USER_ID: Params_Get_Trainer_specialty_By_USER_ID;
}
export interface Result_Get_Sessions_bundle_By_SESSIONS_BUNDLE_ID
  extends Action_Result {
  My_Result: Sessions_bundle;
  My_Params_Get_Sessions_bundle_By_SESSIONS_BUNDLE_ID: Params_Get_Sessions_bundle_By_SESSIONS_BUNDLE_ID;
}
export interface Result_Get_Sessions_bundle_By_CLIENT_ID extends Action_Result {
  My_Result: Sessions_bundle[];
  My_Params_Get_Sessions_bundle_By_CLIENT_ID: Params_Get_Sessions_bundle_By_CLIENT_ID;
}
export interface Result_Get_Sessions_bundle_By_TRAINER_ID
  extends Action_Result {
  My_Result: Sessions_bundle[];
  My_Params_Get_Sessions_bundle_By_TRAINER_ID: Params_Get_Sessions_bundle_By_TRAINER_ID;
}
export interface Result_Get_Sessions_bundle_By_SESSIONS_BUNDLE_ID_Adv
  extends Action_Result {
  My_Result: Sessions_bundle;
  My_Params_Get_Sessions_bundle_By_SESSIONS_BUNDLE_ID: Params_Get_Sessions_bundle_By_SESSIONS_BUNDLE_ID;
}
export interface Result_Authenticate extends Action_Result {
  My_Result: UserInfo;
  My_Params_Authenticate: Params_Authenticate;
}
export interface Result_Authenticate_Guest extends Action_Result {
  My_Result: oAuthenticate_Guest;
  My_Params_Authenticate_Guest: Params_Authenticate_Guest;
}
