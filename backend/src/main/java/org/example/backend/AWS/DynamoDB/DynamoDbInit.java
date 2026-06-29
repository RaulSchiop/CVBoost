package org.example.backend.AWS.DynamoDB;

import jakarta.annotation.PostConstruct;
import org.example.backend.Models.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import software.amazon.awssdk.enhanced.dynamodb.DynamoDbEnhancedClient;
import software.amazon.awssdk.enhanced.dynamodb.DynamoDbTable;
import software.amazon.awssdk.enhanced.dynamodb.TableSchema;
import software.amazon.awssdk.services.dynamodb.model.ResourceInUseException;

@Configuration
public class DynamoDbInit {

    private final DynamoDbEnhancedClient enhancedClient;
    @Value("${aws.dynamodb.table-name}")
    private String tableName;
    @Autowired
    public DynamoDbInit(DynamoDbEnhancedClient enhancedClient) {
        this.enhancedClient = enhancedClient;
    }

    @PostConstruct
    public void init() {
        System.out.println("DynamoDbInit: Starting table initialization...");
        createTableIfNotExists();
        System.out.println("DynamoDbInit: Table initialization complete!");
    }

    private void createTableIfNotExists() {
        try {
            DynamoDbTable<User> table = enhancedClient.table(tableName, TableSchema.fromBean(User.class));

            System.out.println("Checking if table '" + tableName + "' exists...");
            table.describeTable();
            System.out.println("Table '" + tableName + "' is ready and verified in AWS Cloud!");

        } catch (Exception e) {
            System.err.println("DynamoDbInit Error: Table '" + tableName + "' does not exist or is inaccessible: " + e.getMessage());
        }
    }
}