package org.example.backend.Models;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.example.backend.Enums.ProfileType;
import software.amazon.awssdk.enhanced.dynamodb.mapper.annotations.*;

@Data
@NoArgsConstructor
@DynamoDbBean
public class User {

    private String PK;
    private String SK;

    private String name;
    private String password;
    private String createdAt;
    private ProfileType profileType;

    @DynamoDbPartitionKey
    @DynamoDbAttribute("PK")
    public String getPK() { return PK; }

    @DynamoDbSortKey
    @DynamoDbAttribute("SK")
    public String getSK() { return SK; }

    @DynamoDbAttribute("Name")
    public String getName() { return name; }

    @DynamoDbAttribute("Password")
    public String getPassword() { return password; }

    @DynamoDbAttribute("CreatedAt")
    public String getCreatedAt() { return createdAt; }

    @DynamoDbAttribute("ProfileType")
    public ProfileType getProfileType() { return profileType; }
}