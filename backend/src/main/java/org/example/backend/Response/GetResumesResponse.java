package org.example.backend.Response;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class GetResumesResponse {
    private String fileName;
    private String uploadedAt;
    private Integer atsScore;
    private String downloadUrl;
}
