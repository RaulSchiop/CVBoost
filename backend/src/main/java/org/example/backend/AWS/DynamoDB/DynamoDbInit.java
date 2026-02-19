package org.example.backend.AWS.DynamoDB;

import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import software.amazon.awssdk.services.dynamodb.DynamoDbClient;
import software.amazon.awssdk.services.dynamodb.model.*;

@Configuration
public class DynamoDbInit {


    private DynamoDbClient dynamoDbClient;

    @Autowired
    DynamoDbInit (DynamoDbClient dynamoDbClient) {
        this.dynamoDbClient = dynamoDbClient;
    }

    private final String TABLE_NAME = "AppTable";

    @PostConstruct
    public void init() {
        createTableIfNotExists();
    }

    private void createTableIfNotExists() {
        try {
            // Try to describe the table
            dynamoDbClient.describeTable(DescribeTableRequest.builder()
                    .tableName(TABLE_NAME)
                    .build());
            System.out.println("Table '" + TABLE_NAME + "' already exists.");
        } catch (ResourceNotFoundException e) {
            // Table does not exist → create it
            System.out.println("Creating table '" + TABLE_NAME + "'...");
            CreateTableRequest request = CreateTableRequest.builder()
                    .tableName(TABLE_NAME)
                    .keySchema(
                            KeySchemaElement.builder().attributeName("PK").keyType(KeyType.HASH).build(),
                            KeySchemaElement.builder().attributeName("SK").keyType(KeyType.RANGE).build()
                    )
                    .attributeDefinitions(
                            AttributeDefinition.builder().attributeName("PK").attributeType(ScalarAttributeType.S).build(),
                            AttributeDefinition.builder().attributeName("SK").attributeType(ScalarAttributeType.S).build()
                    )
                    .provisionedThroughput(
                            ProvisionedThroughput.builder()
                                    .readCapacityUnits(5L)
                                    .writeCapacityUnits(5L)
                                    .build()
                    )
                    .build();

            dynamoDbClient.createTable(request);
            System.out.println("Table created!");
        }
    }
}
