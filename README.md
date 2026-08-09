# CVBoost 🚀

> An end-to-end, AI-powered resume evaluation and optimization platform built to analyze, score, and tailor CVs against targeted job postings in real time.

![Java](https://img.shields.io/badge/Java-17-orange?logo=java)
![Spring Boot](https://img.shields.io/badge/Spring_Boot-3.x-brightgreen?logo=springboot)
![React](https://img.shields.io/badge/React-18-blue?logo=react)
![AWS S3](https://img.shields.io/badge/AWS_S3-Storage-FF9900?logo=amazonaws)
![AWS DynamoDB](https://img.shields.io/badge/AWS_DynamoDB-Database-4053D6?logo=amazonaws)

---

## 🛠️ System Architecture

![System Architecture](frontend/public/arhitectura.png)


---

## ✨ Features

* **AI-Driven Resume Analysis:** Evaluates structure, content and tone using OpenAI models.
* **AI-Driven Resume and Cover letter creation:** Creates resumes and cover letters based on a input
* **AWS Cloud Integration:** Offloads secure PDF storage to **Amazon S3** and saves metadata in **Amazon DynamoDB**.
* **Modern Reactive UI:** Clean user interface built with Next Js and Tailwind CSS for seamless file uploads and instant report rendering.

---

## ⚙️ AWS Configuration

To run this application locally, set up the following AWS resources in the `eu-central-1` region:

1. **Amazon S3:** Create a private S3 bucket named `raul-resumes-private-storage`.
2. **Amazon DynamoDB:** Create a table named `AppTable` with:
   * **Partition Key (`PK`):** `String`
   * **Sort Key (`SK`):** `String`
3. **AWS IAM Credentials:** Generate an IAM user with the following permissions:
   * **S3 Policy:** `s3:*` (or restricted to `s3:GetObject`, `s3:PutObject`, `s3:DeleteObject`)
   * **DynamoDB Policy:** `dynamodb:PutItem`, `dynamodb:GetItem`, `dynamodb:Query`, `dynamodb:UpdateItem`, `dynamodb:DeleteItem`

---

## 🚀 Local Quickstart

### 1. Clone the Repository
```bash
git clone [https://github.com/RaulSchiop/CVBoost.git](https://github.com/RaulSchiop/CVBoost.git)
cd CVBoost
```

## 2. Configure Environment Variables
Set the required secrets in your local environment or create a .env file:
```bash
export OPENAI_KEY="your-openai-api-key"
export AWS_ACCESS_KEY_ID="your-iam-access-key"
export AWS_SECRET_ACCESS_KEY="your-iam-secret-key"
export AWS_REGION="eu-central-1"
```
## 3. Run the Backend
Open terminal 1:

```bash
cd backend
mvn clean install
mvn spring-boot:run
```
Backend Service: Runs on http://localhost:8080

## 4. Run the Frontend
Open terminal 2:
```bash
cd frontend
npm install
npm run dev
```


---
