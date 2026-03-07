package org.example.backend.Models;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import software.amazon.awssdk.enhanced.dynamodb.mapper.annotations.DynamoDbAttribute;
import software.amazon.awssdk.enhanced.dynamodb.mapper.annotations.DynamoDbBean;
import software.amazon.awssdk.enhanced.dynamodb.mapper.annotations.DynamoDbPartitionKey;
import software.amazon.awssdk.enhanced.dynamodb.mapper.annotations.DynamoDbSortKey;

@Data
@DynamoDbBean
@NoArgsConstructor
public class Resume {
    private String pk;
    private String sk;
    private String fileName;
    private Number atsScore;
    private String file;
    private String uploadedAt;

    @DynamoDbPartitionKey
    @DynamoDbAttribute("PK")
    public String getPK() {
        return pk;
    }

    @DynamoDbSortKey
    @DynamoDbAttribute("SK")
    public String getSK() {
        return sk;
    }

    @DynamoDbAttribute("FileName")
    public String getFileName() {
        return fileName;
    }

    @DynamoDbAttribute("ATSScore")
    public Number getAtsScore() {
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
