package org.example.backend.Models;

import lombok.Data;
import lombok.NoArgsConstructor;
import software.amazon.awssdk.enhanced.dynamodb.mapper.annotations.*;

@Data
@NoArgsConstructor
@DynamoDbBean
public class Resume {
    private String PK;
    private String SK;
    private String fileName;
    private Integer atsScore;
    private String file;
    private String uploadedAt;

    @DynamoDbPartitionKey
    @DynamoDbAttribute("PK")
    public String getPK() {
        return PK;
    }

    @DynamoDbSortKey
    @DynamoDbAttribute("SK")
    public String getSK() {
        return SK;
    }

    @DynamoDbAttribute("FileName")
    public String getFileName() {
        return fileName;
    }

    @DynamoDbAttribute("ATSScore")
    public Integer getAtsScore() {
        return atsScore;
    }

    @DynamoDbAttribute("File")
    public String getFile() {
        return file;
    }

    @DynamoDbAttribute("UploadedAt")
    public String getUploadedAt() {
        return uploadedAt;
    }
}