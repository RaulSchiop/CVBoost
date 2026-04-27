package org.example.backend.Requests;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.example.backend.Enums.ProfileType;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class UserRequest {
    private String email;
    private String name;
    private String password;
    private ProfileType profileType = ProfileType.FREE;
}
