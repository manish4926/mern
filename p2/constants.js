
class Constants {
    TASK_NOT_FOUND = "Task Not Found";
    TASK_UPDATED_SUCCESSFULLY = "Task Updated Successfully";

    //Record
    RECORD_NOT_FOUND            = "Record Not Found";
    RECORD_UPDATED_SUCCESSFULLY = "Record Updated Successfully";
    RECORD_UPDATED_DELETED      = "Record Updated Deleted";

    //Default
    SOMETHING_WENT_WRONG = "Something Went Wrong";

    //Error Code
    VALIDATION_ERROR    = 400;
    UNAUTHORIZED_ERROR  = 401;
    FORBIDDEN_ERROR     = 403;
    NOT_FOUND_ERROR     = 404;
    SERVER_ERROR        = 500;

    //Response
    INVALID_INPUT = "Invalid Input";
    INVAID_ID   = "Invalid ID";

    //User
    USER_EXIST = "User already exist";

}

const ConstantsLib = new Constants();

module.exports = ConstantsLib;


