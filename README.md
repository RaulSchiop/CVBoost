
# 1. Comandă clonare repo github
```
git clone https://github.com/RaulSchiop/CVBoost.git
```

# 2. Configuratie AWS 

1. AWS Console in regiunea eu-central-1
2. Un bucket în **S3** privat `raul-resumes-private-storage`.
3. O tabelă în **DynamoDB** numită `AppTable` cu cheia de partiție `PK` (String) și cheia de sortare `SK` (String).
4. Un utilizator **IAM** cu o politică de acces ce permite acțiunile (`s3:*`,`dynamodb:PutItem`, `dynamodb:DeleteItem`,`dynamodb:GetItem`,,`dynamodb:Query`,`dynamodb:UpdateItem` )


## Configurație Variabile de Mediu Backend
  ```
  OPENAI_KEY="cheia_ta_openai_aici"
  AWS_ACCESS_KEY_ID="cheia_ta_de_acces_iam"
  AWS_SECRET_ACCESS_KEY="cheia_ta_secreta_iam"
  ```

# 3. Instalare şi Rulare

1. Instalare şi Rulare Backend
```
cd backend/
mvn clean install
mvn spring-boot:run
```
2. Instalare şi Rulare Frontend
```
cd frontend/
npm install
npm run dev
```
( terminale diferite )

Frontend: localhost portul:3000
Backend: localhost portul:8080
  
