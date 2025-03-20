export const getError = (error: any): String => {
    try {
        if (error) {
            if (error.details)
                return error.details[0].message;
            else
                return error.message;
        }
        return "Unexpected error occurred.";          
    } catch (error) {
        console.error(new Date(), error.message)
        return null;
    }
}