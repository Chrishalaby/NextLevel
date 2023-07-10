import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpEvent} from '@angular/common/http';
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators';
import { CommonService } from './common.service';
@Injectable()
export class Proxy {
APIBaseUrl = '';
url = '';
constructor(public api: HttpClient, private common: CommonService) {
this.APIBaseUrl = common.APIUrl; 
}
Get_User_By_USER_ID_Adv(i_Params_Get_User_By_USER_ID: Params_Get_User_By_USER_ID) : Observable<User> {
this.url = this.APIBaseUrl + '/Get_User_By_USER_ID_Adv?Ticket=' + this.common.ticket;
const headers = new HttpHeaders({ 'Content-Type': 'application/json','ticket': this.common.ticket });
const options = { headers: headers };
return this.api.post<Result_Get_User_By_USER_ID_Adv>(this.url, JSON.stringify(i_Params_Get_User_By_USER_ID), options)
.pipe(map(response => { this.common.Handle_Exception(response.ExceptionMsg); return response.My_Result;}));
}
UPC_VALIDATE_VALIDATION_CODE(i_Params_UPC_VALIDATE_VALIDATION_CODE: Params_UPC_VALIDATE_VALIDATION_CODE) : Observable<oUPC_VALIDATE_VALIDATION_CODE> {
this.url = this.APIBaseUrl + '/UPC_VALIDATE_VALIDATION_CODE?Ticket=' + this.common.ticket;
const headers = new HttpHeaders({ 'Content-Type': 'application/json','ticket': this.common.ticket });
const options = { headers: headers };
return this.api.post<Result_UPC_VALIDATE_VALIDATION_CODE>(this.url, JSON.stringify(i_Params_UPC_VALIDATE_VALIDATION_CODE), options)
.pipe(map(response => { this.common.Handle_Exception(response.ExceptionMsg); return response.My_Result;}));
}
Add_Guest_Client(i_Params_Add_Guest_Client: Params_Add_Guest_Client) : Observable<Guest_password> {
this.url = this.APIBaseUrl + '/Add_Guest_Client?Ticket=' + this.common.ticket;
const headers = new HttpHeaders({ 'Content-Type': 'application/json','ticket': this.common.ticket });
const options = { headers: headers };
return this.api.post<Result_Add_Guest_Client>(this.url, JSON.stringify(i_Params_Add_Guest_Client), options)
.pipe(map(response => { this.common.Handle_Exception(response.ExceptionMsg); return response.My_Result;}));
}
Get_Gender_By_OWNER_ID(i_Params_Get_Gender_By_OWNER_ID: Params_Get_Gender_By_OWNER_ID) : Observable<Gender[]> {
this.url = this.APIBaseUrl + '/Get_Gender_By_OWNER_ID?Ticket=' + this.common.ticket;
const headers = new HttpHeaders({ 'Content-Type': 'application/json','ticket': this.common.ticket });
const options = { headers: headers };
return this.api.post<Result_Get_Gender_By_OWNER_ID>(this.url, JSON.stringify(i_Params_Get_Gender_By_OWNER_ID), options)
.pipe(map(response => { this.common.Handle_Exception(response.ExceptionMsg); return response.My_Result;}));
}
Get_Role_By_OWNER_ID(i_Params_Get_Role_By_OWNER_ID: Params_Get_Role_By_OWNER_ID) : Observable<Role[]> {
this.url = this.APIBaseUrl + '/Get_Role_By_OWNER_ID?Ticket=' + this.common.ticket;
const headers = new HttpHeaders({ 'Content-Type': 'application/json','ticket': this.common.ticket });
const options = { headers: headers };
return this.api.post<Result_Get_Role_By_OWNER_ID>(this.url, JSON.stringify(i_Params_Get_Role_By_OWNER_ID), options)
.pipe(map(response => { this.common.Handle_Exception(response.ExceptionMsg); return response.My_Result;}));
}
Get_Country_By_OWNER_ID(i_Params_Get_Country_By_OWNER_ID: Params_Get_Country_By_OWNER_ID) : Observable<Country[]> {
this.url = this.APIBaseUrl + '/Get_Country_By_OWNER_ID?Ticket=' + this.common.ticket;
const headers = new HttpHeaders({ 'Content-Type': 'application/json','ticket': this.common.ticket });
const options = { headers: headers };
return this.api.post<Result_Get_Country_By_OWNER_ID>(this.url, JSON.stringify(i_Params_Get_Country_By_OWNER_ID), options)
.pipe(map(response => { this.common.Handle_Exception(response.ExceptionMsg); return response.My_Result;}));
}
Get_Specialty_By_OWNER_ID(i_Params_Get_Specialty_By_OWNER_ID: Params_Get_Specialty_By_OWNER_ID) : Observable<Specialty[]> {
this.url = this.APIBaseUrl + '/Get_Specialty_By_OWNER_ID?Ticket=' + this.common.ticket;
const headers = new HttpHeaders({ 'Content-Type': 'application/json','ticket': this.common.ticket });
const options = { headers: headers };
return this.api.post<Result_Get_Specialty_By_OWNER_ID>(this.url, JSON.stringify(i_Params_Get_Specialty_By_OWNER_ID), options)
.pipe(map(response => { this.common.Handle_Exception(response.ExceptionMsg); return response.My_Result;}));
}
Edit_Role(i_Role: Role) : Observable<Role> {
this.url = this.APIBaseUrl + '/Edit_Role?Ticket=' + this.common.ticket;
const headers = new HttpHeaders({ 'Content-Type': 'application/json','ticket': this.common.ticket });
const options = { headers: headers };
return this.api.post<Result_Edit_Role>(this.url, JSON.stringify(i_Role), options)
.pipe(map(response => { this.common.Handle_Exception(response.ExceptionMsg); return response.My_Role;}));
}
Edit_User(i_User: User) : Observable<User> {
this.url = this.APIBaseUrl + '/Edit_User?Ticket=' + this.common.ticket;
const headers = new HttpHeaders({ 'Content-Type': 'application/json','ticket': this.common.ticket });
const options = { headers: headers };
return this.api.post<Result_Edit_User>(this.url, JSON.stringify(i_User), options)
.pipe(map(response => { this.common.Handle_Exception(response.ExceptionMsg); return response.My_User;}));
}
Edit_Person(i_Person: Person) : Observable<Person> {
this.url = this.APIBaseUrl + '/Edit_Person?Ticket=' + this.common.ticket;
const headers = new HttpHeaders({ 'Content-Type': 'application/json','ticket': this.common.ticket });
const options = { headers: headers };
return this.api.post<Result_Edit_Person>(this.url, JSON.stringify(i_Person), options)
.pipe(map(response => { this.common.Handle_Exception(response.ExceptionMsg); return response.My_Person;}));
}
Edit_Specialty(i_Specialty: Specialty) : Observable<Specialty> {
this.url = this.APIBaseUrl + '/Edit_Specialty?Ticket=' + this.common.ticket;
const headers = new HttpHeaders({ 'Content-Type': 'application/json','ticket': this.common.ticket });
const options = { headers: headers };
return this.api.post<Result_Edit_Specialty>(this.url, JSON.stringify(i_Specialty), options)
.pipe(map(response => { this.common.Handle_Exception(response.ExceptionMsg); return response.My_Specialty;}));
}
Edit_Sessions_bundle(i_Sessions_bundle: Sessions_bundle) : Observable<Sessions_bundle> {
this.url = this.APIBaseUrl + '/Edit_Sessions_bundle?Ticket=' + this.common.ticket;
const headers = new HttpHeaders({ 'Content-Type': 'application/json','ticket': this.common.ticket });
const options = { headers: headers };
return this.api.post<Result_Edit_Sessions_bundle>(this.url, JSON.stringify(i_Sessions_bundle), options)
.pipe(map(response => { this.common.Handle_Exception(response.ExceptionMsg); return response.My_Sessions_bundle;}));
}
Edit_Sessions_bundle_session(i_Sessions_bundle_session: Sessions_bundle_session) : Observable<Sessions_bundle_session> {
this.url = this.APIBaseUrl + '/Edit_Sessions_bundle_session?Ticket=' + this.common.ticket;
const headers = new HttpHeaders({ 'Content-Type': 'application/json','ticket': this.common.ticket });
const options = { headers: headers };
return this.api.post<Result_Edit_Sessions_bundle_session>(this.url, JSON.stringify(i_Sessions_bundle_session), options)
.pipe(map(response => { this.common.Handle_Exception(response.ExceptionMsg); return response.My_Sessions_bundle_session;}));
}
Edit_Trainer_specialty(i_Trainer_specialty: Trainer_specialty) : Observable<Trainer_specialty> {
this.url = this.APIBaseUrl + '/Edit_Trainer_specialty?Ticket=' + this.common.ticket;
const headers = new HttpHeaders({ 'Content-Type': 'application/json','ticket': this.common.ticket });
const options = { headers: headers };
return this.api.post<Result_Edit_Trainer_specialty>(this.url, JSON.stringify(i_Trainer_specialty), options)
.pipe(map(response => { this.common.Handle_Exception(response.ExceptionMsg); return response.My_Trainer_specialty;}));
}
Get_Trainer_specialty_By_USER_ID(i_Params_Get_Trainer_specialty_By_USER_ID: Params_Get_Trainer_specialty_By_USER_ID) : Observable<Trainer_specialty[]> {
this.url = this.APIBaseUrl + '/Get_Trainer_specialty_By_USER_ID?Ticket=' + this.common.ticket;
const headers = new HttpHeaders({ 'Content-Type': 'application/json','ticket': this.common.ticket });
const options = { headers: headers };
return this.api.post<Result_Get_Trainer_specialty_By_USER_ID>(this.url, JSON.stringify(i_Params_Get_Trainer_specialty_By_USER_ID), options)
.pipe(map(response => { this.common.Handle_Exception(response.ExceptionMsg); return response.My_Result;}));
}
Get_Sessions_bundle_By_SESSIONS_BUNDLE_ID(i_Params_Get_Sessions_bundle_By_SESSIONS_BUNDLE_ID: Params_Get_Sessions_bundle_By_SESSIONS_BUNDLE_ID) : Observable<Sessions_bundle> {
this.url = this.APIBaseUrl + '/Get_Sessions_bundle_By_SESSIONS_BUNDLE_ID?Ticket=' + this.common.ticket;
const headers = new HttpHeaders({ 'Content-Type': 'application/json','ticket': this.common.ticket });
const options = { headers: headers };
return this.api.post<Result_Get_Sessions_bundle_By_SESSIONS_BUNDLE_ID>(this.url, JSON.stringify(i_Params_Get_Sessions_bundle_By_SESSIONS_BUNDLE_ID), options)
.pipe(map(response => { this.common.Handle_Exception(response.ExceptionMsg); return response.My_Result;}));
}
Get_Sessions_bundle_By_CLIENT_ID(i_Params_Get_Sessions_bundle_By_CLIENT_ID: Params_Get_Sessions_bundle_By_CLIENT_ID) : Observable<Sessions_bundle[]> {
this.url = this.APIBaseUrl + '/Get_Sessions_bundle_By_CLIENT_ID?Ticket=' + this.common.ticket;
const headers = new HttpHeaders({ 'Content-Type': 'application/json','ticket': this.common.ticket });
const options = { headers: headers };
return this.api.post<Result_Get_Sessions_bundle_By_CLIENT_ID>(this.url, JSON.stringify(i_Params_Get_Sessions_bundle_By_CLIENT_ID), options)
.pipe(map(response => { this.common.Handle_Exception(response.ExceptionMsg); return response.My_Result;}));
}
Get_Sessions_bundle_By_TRAINER_ID(i_Params_Get_Sessions_bundle_By_TRAINER_ID: Params_Get_Sessions_bundle_By_TRAINER_ID) : Observable<Sessions_bundle[]> {
this.url = this.APIBaseUrl + '/Get_Sessions_bundle_By_TRAINER_ID?Ticket=' + this.common.ticket;
const headers = new HttpHeaders({ 'Content-Type': 'application/json','ticket': this.common.ticket });
const options = { headers: headers };
return this.api.post<Result_Get_Sessions_bundle_By_TRAINER_ID>(this.url, JSON.stringify(i_Params_Get_Sessions_bundle_By_TRAINER_ID), options)
.pipe(map(response => { this.common.Handle_Exception(response.ExceptionMsg); return response.My_Result;}));
}
Get_Sessions_bundle_By_SESSIONS_BUNDLE_ID_Adv(i_Params_Get_Sessions_bundle_By_SESSIONS_BUNDLE_ID: Params_Get_Sessions_bundle_By_SESSIONS_BUNDLE_ID) : Observable<Sessions_bundle> {
this.url = this.APIBaseUrl + '/Get_Sessions_bundle_By_SESSIONS_BUNDLE_ID_Adv?Ticket=' + this.common.ticket;
const headers = new HttpHeaders({ 'Content-Type': 'application/json','ticket': this.common.ticket });
const options = { headers: headers };
return this.api.post<Result_Get_Sessions_bundle_By_SESSIONS_BUNDLE_ID_Adv>(this.url, JSON.stringify(i_Params_Get_Sessions_bundle_By_SESSIONS_BUNDLE_ID), options)
.pipe(map(response => { this.common.Handle_Exception(response.ExceptionMsg); return response.My_Result;}));
}
Authenticate(i_Params_Authenticate: Params_Authenticate) : Observable<UserInfo> {
this.url = this.APIBaseUrl + '/Authenticate?Ticket=' + this.common.ticket;
const headers = new HttpHeaders({ 'Content-Type': 'application/json','ticket': this.common.ticket });
const options = { headers: headers };
return this.api.post<Result_Authenticate>(this.url, JSON.stringify(i_Params_Authenticate), options)
.pipe(map(response => { this.common.Handle_Exception(response.ExceptionMsg); return response.My_Result;}));
}
Authenticate_Guest(i_Params_Authenticate_Guest: Params_Authenticate_Guest) : Observable<oAuthenticate_Guest> {
this.url = this.APIBaseUrl + '/Authenticate_Guest?Ticket=' + this.common.ticket;
const headers = new HttpHeaders({ 'Content-Type': 'application/json','ticket': this.common.ticket });
const options = { headers: headers };
return this.api.post<Result_Authenticate_Guest>(this.url, JSON.stringify(i_Params_Authenticate_Guest), options)
.pipe(map(response => { this.common.Handle_Exception(response.ExceptionMsg); return response.My_Result;}));
}
GetClientsByTrainerId(i_Params_GetClientsByTrainerId: Params_GetClientsByTrainerId) : Observable<oGetClientsByTrainerId> {
this.url = this.APIBaseUrl + '/GetClientsByTrainerId?Ticket=' + this.common.ticket;
const headers = new HttpHeaders({ 'Content-Type': 'application/json','ticket': this.common.ticket });
const options = { headers: headers };
return this.api.post<Result_GetClientsByTrainerId>(this.url, JSON.stringify(i_Params_GetClientsByTrainerId), options)
.pipe(map(response => { this.common.Handle_Exception(response.ExceptionMsg); return response.My_Result;}));
}
Get_Person_By_USER_ID_Adv(i_Params_Get_Person_By_USER_ID: Params_Get_Person_By_USER_ID) : Observable<Person[]> {
this.url = this.APIBaseUrl + '/Get_Person_By_USER_ID_Adv?Ticket=' + this.common.ticket;
const headers = new HttpHeaders({ 'Content-Type': 'application/json','ticket': this.common.ticket });
const options = { headers: headers };
return this.api.post<Result_Get_Person_By_USER_ID_Adv>(this.url, JSON.stringify(i_Params_Get_Person_By_USER_ID), options)
.pipe(map(response => { this.common.Handle_Exception(response.ExceptionMsg); return response.My_Result;}));
}
Get_Trainer_certification_By_USER_ID_Adv(i_Params_Get_Trainer_certification_By_USER_ID: Params_Get_Trainer_certification_By_USER_ID) : Observable<Trainer_certification[]> {
this.url = this.APIBaseUrl + '/Get_Trainer_certification_By_USER_ID_Adv?Ticket=' + this.common.ticket;
const headers = new HttpHeaders({ 'Content-Type': 'application/json','ticket': this.common.ticket });
const options = { headers: headers };
return this.api.post<Result_Get_Trainer_certification_By_USER_ID_Adv>(this.url, JSON.stringify(i_Params_Get_Trainer_certification_By_USER_ID), options)
.pipe(map(response => { this.common.Handle_Exception(response.ExceptionMsg); return response.My_Result;}));
}
Edit_Trainer_certification(i_Trainer_certification: Trainer_certification) : Observable<Trainer_certification> {
this.url = this.APIBaseUrl + '/Edit_Trainer_certification?Ticket=' + this.common.ticket;
const headers = new HttpHeaders({ 'Content-Type': 'application/json','ticket': this.common.ticket });
const options = { headers: headers };
return this.api.post<Result_Edit_Trainer_certification>(this.url, JSON.stringify(i_Trainer_certification), options)
.pipe(map(response => { this.common.Handle_Exception(response.ExceptionMsg); return response.My_Trainer_certification;}));
}
GetOptionsByOptionType(i_Params_GetOptionsByOptionType: Params_GetOptionsByOptionType) : Observable<GetOptionsByOptionTypeResponse> {
this.url = this.APIBaseUrl + '/GetOptionsByOptionType?Ticket=' + this.common.ticket;
const headers = new HttpHeaders({ 'Content-Type': 'application/json','ticket': this.common.ticket });
const options = { headers: headers };
return this.api.post<Result_GetOptionsByOptionType>(this.url, JSON.stringify(i_Params_GetOptionsByOptionType), options)
.pipe(map(response => { this.common.Handle_Exception(response.ExceptionMsg); return response.My_Result;}));
}
Edit_Uploaded_file(i_Uploaded_file: Uploaded_file) : Observable<Uploaded_file> {
this.url = this.APIBaseUrl + '/Edit_Uploaded_file?Ticket=' + this.common.ticket;
const headers = new HttpHeaders({ 'Content-Type': 'application/json','ticket': this.common.ticket });
const options = { headers: headers };
return this.api.post<Result_Edit_Uploaded_file>(this.url, JSON.stringify(i_Uploaded_file), options)
.pipe(map(response => { this.common.Handle_Exception(response.ExceptionMsg); return response.My_Uploaded_file;}));
}
Delete_Uploaded_file(i_Params_Delete_Uploaded_file: Params_Delete_Uploaded_file) : Observable<string> {
this.url = this.APIBaseUrl + '/Delete_Uploaded_file?Ticket=' + this.common.ticket;
const headers = new HttpHeaders({ 'Content-Type': 'application/json','ticket': this.common.ticket });
const options = { headers: headers };
return this.api.post<any>(this.url, JSON.stringify(i_Params_Delete_Uploaded_file), options)
.pipe(map(response => { this.common.Handle_Exception(response.ExceptionMsg);return response.ExceptionMsg;}));
}
Delete_Uploaded_file_By_REL_ENTITY_REL_KEY_REL_FIELD(i_Params_Delete_Uploaded_file_By_REL_ENTITY_REL_KEY_REL_FIELD: Params_Delete_Uploaded_file_By_REL_ENTITY_REL_KEY_REL_FIELD) : Observable<string> {
this.url = this.APIBaseUrl + '/Delete_Uploaded_file_By_REL_ENTITY_REL_KEY_REL_FIELD?Ticket=' + this.common.ticket;
const headers = new HttpHeaders({ 'Content-Type': 'application/json','ticket': this.common.ticket });
const options = { headers: headers };
return this.api.post<any>(this.url, JSON.stringify(i_Params_Delete_Uploaded_file_By_REL_ENTITY_REL_KEY_REL_FIELD), options)
.pipe(map(response => { this.common.Handle_Exception(response.ExceptionMsg);return response.ExceptionMsg;}));
}
}
export class Params_Get_User_By_USER_ID
{
USER_ID?: number;
}
export class User
{
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
export class Role
{
ROLE_ID?: number;
VALUE: string;
ENTRY_USER_ID?: number;
OWNER_ID?: number;
ENTRY_DATE: string;
}
export class Params_UPC_VALIDATE_VALIDATION_CODE
{
USER_ID?: number;
VALIDATION_CODE: string;
}
export class oUPC_VALIDATE_VALIDATION_CODE
{
VERIFICATION_CODE_ID?: number;
USER_ID?: number;
VERIFICATION_CODE: string;
ENTRY_USER_ID?: number;
OWNER_ID?: number;
ENTRY_DATE: string;
}
export class Params_Add_Guest_Client
{
TRAINER_ID: number;
CLIENT_FIRST_NAME: string;
CLIENT_LAST_NAME: string;
}
export class Guest_password
{
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
export class Params_Get_Gender_By_OWNER_ID
{
OWNER_ID?: number;
}
export class Gender
{
GENDER_ID?: number;
VALUE: string;
ENTRY_USER_ID?: number;
OWNER_ID?: number;
ENTRY_DATE: string;
}
export class Params_Get_Role_By_OWNER_ID
{
OWNER_ID?: number;
}
export class Params_Get_Country_By_OWNER_ID
{
OWNER_ID?: number;
}
export class Country
{
COUNTRY_ID?: number;
NAME: string;
PHONE_EXT: string;
ENTRY_USER_ID?: number;
OWNER_ID?: number;
ENTRY_DATE: string;
}
export class Params_Get_Specialty_By_OWNER_ID
{
OWNER_ID?: number;
}
export class Specialty
{
SPECIALTY_ID?: number;
VALUE: string;
IS_PREDEFINED?: boolean;
ENTRY_USER_ID?: number;
OWNER_ID?: number;
ENTRY_DATE: string;
}
export class Person
{
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
export class Sessions_bundle
{
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
export class Sessions_bundle_session
{
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
export class Trainer_specialty
{
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
export class Params_Get_Trainer_specialty_By_USER_ID
{
USER_ID?: number;
}
export class Params_Get_Sessions_bundle_By_SESSIONS_BUNDLE_ID
{
SESSIONS_BUNDLE_ID?: number;
}
export class Params_Get_Sessions_bundle_By_CLIENT_ID
{
CLIENT_ID?: number;
}
export class Params_Get_Sessions_bundle_By_TRAINER_ID
{
TRAINER_ID?: number;
}
export class Params_Authenticate
{
USER_NAME: string;
PASSWORD: string;
}
export class UserInfo
{
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
export class Params_Authenticate_Guest
{
GUEST_ID: number;
GUEST_PASSWORD: string;
}
export class oAuthenticate_Guest
{
GUEST_ID: number;
TRAINER_ID: number;
}
export class Params_GetClientsByTrainerId
{
TRAINER_ID: number;
}
export class oGetClientsByTrainerId
{
TRAINER_CLIENTS: Person[];
}
export class Params_Get_Person_By_USER_ID
{
USER_ID?: number;
}
export class Params_Get_Trainer_certification_By_USER_ID
{
USER_ID?: number;
}
export class Trainer_certification
{
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
export class Params_GetOptionsByOptionType
{
OPTIONTYPE: string;
}
export class GetOptionsByOptionTypeResponse
{
OPTIONS: Option[];
}
export class Option
{
OPTION_ID?: number;
OPTION_TYPE: string;
LABEL: string;
VALUE: string;
INFO: string;
ENTRY_USER_ID?: number;
ENTRY_DATE: string;
OWNER_ID?: number;
}
export class Uploaded_file
{
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
export class Params_Delete_Uploaded_file
{
UPLOADED_FILE_ID?: number;
}
export class Params_Delete_Uploaded_file_By_REL_ENTITY_REL_KEY_REL_FIELD
{
REL_ENTITY: string;
REL_KEY?: number;
REL_FIELD: string;
}
export class Currency
{
CURRENCY_ID?: number;
SYMBOL: string;
FULL_NAME: string;
ENTRY_USER_ID?: number;
ENTRY_DATE: string;
OWNER_ID?: number;
}
export class Action_Result{
ExceptionMsg: string;
}
export class Result_Get_User_By_USER_ID_Adv extends Action_Result {
My_Result : User;
My_Params_Get_User_By_USER_ID : Params_Get_User_By_USER_ID;
}
export class Result_UPC_VALIDATE_VALIDATION_CODE extends Action_Result {
My_Result : oUPC_VALIDATE_VALIDATION_CODE;
My_Params_UPC_VALIDATE_VALIDATION_CODE : Params_UPC_VALIDATE_VALIDATION_CODE;
}
export class Result_Add_Guest_Client extends Action_Result {
My_Result : Guest_password;
My_Params_Add_Guest_Client : Params_Add_Guest_Client;
}
export class Result_Get_Gender_By_OWNER_ID extends Action_Result {
My_Result : Gender[];
My_Params_Get_Gender_By_OWNER_ID : Params_Get_Gender_By_OWNER_ID;
}
export class Result_Get_Role_By_OWNER_ID extends Action_Result {
My_Result : Role[];
My_Params_Get_Role_By_OWNER_ID : Params_Get_Role_By_OWNER_ID;
}
export class Result_Get_Country_By_OWNER_ID extends Action_Result {
My_Result : Country[];
My_Params_Get_Country_By_OWNER_ID : Params_Get_Country_By_OWNER_ID;
}
export class Result_Get_Specialty_By_OWNER_ID extends Action_Result {
My_Result : Specialty[];
My_Params_Get_Specialty_By_OWNER_ID : Params_Get_Specialty_By_OWNER_ID;
}
export class Result_Edit_Role extends Action_Result {
My_Role : Role;
}
export class Result_Edit_User extends Action_Result {
My_User : User;
}
export class Result_Edit_Person extends Action_Result {
My_Person : Person;
}
export class Result_Edit_Specialty extends Action_Result {
My_Specialty : Specialty;
}
export class Result_Edit_Sessions_bundle extends Action_Result {
My_Sessions_bundle : Sessions_bundle;
}
export class Result_Edit_Sessions_bundle_session extends Action_Result {
My_Sessions_bundle_session : Sessions_bundle_session;
}
export class Result_Edit_Trainer_specialty extends Action_Result {
My_Trainer_specialty : Trainer_specialty;
}
export class Result_Get_Trainer_specialty_By_USER_ID extends Action_Result {
My_Result : Trainer_specialty[];
My_Params_Get_Trainer_specialty_By_USER_ID : Params_Get_Trainer_specialty_By_USER_ID;
}
export class Result_Get_Sessions_bundle_By_SESSIONS_BUNDLE_ID extends Action_Result {
My_Result : Sessions_bundle;
My_Params_Get_Sessions_bundle_By_SESSIONS_BUNDLE_ID : Params_Get_Sessions_bundle_By_SESSIONS_BUNDLE_ID;
}
export class Result_Get_Sessions_bundle_By_CLIENT_ID extends Action_Result {
My_Result : Sessions_bundle[];
My_Params_Get_Sessions_bundle_By_CLIENT_ID : Params_Get_Sessions_bundle_By_CLIENT_ID;
}
export class Result_Get_Sessions_bundle_By_TRAINER_ID extends Action_Result {
My_Result : Sessions_bundle[];
My_Params_Get_Sessions_bundle_By_TRAINER_ID : Params_Get_Sessions_bundle_By_TRAINER_ID;
}
export class Result_Get_Sessions_bundle_By_SESSIONS_BUNDLE_ID_Adv extends Action_Result {
My_Result : Sessions_bundle;
My_Params_Get_Sessions_bundle_By_SESSIONS_BUNDLE_ID : Params_Get_Sessions_bundle_By_SESSIONS_BUNDLE_ID;
}
export class Result_Authenticate extends Action_Result {
My_Result : UserInfo;
My_Params_Authenticate : Params_Authenticate;
}
export class Result_Authenticate_Guest extends Action_Result {
My_Result : oAuthenticate_Guest;
My_Params_Authenticate_Guest : Params_Authenticate_Guest;
}
export class Result_GetClientsByTrainerId extends Action_Result {
My_Result : oGetClientsByTrainerId;
My_Params_GetClientsByTrainerId : Params_GetClientsByTrainerId;
}
export class Result_Get_Person_By_USER_ID_Adv extends Action_Result {
My_Result : Person[];
My_Params_Get_Person_By_USER_ID : Params_Get_Person_By_USER_ID;
}
export class Result_Get_Trainer_certification_By_USER_ID_Adv extends Action_Result {
My_Result : Trainer_certification[];
My_Params_Get_Trainer_certification_By_USER_ID : Params_Get_Trainer_certification_By_USER_ID;
}
export class Result_Edit_Trainer_certification extends Action_Result {
My_Trainer_certification : Trainer_certification;
}
export class Result_GetOptionsByOptionType extends Action_Result {
My_Result : GetOptionsByOptionTypeResponse;
My_Params_GetOptionsByOptionType : Params_GetOptionsByOptionType;
}
export class Result_Edit_Uploaded_file extends Action_Result {
My_Uploaded_file : Uploaded_file;
}
export class Result_Delete_Uploaded_file extends Action_Result {
My_Params_Delete_Uploaded_file : Params_Delete_Uploaded_file;
}
export class Result_Delete_Uploaded_file_By_REL_ENTITY_REL_KEY_REL_FIELD extends Action_Result {
My_Params_Delete_Uploaded_file_By_REL_ENTITY_REL_KEY_REL_FIELD : Params_Delete_Uploaded_file_By_REL_ENTITY_REL_KEY_REL_FIELD;
}
