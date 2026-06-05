package org.example.backend.Models;

import lombok.Data;
import lombok.NoArgsConstructor;
import software.amazon.awssdk.enhanced.dynamodb.mapper.annotations.*;

@Data
@NoArgsConstructor
@DynamoDbBean
public class Application {
    private String PK;
    private String SK;
    private String position;
    private String seniority;
    private String company;
    private String createdAt;
    private String status;

    @DynamoDbPartitionKey
    @DynamoDbAttribute("PK")
    public String getPK() { return PK; }

    @DynamoDbSortKey
    @DynamoDbAttribute("SK")
    public String getSK() { return SK; }

    @DynamoDbAttribute("Position")
    public String getPosition() { return position; }

    @DynamoDbAttribute("Seniority")
    public String getSeniority() { return seniority; }

    @DynamoDbAttribute("Company")
    public String getCompany() { return company; }

    @DynamoDbAttribute("CreatedAt")
    public String getCreatedAt() { return createdAt; }

    @DynamoDbAttribute("Status")
    public String getStatus() { return status; }
}