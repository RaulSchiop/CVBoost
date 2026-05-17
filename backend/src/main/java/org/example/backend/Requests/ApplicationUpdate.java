package org.example.backend.Requests;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@Data
@NoArgsConstructor
public class ApplicationUpdate {
    String email;
    String sk;
    String status;
}
