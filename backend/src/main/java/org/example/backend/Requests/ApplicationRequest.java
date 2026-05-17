package org.example.backend.Requests;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.example.backend.Enums.ApplicationStatus;

@AllArgsConstructor
@Data
@NoArgsConstructor
public class ApplicationRequest {
    private String email;
    private String position;
    private String seniority;
    private String applicationDate;
    private String company;
    private ApplicationStatus status;


}
