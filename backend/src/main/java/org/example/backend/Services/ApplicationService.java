package org.example.backend.Services;


import org.example.backend.Enums.ApplicationStatus;
import org.example.backend.Requests.ApplicationRequest;

import org.example.backend.Requests.ApplicationRequestCreate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import software.amazon.awssdk.services.dynamodb.DynamoDbClient;
import software.amazon.awssdk.services.dynamodb.model.*;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class ApplicationService {



    private final String sk="APLICATION";

    private final BCryptPasswordEncoder encoder=new BCryptPasswordEncoder();
    private final DynamoDbClient dynamoDbClient;

    @Autowired
    ApplicationService(DynamoDbClient dynamoDbClient) {
        this.dynamoDbClient = dynamoDbClient;
    }

    public ResponseEntity<?> createApplication(ApplicationRequestCreate application) {
        try{
            String uniqueSk = sk + "#" + LocalDateTime.now();
            String pk=application.getEmail();
            PutItemRequest request = PutItemRequest.builder()
                    .tableName("AppTable")
                    .item(Map.of(
                            "PK", AttributeValue.builder().s(pk).build(),
                            "SK", AttributeValue.builder().s(uniqueSk).build(),
                            "Seniority", AttributeValue.builder().s(application.getSeniority()).build(),
                            "Company", AttributeValue.builder().s(application.getCompany()).build(),
                            "CreatedAt", AttributeValue.builder().s(new Date().toString()).build(),
                            "Position",AttributeValue.builder().s(application.getPosition()).build(),
                            "Status",AttributeValue.builder().s(application.getStatus().name()).build()
                    ))
                    .build();

            dynamoDbClient.putItem(request);
            return new ResponseEntity<>(application, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    public ResponseEntity<?> getApplications(String email) {
        try {

            String skPrefix = sk + "#";

            QueryRequest queryRequest = QueryRequest.builder()
                    .tableName("AppTable")
                    .keyConditionExpression("PK = :pk and begins_with(SK, :sk)")
                    .expressionAttributeValues(Map.of(
                            ":pk", AttributeValue.builder().s(email).build(),
                            ":sk", AttributeValue.builder().s(skPrefix).build()
                    ))
                    .build();
            System.out.println("Querying DynamoDB for PK=" + email + " SKPrefix=" + skPrefix);
            QueryResponse queryResponse = dynamoDbClient.query(queryRequest);

            List<ApplicationRequest> applications = queryResponse.items().stream().map(item -> {
                ApplicationRequest app = new ApplicationRequest();
                app.setSK(item.getOrDefault("SK", AttributeValue.builder().s("").build()).s());
                app.setEmail(item.getOrDefault("PK", AttributeValue.builder().s("").build()).s());
                app.setStatus(item.containsKey("Status") ? ApplicationStatus.valueOf(item.get("Status").s()) : ApplicationStatus.applied);
                app.setPosition(item.containsKey("Position") ? item.get("Position").s() : "");
                app.setSeniority(item.containsKey("Seniority") ? item.get("Seniority").s() : "");
                app.setApplicationDate(item.containsKey("CreatedAt") ? item.get("CreatedAt").s() : "");
                app.setCompany(item.containsKey("Company") ? item.get("Company").s() : "");

                return app;
            }).collect(Collectors.toList());

            return new ResponseEntity<>(applications, HttpStatus.OK);

        } catch (Exception e) {
            return new ResponseEntity<>(Map.of("message", e.getMessage()), HttpStatus.OK);
        }
    }

    public ResponseEntity<?> updateApplication(String email,String sk,String status) {
        try {

            UpdateItemRequest updateRequest = UpdateItemRequest.builder()
                    .tableName("AppTable")
                    .key(Map.of(
                            "PK", AttributeValue.builder().s(email).build(),
                            "SK", AttributeValue.builder().s(sk).build()
                    ))
                    .updateExpression("SET #st = :status")
                    .expressionAttributeNames(Map.of("#st", "Status"))
                    .expressionAttributeValues(Map.of(
                            ":status", AttributeValue.builder().s(status).build()
                    ))
                    .build();

            dynamoDbClient.updateItem(updateRequest);
            return new ResponseEntity<>("Status updated", HttpStatus.OK);

        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
