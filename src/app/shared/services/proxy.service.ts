import { HttpClient } from '@angular/common/http';
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
    this.url = this.APIBaseUrl + '/Get_User_By_USER_ID_Adv';

    return this.api
      .post<Result_Get_User_By_USER_ID_Adv>(
        this.url,
        JSON.stringify(i_Params_Get_User_By_USER_ID)
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
      this.APIBaseUrl + '/UPC_VALIDATE_VALIDATION_CODE?' + this.common.ticket;

    return this.api
      .post<Result_UPC_VALIDATE_VALIDATION_CODE>(
        this.url,
        JSON.stringify(i_Params_UPC_VALIDATE_VALIDATION_CODE)
      )
      .pipe(
        map((response) => {
          this.common.Handle_Exception(response.ExceptionMsg);
          return response.My_Result;
        })
      );
  }
  GetBundlesAndClientsByTrainerId(
    i_Params_GetBundlesAndClientsByTrainerId: Params_GetBundlesAndClientsByTrainerId
  ): Observable<GetBundlesAndClientsByTrainerId_Response> {
    this.url =
      this.APIBaseUrl +
      '/GetBundlesAndClientsByTrainerId?' +
      this.common.ticket;

    return this.api
      .post<Result_GetBundlesAndClientsByTrainerId>(
        this.url,
        JSON.stringify(i_Params_GetBundlesAndClientsByTrainerId)
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
    this.url = this.APIBaseUrl + '/Add_Guest_Client';

    return this.api
      .post<Result_Add_Guest_Client>(
        this.url,
        JSON.stringify(i_Params_Add_Guest_Client)
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
    this.url = this.APIBaseUrl + '/Get_Gender_By_OWNER_ID';

    return this.api
      .post<Result_Get_Gender_By_OWNER_ID>(
        this.url,
        JSON.stringify(i_Params_Get_Gender_By_OWNER_ID)
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
    this.url = this.APIBaseUrl + '/Get_Role_By_OWNER_ID';

    return this.api
      .post<Result_Get_Role_By_OWNER_ID>(
        this.url,
        // JSON.stringify(i_Params_Get_Role_By_OWNER_ID),
        JSON.stringify({ OWNER_ID: 1 })
      )
      .pipe(
        map((response) => {
          this.common.Handle_Exception(response.ExceptionMsg);
          return response.My_Result;
        })
      );
  }
  Get_Country_By_OWNER_ID(): Observable<Country[]> {
    this.url = this.APIBaseUrl + '/Get_Country_By_OWNER_ID';

    return this.api
      .post<Result_Get_Country_By_OWNER_ID>(
        this.url,
        JSON.stringify({ OWNER_ID: this.ownerId })
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
      this.APIBaseUrl + '/Get_Specialty_By_OWNER_ID?' + this.common.ticket;

    return this.api
      .post<Result_Get_Specialty_By_OWNER_ID>(
        this.url,
        JSON.stringify(i_Params_Get_Specialty_By_OWNER_ID)
      )
      .pipe(
        map((response) => {
          this.common.Handle_Exception(response.ExceptionMsg);
          return response.My_Result;
        })
      );
  }
  Edit_Role(i_Role: Role): Observable<Role> {
    this.url = this.APIBaseUrl + '/Edit_Role';

    return this.api
      .post<Result_Edit_Role>(this.url, JSON.stringify(i_Role))
      .pipe(
        map((response) => {
          this.common.Handle_Exception(response.ExceptionMsg);
          return response.My_Role;
        })
      );
  }
  Edit_User(i_User: User): Observable<User> {
    this.url = this.APIBaseUrl + '/Edit_User';

    return this.api
      .post<Result_Edit_User>(this.url, JSON.stringify(i_User))
      .pipe(
        map((response) => {
          this.common.Handle_Exception(response.ExceptionMsg);
          return response.My_User;
        })
      );
  }
  Edit_Person(i_Person: Person): Observable<Person> {
    this.url = this.APIBaseUrl + '/Edit_Person';

    return this.api
      .post<Result_Edit_Person>(this.url, JSON.stringify(i_Person))
      .pipe(
        map((response) => {
          this.common.Handle_Exception(response.ExceptionMsg);
          return response.My_Person;
        })
      );
  }
  Edit_Specialty(i_Specialty: Specialty): Observable<Specialty> {
    this.url = this.APIBaseUrl + '/Edit_Specialty';

    return this.api
      .post<Result_Edit_Specialty>(this.url, JSON.stringify(i_Specialty))
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
    this.url = this.APIBaseUrl + '/Edit_Sessions_bundle';

    return this.api
      .post<Result_Edit_Sessions_bundle>(
        this.url,
        JSON.stringify(i_Sessions_bundle)
      )
      .pipe(
        map((response) => {
          this.common.Handle_Exception(response.ExceptionMsg);
          return response.My_Sessions_bundle;
        })
      );
  }
  Edit_Sessions_bundle_session(
    event: any
    // i_Sessions_bundle_session: Sessions_bundle_session
  ): Observable<Sessions_bundle_session> {
    this.url =
      this.APIBaseUrl + '/Edit_Sessions_bundle_session?' + this.common.ticket;

    return this.api
      .post<Result_Edit_Sessions_bundle_session>(
        this.url,
        // JSON.stringify(i_Sessions_bundle_session),
        JSON.stringify(event)
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
    this.url = this.APIBaseUrl + '/Edit_Trainer_specialty';

    return this.api
      .post<Result_Edit_Trainer_specialty>(
        this.url,
        JSON.stringify(i_Trainer_specialty)
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
      '/Get_Trainer_specialty_By_USER_ID?' +
      this.common.ticket;

    return this.api
      .post<Result_Get_Trainer_specialty_By_USER_ID>(
        this.url,
        JSON.stringify(i_Params_Get_Trainer_specialty_By_USER_ID)
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
      '/Get_Sessions_bundle_By_SESSIONS_BUNDLE_ID?' +
      this.common.ticket;

    return this.api
      .post<Result_Get_Sessions_bundle_By_SESSIONS_BUNDLE_ID>(
        this.url,
        JSON.stringify(i_Params_Get_Sessions_bundle_By_SESSIONS_BUNDLE_ID)
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
      '/Get_Sessions_bundle_By_CLIENT_ID?' +
      this.common.ticket;

    return this.api
      .post<Result_Get_Sessions_bundle_By_CLIENT_ID>(
        this.url,
        JSON.stringify(i_Params_Get_Sessions_bundle_By_CLIENT_ID)
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
      '/Get_Sessions_bundle_By_TRAINER_ID?' +
      this.common.ticket;

    return this.api
      .post<Result_Get_Sessions_bundle_By_TRAINER_ID>(
        this.url,
        JSON.stringify(i_Params_Get_Sessions_bundle_By_TRAINER_ID)
      )
      .pipe(
        map((response) => {
          this.common.Handle_Exception(response.ExceptionMsg);
          return response.My_Result;
        })
      );
  }
  Get_Sessions_bundle_By_CLIENT_ID_Adv(
    i_Params_Get_Sessions_bundle_By_CLIENT_ID: Params_Get_Sessions_bundle_By_CLIENT_ID
  ): Observable<Sessions_bundle[]> {
    this.url =
      this.APIBaseUrl +
      '/Get_Sessions_bundle_By_CLIENT_ID_Adv?' +
      this.common.ticket;

    return this.api
      .post<Result_Get_Sessions_bundle_By_CLIENT_ID_Adv>(
        this.url,
        JSON.stringify(i_Params_Get_Sessions_bundle_By_CLIENT_ID)
      )
      .pipe(
        map((response) => {
          this.common.Handle_Exception(response.ExceptionMsg);
          return response.My_Result;
        })
      );
  }
  Get_Sessions_bundle_By_TRAINER_ID_Adv(
    i_Params_Get_Sessions_bundle_By_TRAINER_ID: Params_Get_Sessions_bundle_By_TRAINER_ID
  ): Observable<Sessions_bundle[]> {
    this.url =
      this.APIBaseUrl +
      '/Get_Sessions_bundle_By_TRAINER_ID_Adv?' +
      this.common.ticket;

    return this.api
      .post<Result_Get_Sessions_bundle_By_TRAINER_ID_Adv>(
        this.url,
        JSON.stringify(i_Params_Get_Sessions_bundle_By_TRAINER_ID)
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
      '/Get_Sessions_bundle_By_SESSIONS_BUNDLE_ID_Adv?' +
      this.common.ticket;

    return this.api
      .post<Result_Get_Sessions_bundle_By_SESSIONS_BUNDLE_ID_Adv>(
        this.url,
        JSON.stringify(i_Params_Get_Sessions_bundle_By_SESSIONS_BUNDLE_ID)
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
    this.url = this.APIBaseUrl + '/Authenticate?';

    return this.api
      .post<Result_Authenticate>(
        this.url,
        JSON.stringify(i_Params_Authenticate)
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
    this.url = this.APIBaseUrl + '/Authenticate_Guest';

    return this.api
      .post<Result_Authenticate_Guest>(
        this.url,
        JSON.stringify(i_Params_Authenticate_Guest)
      )
      .pipe(
        map((response) => {
          this.common.Handle_Exception(response.ExceptionMsg);
          return response.My_Result;
        })
      );
  }
  GetClientsByTrainerId(
    i_Params_GetClientsByTrainerId: Params_GetClientsByTrainerId
  ): Observable<oGetClientsByTrainerId> {
    this.url = this.APIBaseUrl + '/GetClientsByTrainerId';

    return this.api
      .post<Result_GetClientsByTrainerId>(
        this.url,
        JSON.stringify(i_Params_GetClientsByTrainerId)
      )
      .pipe(
        map((response) => {
          this.common.Handle_Exception(response.ExceptionMsg);
          return response.My_Result;
        })
      );
  }
  Get_Person_By_USER_ID_Adv(
    i_Params_Get_Person_By_USER_ID: Params_Get_Person_By_USER_ID
  ): Observable<Person[]> {
    this.url =
      this.APIBaseUrl + '/Get_Person_By_USER_ID_Adv?' + this.common.ticket;

    return this.api
      .post<Result_Get_Person_By_USER_ID_Adv>(
        this.url,
        JSON.stringify(i_Params_Get_Person_By_USER_ID)
      )
      .pipe(
        map((response) => {
          this.common.Handle_Exception(response.ExceptionMsg);
          return response.My_Result;
        })
      );
  }
  Get_Trainer_certification_By_USER_ID_Adv(
    i_Params_Get_Trainer_certification_By_USER_ID: Params_Get_Trainer_certification_By_USER_ID
  ): Observable<Trainer_certification[]> {
    this.url =
      this.APIBaseUrl +
      '/Get_Trainer_certification_By_USER_ID_Adv?' +
      this.common.ticket;

    return this.api
      .post<Result_Get_Trainer_certification_By_USER_ID_Adv>(
        this.url,
        JSON.stringify(i_Params_Get_Trainer_certification_By_USER_ID)
      )
      .pipe(
        map((response) => {
          this.common.Handle_Exception(response.ExceptionMsg);
          return response.My_Result;
        })
      );
  }
  Edit_Trainer_certification(
    i_Trainer_certification: Trainer_certification
  ): Observable<Trainer_certification> {
    this.url =
      this.APIBaseUrl + '/Edit_Trainer_certification?' + this.common.ticket;

    return this.api
      .post<Result_Edit_Trainer_certification>(
        this.url,
        JSON.stringify(i_Trainer_certification)
      )
      .pipe(
        map((response) => {
          this.common.Handle_Exception(response.ExceptionMsg);
          return response.My_Trainer_certification;
        })
      );
  }
  GetOptionsByOptionType(
    i_Params_GetOptionsByOptionType: Params_GetOptionsByOptionType
  ): Observable<GetOptionsByOptionTypeResponse> {
    this.url = this.APIBaseUrl + '/GetOptionsByOptionType';

    return this.api
      .post<Result_GetOptionsByOptionType>(
        this.url,
        JSON.stringify(i_Params_GetOptionsByOptionType)
      )
      .pipe(
        map((response) => {
          this.common.Handle_Exception(response.ExceptionMsg);
          return response.My_Result;
        })
      );
  }
  Get_Guest_password_By_TRAINER_ID_Adv(
    i_Params_Get_Guest_password_By_TRAINER_ID: Params_Get_Guest_password_By_TRAINER_ID
  ): Observable<Guest_password[]> {
    this.url =
      this.APIBaseUrl +
      '/Get_Guest_password_By_TRAINER_ID_Adv?' +
      this.common.ticket;

    return this.api
      .post<Result_Get_Guest_password_By_TRAINER_ID_Adv>(
        this.url,
        JSON.stringify(i_Params_Get_Guest_password_By_TRAINER_ID)
      )
      .pipe(
        map((response) => {
          this.common.Handle_Exception(response.ExceptionMsg);
          return response.My_Result;
        })
      );
  }
  Edit_Trainers_clients(
    i_Trainers_clients: Trainers_clients
  ): Observable<Trainers_clients> {
    this.url = this.APIBaseUrl + '/Edit_Trainers_clients';

    return this.api
      .post<Result_Edit_Trainers_clients>(
        this.url,
        JSON.stringify(i_Trainers_clients)
      )
      .pipe(
        map((response) => {
          this.common.Handle_Exception(response.ExceptionMsg);
          return response.My_Trainers_clients;
        })
      );
  }
  AcceptTrainersClientsRequest(
    i_Params_AcceptTrainersClientsRequest: Params_AcceptTrainersClientsRequest
  ): Observable<Trainers_clients> {
    this.url =
      this.APIBaseUrl + '/AcceptTrainersClientsRequest?' + this.common.ticket;

    return this.api
      .post<Result_AcceptTrainersClientsRequest>(
        this.url,
        JSON.stringify(i_Params_AcceptTrainersClientsRequest)
      )
      .pipe(
        map((response) => {
          this.common.Handle_Exception(response.ExceptionMsg);
          return response.My_Result;
        })
      );
  }
  Edit_Uploaded_file(
    i_Uploaded_file: Uploaded_file
  ): Observable<Uploaded_file> {
    this.url = this.APIBaseUrl + '/Edit_Uploaded_file';

    return this.api
      .post<Result_Edit_Uploaded_file>(
        this.url,
        JSON.stringify(i_Uploaded_file)
      )
      .pipe(
        map((response) => {
          this.common.Handle_Exception(response.ExceptionMsg);
          return response.My_Uploaded_file;
        })
      );
  }
  Delete_Uploaded_file(
    i_Params_Delete_Uploaded_file: Params_Delete_Uploaded_file
  ): Observable<string> {
    this.url = this.APIBaseUrl + '/Delete_Uploaded_file';

    return this.api
      .post<any>(this.url, JSON.stringify(i_Params_Delete_Uploaded_file))
      .pipe(
        map((response) => {
          this.common.Handle_Exception(response.ExceptionMsg);
          return response.ExceptionMsg;
        })
      );
  }
  Delete_Uploaded_file_By_REL_ENTITY_REL_KEY_REL_FIELD(
    i_Params_Delete_Uploaded_file_By_REL_ENTITY_REL_KEY_REL_FIELD: Params_Delete_Uploaded_file_By_REL_ENTITY_REL_KEY_REL_FIELD
  ): Observable<string> {
    this.url =
      this.APIBaseUrl +
      '/Delete_Uploaded_file_By_REL_ENTITY_REL_KEY_REL_FIELD?' +
      this.common.ticket;

    return this.api
      .post<any>(
        this.url,
        JSON.stringify(
          i_Params_Delete_Uploaded_file_By_REL_ENTITY_REL_KEY_REL_FIELD
        )
      )
      .pipe(
        map((response) => {
          this.common.Handle_Exception(response.ExceptionMsg);
          return response.ExceptionMsg;
        })
      );
  }
  GetSessionsByTrainerId(
    i_Params_GetSessionsByTrainerId: Params_GetSessionsByTrainerId
  ): Observable<GetSessionsByTrainerId_Response> {
    this.url = this.APIBaseUrl + '/GetSessionsByTrainerId';

    return this.api
      .post<Result_GetSessionsByTrainerId>(
        this.url,
        JSON.stringify(i_Params_GetSessionsByTrainerId)
      )
      .pipe(
        map((response) => {
          this.common.Handle_Exception(response.ExceptionMsg);
          return response.My_Result;
        })
      );
  }
  Simple_Generated_Workout_Plan(
    i_Params_Simple_Generated_Workout_Plan: Params_Simple_Generated_Workout_Plan
  ): Observable<oSimple_Generated_Workout_Plan> {
    this.url =
      this.APIBaseUrl + '/Simple_Generated_Workout_Plan?' + this.common.ticket;

    return this.api
      .post<Result_Simple_Generated_Workout_Plan>(
        this.url,
        JSON.stringify(i_Params_Simple_Generated_Workout_Plan)
      )
      .pipe(
        map((response) => {
          this.common.Handle_Exception(response.ExceptionMsg);
          return response.My_Result;
        })
      );
  }

  Complicated_Generated_Workout_Plan(
    i_Params_Complicated_Generated_Workout_Plan: Params_Complicated_Generated_Workout_Plan
  ): Observable<oComplicated_Generated_Workout_Plan> {
    this.url =
      this.APIBaseUrl +
      '/Complicated_Generated_Workout_Plan?' +
      this.common.ticket;

    return this.api
      .post<Result_Complicated_Generated_Workout_Plan>(
        this.url,
        JSON.stringify(i_Params_Complicated_Generated_Workout_Plan)
      )
      .pipe(
        map((response) => {
          this.common.Handle_Exception(response.ExceptionMsg);
          return response.My_Result;
        })
      );
  }
}

export interface Params_Simple_Generated_Workout_Plan {
  BasicInformation: BasicInformation;
  FitnessGoals: FitnessGoals;
  Availability: Availability;
}

export interface oSimple_Generated_Workout_Plan {
  SimpleGeneratedWorkoutPlanResponse: string;
}
export interface Result_Simple_Generated_Workout_Plan extends Action_Result {
  My_Result: oSimple_Generated_Workout_Plan;
  My_Params_Simple_Generated_Workout_Plan: Params_Simple_Generated_Workout_Plan;
}
export interface Params_Complicated_Generated_Workout_Plan {
  BasicInformation: BasicInformation;
  MedicalHistory: MedicalHistory;
  FitnessGoals: FitnessGoals;
  CurrentFitnessLevel: CurrentFitnessLevel;
  Availability: Availability;
  PreferencesAndConstraints: PreferencesAndConstraints;
}

export interface CurrentFitnessLevel {
  CurrentRoutine: string;
  PhysicalStats: PhysicalStats;
}

export interface PhysicalStats {
  Weight: number;
  Height: number;
  BodyFatPercentage: number;
}
export interface MedicalHistory {
  Conditions: string;
  CurrentMedications: string[];
  Injuries: string[];
}
export interface PreferencesAndConstraints {
  ExercisePreferences: string[];
  AccessToGym: boolean;
  WorkoutAlone: boolean;
  Budget: number;
}
export interface BasicInformation {
  Name: string;
  Age: number;
  Gender: string;
}
export interface FitnessGoals {
  PrimaryGoal: string;
  SecondaryGoals: string[];
}
export interface Availability {
  DaysPerWeek: number;
  SessionDuration: number;
}
export interface oSimple_Generated_Workout_Plan {
  SimpleGeneratedWorkoutPlanResponse: string;
}
export interface oComplicated_Generated_Workout_Plan {
  ComplicatedGeneratedWorkoutPlanResponse: string;
}
export interface Result_Complicated_Generated_Workout_Plan
  extends Action_Result {
  My_Result: oComplicated_Generated_Workout_Plan;
  My_Params_Complicated_Generated_Workout_Plan: Params_Complicated_Generated_Workout_Plan;
}
export interface Params_GetSessionsByTrainerId {
  TRAINER_ID: number;
}
export interface GetSessionsByTrainerId_Response {
  Sessions: UPC_GET_SESSIONS_BUNDLE_SESSION_BY_TRAINER_ID[];
}
export interface UPC_GET_SESSIONS_BUNDLE_SESSION_BY_TRAINER_ID {
  SESSIONS_BUNDLE_SESSION_ID: number;
  TRAINER_ID: number;
  CLIENT_ID: number;
  SESSION_NUMBER: number;
  START_DATE_TIME1: string;
  END_DATE_TIME: string;
  PRICE: number;
  ENTRY_USER_ID: number;
  DONE: boolean;
  ENTRY_DATE: string;
  OWNER_ID: number;
  DESCRIPTION: string;
  CLIENT_FIRSTNAME: string;
  CLIENT_LASTNAME: string;
}

export interface Result_GetSessionsByTrainerId extends Action_Result {
  My_Result: GetSessionsByTrainerId_Response;
  My_Params_GetSessionsByTrainerId: Params_GetSessionsByTrainerId;
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
  ROLE_ID?: number;
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
  CLIENT_FIRST_NAME: string;
  CLIENT_LAST_NAME: string;
  PHONE_NUMBER: string;
  PHONE_EXT: string;
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
export interface Person {
  PERSON_ID?: number;
  USER_ID?: number;
  FIRST_NAME: string;
  LAST_NAME: string;
  BRIEF_BIO: string;
  LONGITUDE: string;
  LATITUDE: string;
  GENDER_ID?: number;
  COUNTRY_ID?: number;
  PHONE_EXTENSION: string;
  PHONE_NUMBER: string;
  INSTA_LINK: string;
  FB_LINK: string;
  TWITTER_LINK: string;
  LINKEDIN_LINK: string;
  ENTRY_USER_ID?: number;
  OWNER_ID?: number;
  ENTRY_DATE: string;
  EDUCATIONAL_BACKGROUND: string;
  My_User: User;
  My_Gender: Gender;
  My_Country: Country;
  My_Uploaded_Files: Uploaded_file[];
  My_Image_Url: string;
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
  CLIENT_FIRSTNAME: string;
  CLIENT_LASTNAME: string;
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
export interface Params_GetClientsByTrainerId {
  TRAINER_ID: number;
}
export interface oGetClientsByTrainerId {
  TRAINER_CLIENTS: UPC_GET_TRAINER_CLIENTS_BY_TRAINER_ID[];
}
export interface UPC_GET_TRAINER_CLIENTS_BY_TRAINER_ID {
  USER_ID: number;
  OWNER_ID: number;
  USERNAME: string;
  IS_GUEST: boolean;
  FIRST_NAME: string;
  LAST_NAME: string;
}
export interface Params_Get_Person_By_USER_ID {
  USER_ID?: number;
}
export interface Params_Get_Trainer_certification_By_USER_ID {
  USER_ID?: number;
}
export interface Trainer_certification {
  TRAINER_CERTIFICATION_ID?: number;
  USER_ID?: number;
  DESCRIPTION: string;
  ENTRY_USER_ID?: number;
  OWNER_ID?: number;
  ENTRY_DATE: string;
  My_User: User;
  My_Uploaded_Files: Uploaded_file[];
  My_Image_Url: string;
}
export interface Params_GetOptionsByOptionType {
  OPTIONTYPE: string;
}
export interface GetOptionsByOptionTypeResponse {
  OPTIONS: Option[];
}
export interface Option {
  OPTION_ID?: number;
  OPTION_TYPE: string;
  LABEL: string;
  VALUE: string;
  INFO: string;
  ENTRY_USER_ID?: number;
  ENTRY_DATE: string;
  OWNER_ID?: number;
}
export interface Params_Get_Guest_password_By_TRAINER_ID {
  TRAINER_ID?: number;
}
export interface Trainers_clients {
  TRAINERS_CLIENTS_ID?: number;
  TRAINER_ID?: number;
  CLIENT_ID?: number;
  ENTRY_USER_ID?: number;
  ENTRY_DATE: string;
  OWNER_ID?: number;
  DESCRIPTION: string;
  REQUEST_ACCEPTED?: boolean;
  My_Trainer: User;
  My_Client: User;
}
export interface Params_AcceptTrainersClientsRequest {
  TRAINERS_CLIENTS_ID: number;
}
export interface Uploaded_file {
  UPLOADED_FILE_ID?: number;
  REL_ENTITY: string;
  REL_KEY?: number;
  REL_FIELD: string;
  SIZE?: number;
  EXTENSION: string;
  STAMP: string;
  ENTRY_USER_ID?: number;
  ENTRY_DATE: string;
  OWNER_ID?: number;
  My_URL: string;
}
export interface Params_Delete_Uploaded_file {
  UPLOADED_FILE_ID?: number;
}
export interface Params_Delete_Uploaded_file_By_REL_ENTITY_REL_KEY_REL_FIELD {
  REL_ENTITY: string;
  REL_KEY?: number;
  REL_FIELD: string;
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
export interface Result_Edit_Person extends Action_Result {
  My_Person: Person;
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
export interface Result_Get_Sessions_bundle_By_CLIENT_ID_Adv
  extends Action_Result {
  My_Result: Sessions_bundle[];
  My_Params_Get_Sessions_bundle_By_CLIENT_ID: Params_Get_Sessions_bundle_By_CLIENT_ID;
}
export interface Result_Get_Sessions_bundle_By_TRAINER_ID_Adv
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
export interface Result_GetClientsByTrainerId extends Action_Result {
  My_Result: oGetClientsByTrainerId;
  My_Params_GetClientsByTrainerId: Params_GetClientsByTrainerId;
}
export interface Result_Get_Person_By_USER_ID_Adv extends Action_Result {
  My_Result: Person[];
  My_Params_Get_Person_By_USER_ID: Params_Get_Person_By_USER_ID;
}
export interface Result_Get_Trainer_certification_By_USER_ID_Adv
  extends Action_Result {
  My_Result: Trainer_certification[];
  My_Params_Get_Trainer_certification_By_USER_ID: Params_Get_Trainer_certification_By_USER_ID;
}
export interface Result_Edit_Trainer_certification extends Action_Result {
  My_Trainer_certification: Trainer_certification;
}
export interface Result_GetOptionsByOptionType extends Action_Result {
  My_Result: GetOptionsByOptionTypeResponse;
  My_Params_GetOptionsByOptionType: Params_GetOptionsByOptionType;
}
export interface Result_Get_Guest_password_By_TRAINER_ID_Adv
  extends Action_Result {
  My_Result: Guest_password[];
  My_Params_Get_Guest_password_By_TRAINER_ID: Params_Get_Guest_password_By_TRAINER_ID;
}
export interface Result_Edit_Trainers_clients extends Action_Result {
  My_Trainers_clients: Trainers_clients;
}
export interface Result_AcceptTrainersClientsRequest extends Action_Result {
  My_Result: Trainers_clients;
  My_Params_AcceptTrainersClientsRequest: Params_AcceptTrainersClientsRequest;
}
export interface Result_Edit_Uploaded_file extends Action_Result {
  My_Uploaded_file: Uploaded_file;
}
export interface Result_Delete_Uploaded_file extends Action_Result {
  My_Params_Delete_Uploaded_file: Params_Delete_Uploaded_file;
}
export interface Result_Delete_Uploaded_file_By_REL_ENTITY_REL_KEY_REL_FIELD
  extends Action_Result {
  My_Params_Delete_Uploaded_file_By_REL_ENTITY_REL_KEY_REL_FIELD: Params_Delete_Uploaded_file_By_REL_ENTITY_REL_KEY_REL_FIELD;
}

export interface Params_GetBundlesAndClientsByTrainerId {
  TRAINER_ID: number;
}

export interface GetBundlesAndClientsByTrainerId_Response {
  BundlesAndClients: UPC_GET_SESSIONS_BUNDLE_AND_CLIENTS_BY_TRAINER_ID[];
}

export interface UPC_GET_SESSIONS_BUNDLE_AND_CLIENTS_BY_TRAINER_ID {
  SESSIONS_BUNDLE_ID: number;
  TRAINER_ID: number;
  CLIENT_ID: number;
  SESSIONS_NUMBER: number;
  TOTAL_PRICE: number;
  CURRENCY_ID: number;
  ENTRY_USER_ID: number;
  OWNER_ID: number;
  ENTRY_DATE: string;
  DESCRIPTION: string;
  CLIENT_FIRSTNAME: string;
  CLIENT_LASTNAME: string;
  IS_GUEST: boolean;
}
export interface Result_GetBundlesAndClientsByTrainerId extends Action_Result {
  My_Result: GetBundlesAndClientsByTrainerId_Response;
  My_Params_GetBundlesAndClientsByTrainerId: Params_GetBundlesAndClientsByTrainerId;
}
