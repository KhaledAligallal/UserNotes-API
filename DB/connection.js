import { Sequelize } from 'sequelize'


export const sql_config = new Sequelize('k_2', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
})



export const db_connection = async () => {
   await sql_config.sync({alter:true,force:false})
    .then(res => console.log('DB connection success'))
    .catch((err) => console.log('db connection fail', err))
}

