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
public class CoverLetter {

    private String pk;
    private String sk;
    private String fileName;
    private String file;
    private String date;

    @DynamoDbAttribute("SK")
    @DynamoDbSortKey
    public String getSK() {
        return sk;
    }

    @DynamoDbAttribute("PK")
    @DynamoDbPartitionKey
    public String getPK() {
        return pk;
    }

    @DynamoDbAttribute("FileName")
    public String getFileName() {
        return fileName;
    }

    @DynamoDbAttribute("File")
    public String getFile() {
        return file;
    }

    @DynamoDbAttribute("Date")
    public String getDate() {
        return date;
    }
}

