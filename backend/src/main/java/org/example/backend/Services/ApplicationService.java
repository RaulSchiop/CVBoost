package org.example.backend.Services;

import org.example.backend.Enums.ApplicationStatus;
import org.example.backend.Models.Application;
import org.example.backend.Requests.ApplicationRequest;
import org.example.backend.Requests.ApplicationRequestCreate;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import software.amazon.awssdk.enhanced.dynamodb.DynamoDbEnhancedClient;
import software.amazon.awssdk.enhanced.dynamodb.DynamoDbTable;
import software.amazon.awssdk.enhanced.dynamodb.Key;
import software.amazon.awssdk.enhanced.dynamodb.TableSchema;
import software.amazon.awssdk.enhanced.dynamodb.model.QueryConditional;

import java.time.Instant;
import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class ApplicationService {

    private static final Logger logger = LoggerFactory.getLogger(ApplicationService.class);
    private final String skPrefixConstant = "APPLICATION";
    private final DynamoDbTable<Application> applicationTable;

    @Autowired
    public ApplicationService(DynamoDbEnhancedClient enhancedClient) {
        this.applicationTable = enhancedClient.table("AppTable", TableSchema.fromBean(Application.class));
    }

    public ResponseEntity<?> createApplication(ApplicationRequestCreate applicationRequest) {
        try {
            String isoNow = LocalDate.now().toString();
            String uniqueSk = skPrefixConstant + "#" + isoNow;

            Application application = new Application();
            application.setPK(applicationRequest.getEmail());
            application.setSK(uniqueSk);
            application.setSeniority(applicationRequest.getSeniority());
            application.setCompany(applicationRequest.getCompany());
            application.setCreatedAt(isoNow);
            application.setPosition(applicationRequest.getPosition());
            application.setStatus(applicationRequest.getStatus().name());

            applicationTable.putItem(application);
            return new ResponseEntity<>(applicationRequest, HttpStatus.CREATED);

        } catch (Exception e) {
            logger.error("Error creating application: ", e);
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public ResponseEntity<?> getApplications(String email) {
        try {
            String skTargetPrefix = skPrefixConstant + "#";

            QueryConditional queryConditional = QueryConditional
                    .sortBeginsWith(Key.builder()
                            .partitionValue(email)
                            .sortValue(skTargetPrefix)
                            .build());

            List<ApplicationRequest> applications = applicationTable.query(queryConditional)
                    .items()
                    .stream()
                    .map(item -> {
                        ApplicationRequest app = new ApplicationRequest();
                        app.setSK(item.getSK());
                        app.setEmail(item.getPK());
                        app.setStatus(item.getStatus() != null ? ApplicationStatus.valueOf(item.getStatus()) : ApplicationStatus.applied);
                        app.setPosition(item.getPosition());
                        app.setSeniority(item.getSeniority());
                        app.setApplicationDate(item.getCreatedAt());
                        app.setCompany(item.getCompany());
                        return app;
                    })
                    .collect(Collectors.toList());

            return new ResponseEntity<>(applications, HttpStatus.OK);

        } catch (Exception e) {
            logger.error("Error querying applications: ", e);
            return new ResponseEntity<>(Map.of("message", e.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public ResponseEntity<?> updateApplication(String email, String sk, String status) {
        try {
            Key key = Key.builder().partitionValue(email).sortValue(sk).build();
            Application existingApplication = applicationTable.getItem(key);

            if (existingApplication == null) {
                return new ResponseEntity<>("Application record not found", HttpStatus.NOT_FOUND);
            }

            existingApplication.setStatus(status);
            applicationTable.updateItem(existingApplication);

            return new ResponseEntity<>("Status updated", HttpStatus.OK);

        } catch (Exception e) {
            logger.error("Error updating application status: ", e);
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}