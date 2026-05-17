package org.example.backend.Controllers;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.example.backend.Requests.ApplicationRequest;
import org.example.backend.Requests.ApplicationRequestCreate;
import org.example.backend.Requests.ApplicationUpdate;
import org.example.backend.Services.ApplicationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/application")
@CrossOrigin(origins = "http://localhost:3000")
public class JobApplicationController {

    private static final Log log = LogFactory.getLog(JobApplicationController.class);
    private final ApplicationService applicationService;

    @Autowired
    JobApplicationController(ApplicationService applicationService) {
        this.applicationService = applicationService;
    }

    @PostMapping("/createApplication")
    ResponseEntity<?> createApplication(@RequestBody ApplicationRequestCreate application) {
        log.info("Creating application");
        return applicationService.createApplication(application);

    }

    @GetMapping ("/getApplications/{email}")
    ResponseEntity<?> getApplications(@PathVariable("email") String email) {
        log.info("Getting applications "+ email);
        String emailClean = email.trim();
        return applicationService.getApplications(emailClean);
    }

    @PatchMapping("/updateStatus")
    public ResponseEntity<?> updateStatus(@RequestBody ApplicationUpdate request) {
        return applicationService.updateApplication(request.getEmail(), request.getSk(), request.getStatus());
    }


}
