package org.example.backend.Controllers;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.example.backend.Requests.ApplicationRequest;
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
    ResponseEntity<?> createApplication(@RequestBody ApplicationRequest application) {
        log.info("Creating application");
        return applicationService.createApplication(application);

    }


}
