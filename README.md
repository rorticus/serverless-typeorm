# serverless-typeorm

Using serverless-mysql with TypeORM.  The basic idea is to create a mysql connection type and then override the driver before the connection takes place. Note that when running this from node, the program hangs around after disconnect since that's what serverless-mysql is supposed to do.
