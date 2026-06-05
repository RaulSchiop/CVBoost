package org.example.backend.AWS.DynamoDB;

import jakarta.annotation.PostConstruct;
import org.example.backend.Models.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import software.amazon.awssdk.enhanced.dynamodb.DynamoDbEnhancedClient;
import software.amazon.awssdk.enhanced.dynamodb.DynamoDbTable;
import software.amazon.awssdk.enhanced.dynamodb.TableSchema;
import software.amazon.awssdk.services.dynamodb.model.ResourceInUseException;

@Configuration
public class DynamoDbInit {

    private final DynamoDbEnhancedClient enhancedClient;
    private final String tableName = "AppTable";

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

            System.out.println("Creating table '" + tableName + "' if it does not exist...");
            table.createTable(builder -> builder
                    .provisionedThroughput(tp -> tp.readCapacityUnits(5L).writeCapacityUnits(5L))
            );
            System.out.println("Table successfully created!");
        } catch (ResourceInUseException e) {
            System.out.println("Table '" + tableName + "' already exists.");
        } catch (Exception e) {
            System.err.println("DynamoDbInit Error during table setup: " + e.getMessage());
            e.printStackTrace();
        }
    }
}