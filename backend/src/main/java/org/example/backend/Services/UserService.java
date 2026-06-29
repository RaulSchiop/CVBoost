package org.example.backend.Services;

import org.example.backend.Models.User;
import org.example.backend.Requests.UserRequest;
import org.example.backend.Utils.JwtUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import software.amazon.awssdk.enhanced.dynamodb.DynamoDbEnhancedClient;
import software.amazon.awssdk.enhanced.dynamodb.DynamoDbTable;
import software.amazon.awssdk.enhanced.dynamodb.Expression;
import software.amazon.awssdk.enhanced.dynamodb.Key;
import software.amazon.awssdk.enhanced.dynamodb.TableSchema;
import software.amazon.awssdk.enhanced.dynamodb.model.PutItemEnhancedRequest;
import software.amazon.awssdk.services.dynamodb.model.ConditionalCheckFailedException;

import java.time.Instant;
import java.util.Map;

@Service
public class UserService {

    private static final Logger logger = LoggerFactory.getLogger(UserService.class);

    private final String skConstant = "USER";
    private final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
    private final JwtUtil jwtUtil;
    private final DynamoDbTable<User> userTable;

    @Autowired
    public UserService(DynamoDbEnhancedClient enhancedClient, JwtUtil jwtUtil) {
        this.jwtUtil = jwtUtil;
        this.userTable = enhancedClient.table("AppTable", TableSchema.fromBean(User.class));
    }

    public ResponseEntity<?> createUser(UserRequest userRequest) {
        try {
            User user = new User();
            user.setPK(userRequest.getEmail());
            user.setSK(skConstant);
            user.setName(userRequest.getName());
            user.setPassword(encoder.encode(userRequest.getPassword()));
            user.setCreatedAt(Instant.now().toString());
            user.setProfileType(userRequest.getProfileType());

            Expression expression = Expression.builder()
                    .expression("attribute_not_exists(PK)")
                    .build();

            userTable.putItem(PutItemEnhancedRequest.builder(User.class)
                    .item(user)
                    .conditionExpression(expression)
                    .build());

            return new ResponseEntity<>(Map.of(
                    "email", user.getPK(),
                    "name", user.getName(),
                    "profileType", user.getProfileType().toString(),
                    "createdAt", user.getCreatedAt()
            ), HttpStatus.CREATED);

        } catch (ConditionalCheckFailedException e) {
            return new ResponseEntity<>("A user with this email already exists.", HttpStatus.CONFLICT);
        } catch (Exception e) {
            logger.error("Error creating user: ", e);
            return new ResponseEntity<>("An unexpected internal error occurred.", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public ResponseEntity<?> getUserByEmail(String email) {
        try {
            Key key = Key.builder().partitionValue(email).sortValue(skConstant).build();
            User user = userTable.getItem(key);

            if (user == null) {
                return new ResponseEntity<>("User not found", HttpStatus.NOT_FOUND);
            }

            return new ResponseEntity<>(Map.of(
                    "email", user.getPK(),
                    "name", user.getName(),
                    "createdAt", user.getCreatedAt(),
                    "profileType", user.getProfileType().toString()
            ), HttpStatus.OK);

        } catch (Exception e) {
            logger.error("Error retrieving user profile: ", e);
            return new ResponseEntity<>("An unexpected internal error occurred.", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public ResponseEntity<?> authenticateUser(String email, String password) {
        try {
            Key key = Key.builder().partitionValue(email).sortValue(skConstant).build();
            User user = userTable.getItem(key);

            if (user == null || !encoder.matches(password, user.getPassword())) {
                return new ResponseEntity<>("Invalid email or password", HttpStatus.UNAUTHORIZED);
            }

            String token = jwtUtil.generateToken(user.getPK(), user.getProfileType().toString());

            return new ResponseEntity<>(Map.of(
                    "token", token,
                    "email", user.getPK(),
                    "name", user.getName(),
                    "profileType", user.getProfileType().toString()
            ), HttpStatus.OK);

        } catch (Exception e) {
            logger.error("Error logging user in: ", e);
            return new ResponseEntity<>("An unexpected internal error occurred.", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}