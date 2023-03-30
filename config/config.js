require('dotenv').config()
module.exports ={
    "development": {
      "username": "root",
      "password": process.env.DB_PASSWORD,
      "database": "budjetplan_workspace",
      "host": "127.0.0.1",
      "dialect": "mysql"
    },
    "test": {
      "username": "root",
      "password": process.env.DB_PASSWORD,
      "database": "budjetplan_workspace_test",
      "host": "127.0.0.1",
      "dialect": "mysql",
      "logging": false
    },
    "production": {
      "use_env_variable": "CLEARDB_DATABASE_URL"
    }
}
