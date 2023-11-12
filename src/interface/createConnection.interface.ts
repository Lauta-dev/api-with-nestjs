export interface CreateConnection {
  sql: string,
  parameter?: Array<String | Number | Array<any>>
}
