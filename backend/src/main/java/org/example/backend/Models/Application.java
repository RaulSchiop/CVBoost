package org.example.backend.Models;

import lombok.Data;
import lombok.NoArgsConstructor;
import software.amazon.awssdk.enhanced.dynamodb.mapper.annotations.DynamoDbAttribute;
import software.amazon.awssdk.enhanced.dynamodb.mapper.annotations.DynamoDbBean;
import software.amazon.awssdk.enhanced.dynamodb.mapper.annotations.DynamoDbPartitionKey;
import software.amazon.awssdk.enhanced.dynamodb.mapper.annotations.DynamoDbSortKey;

@Data
@NoArgsConstructor
@DynamoDbBean
public class Application {
    private String pk;
    private String sk;
    private String job;
    private String seniority;
    private String company;
    private String applicationDate;
    private String status;

    @DynamoDbAttribute("PK")
    @DynamoDbPartitionKey
    public String getPK(){
        return pk;
    }

    @DynamoDbAttribute("SK")
    @DynamoDbSortKey
    public String getSK(){
        return sk;
    }

    @DynamoDbAttribute("Job")
    public String getJob(){
        return job;
    }

    @DynamoDbAttribute("Seniority")
    public String getSeniority(){
        return seniority;
    }

    @DynamoDbAttribute("Company")
    public String getCompany(){
        return company;
    }

    @DynamoDbAttribute("ApplicationDate")
    public String getData(){
        return applicationDate;
    }

    @DynamoDbAttribute("Status")
    public String getStatus(){
        return status;
    }

}

