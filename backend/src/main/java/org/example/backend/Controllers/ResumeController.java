package org.example.backend.Controllers;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.example.backend.Services.ResumeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/resume")
@CrossOrigin(origins = "http://localhost:3000")
public class ResumeController {

    private static final Log log = LogFactory.getLog(ResumeController.class);

    private final ResumeService resumeService;

    @Autowired
    ResumeController(ResumeService resumeService) {
        this.resumeService = resumeService;
    }

    @GetMapping("/getResumes/{email}")
    public ResponseEntity<?> getResume(@PathVariable("email") String email) {
        log.info("Getting applications "+ email);
        return resumeService.getResumesByEmail(email);
    }


}
