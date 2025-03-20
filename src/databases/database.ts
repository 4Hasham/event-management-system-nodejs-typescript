import mongoose, { Connection } from "mongoose";
import databases from "../config/db.config";

const mongoInstance: Connection =  mongoose.createConnection(databases.DATABASE);

mongoInstance.on("open", () => {
    console.log([new Date()], "Connection to Events is established");
});

mongoInstance.on("reconnected", () => {
    console.log([new Date()], "Connection reestablished with Events ...");
});

mongoInstance.on("disconnected", () => {
    console.log([new Date()], "Connecting to Events...");
});

mongoInstance.on("error", (err) => {
    console.log(
        [new Date()],
        "Error occurred while connecting to Events \nError Stack: ",
        err
    );
});

export default mongoInstance;
