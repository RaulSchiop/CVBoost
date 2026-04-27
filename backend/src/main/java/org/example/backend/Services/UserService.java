package org.example.backend.Services;

import org.example.backend.Requests.UserRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import software.amazon.awssdk.services.dynamodb.DynamoDbClient;
import software.amazon.awssdk.services.dynamodb.model.AttributeValue;
import software.amazon.awssdk.services.dynamodb.model.GetItemRequest;
import software.amazon.awssdk.services.dynamodb.model.GetItemResponse;
import software.amazon.awssdk.services.dynamodb.model.PutItemRequest;

import java.util.Date;
import java.util.Map;


@Service
public class UserService {

    private final String sk="USER";
    private final BCryptPasswordEncoder encoder=new BCryptPasswordEncoder();
    private DynamoDbClient dynamoDbClient;

    @Autowired
    UserService(DynamoDbClient dynamoDbClient) {
        this.dynamoDbClient = dynamoDbClient;
    }

    public ResponseEntity<?> createUser(UserRequest userRequest) {
        try{
            String pk=userRequest.getEmail();
            String hashedPassword=encoder.encode(userRequest.getPassword());
            PutItemRequest request = PutItemRequest.builder()
                    .tableName("AppTable")
                    .item(Map.of(
                            "PK", AttributeValue.builder().s(pk).build(),
                            "SK", AttributeValue.builder().s(sk).build(),
                            "Name", AttributeValue.builder().s(userRequest.getName()).build(),
                            "Password", AttributeValue.builder().s(hashedPassword).build(),
                            "CreatedAt", AttributeValue.builder().s(new Date().toString()).build(),
                            "ProfileType", AttributeValue.builder().s(userRequest.getProfileType().toString()).build()
                    ))
                    .build();

            dynamoDbClient.putItem(request);
            return new ResponseEntity<>(userRequest, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public ResponseEntity<?> getUserByEmail(String email) {
        try {
            GetItemRequest request = GetItemRequest.builder()
                    .tableName("AppTable")
                    .key(Map.of(
                            "PK", AttributeValue.builder().s(email).build(),
                            "SK", AttributeValue.builder().s("USER").build()
                    ))
                    .build();

            GetItemResponse response = dynamoDbClient.getItem(request);

            if (response.item().isEmpty()) {
                return new ResponseEntity<>("User not found", HttpStatus.NOT_FOUND);
            }

            Map<String, AttributeValue> item = response.item();
            return new ResponseEntity<>(Map.of(
                    "PK", item.get("PK").s(),
                    "SK", item.get("SK").s(),
                    "Name", item.get("Name").s(),
                    "CreatedAt", item.get("CreatedAt").s(),
                    "ProfileType", item.get("ProfileType").s()
            ), HttpStatus.OK);

        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
