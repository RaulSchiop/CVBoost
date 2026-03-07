package org.example.backend.Models;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.example.backend.Enums.ProfileType;
import software.amazon.awssdk.enhanced.dynamodb.mapper.annotations.*;

import java.util.Date;

@Data
@DynamoDbBean
@NoArgsConstructor
public class User {

    private String pk;
    private String sk;
    private String name;
    private String password;
    private String createdAt;
    private ProfileType profileType;

    @DynamoDbPartitionKey
    @DynamoDbAttribute("PK")
    public String getPK() { return pk; }

    @DynamoDbSortKey
    @DynamoDbAttribute("SK")
    public String getSK() { return sk; }

    @DynamoDbAttribute("Name")
    public String getName() { return name; }

    @DynamoDbAttribute("Password")
    public String getPassword() { return password; }

    @DynamoDbAttribute("CreatedAt")
    public String getCreatedAt() { return createdAt; }

    @DynamoDbAttribute("ProfileType")
    public ProfileType getProfileType() { return profileType; }

}
