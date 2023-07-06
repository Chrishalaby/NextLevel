// NOT BEING USED WHEN I REMOVE PROXY FILE AND CREATE SERVICES FOR EACH API CALL ILL USE THIS
export interface userType {
  My_Result: userTypeResult[];
  My_Params_Get_Role_By_Owner_Id: MyParamsGetRoleByOwnerId;
  Exceptioncode: null;
  Exceptionmsg: string;
}

export interface userTypeResult {
  Role_Id: number;
  Value: string;
  Entry_User_Id: number;
  Owner_Id: number;
  Entry_Date: string;
}

export interface MyParamsGetRoleByOwnerId {
  Owner_Id: number;
}
