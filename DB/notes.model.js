import { sql_config } from "./connection.js";
import { DataTypes } from "sequelize";
import User from "./user.model.js";

const Note = sql_config.define('t_note',{

    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true

    },

    title: {
        type: DataTypes.STRING(255),
        required: true
    },

    content: {
        type: DataTypes.STRING(255),
        required: true,
        unique: true
    },

    user_id: {
        type: DataTypes.INTEGER,
        required: true
    }



}  )
User.hasMany(Note,{foreignKey:'user_id'});
Note.belongsTo(User,{foreignKey:'user_id'});
export default Note