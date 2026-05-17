package org.example.backend.Services;


import org.example.backend.Requests.ApplicationRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import software.amazon.awssdk.services.dynamodb.DynamoDbClient;
import software.amazon.awssdk.services.dynamodb.model.AttributeValue;
import software.amazon.awssdk.services.dynamodb.model.PutItemRequest;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.Map;

@Service
public class ApplicationService {



    private final String sk="APLICATION";

    private final BCryptPasswordEncoder encoder=new BCryptPasswordEncoder();
    private final DynamoDbClient dynamoDbClient;

    @Autowired
    ApplicationService(DynamoDbClient dynamoDbClient) {
        this.dynamoDbClient = dynamoDbClient;
    }

    public ResponseEntity<?> createApplication(ApplicationRequest application) {
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
                            "CreatedAt", AttributeValue.builder().s(new Date().toString()).build()
                    ))
                    .build();

            dynamoDbClient.putItem(request);
            return new ResponseEntity<>(application, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


}
