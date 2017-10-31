# Container Structure

โครงสร้าง Container ที่ต้องการ

![System structure](images/Docker-Worksheet.jpg)

## Port
Agent | Docker | Localhost
------------- | ------------ | -------------
UserAccountService  | 80 | 80
UserDataServer | 3306 | -
AssetService | 3030 | 3030
AssetMappingDatabase | 27017 | 27017


## How to run?
ทำตามวิธีการข้างล่างนี้

```bash
$ docker-compose build
$ docker-compose up -d
$ curl -L http://localhost/?username=alice
```
ผลลัพธ์
```json
{
"username": "alice",
"phone_number": "1234567890",
"profile_image": "https://picsum.photos/1000"
}
```
