package org.example.backend.Models;
import lombok.Data;
import lombok.NoArgsConstructor;
import software.amazon.awssdk.enhanced.dynamodb.mapper.annotations.*;

import java.util.Date;

@Data
@DynamoDbBean
@NoArgsConstructor
public class User {

    private String PK;
    private String SK;
    private String Name;
    private String Password;
    private String CreatedAt;
    private String ProfileType;


    @DynamoDbPartitionKey
    public String getPK() {
        return PK;
    }

    @DynamoDbSortKey
    public String getSK() {
        return SK;
    }
}
