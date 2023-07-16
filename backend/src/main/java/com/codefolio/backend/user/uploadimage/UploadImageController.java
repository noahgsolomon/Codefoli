package com.codefolio.backend.user.uploadimage;

import com.codefolio.backend.util.Response;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.security.Principal;

@RestController
public class UploadImageController {

    private final UploadImageService uploadImageService;

    public UploadImageController(UploadImageService uploadImageService) {
        this.uploadImageService = uploadImageService;
    }

    @PostMapping("/profile-image-upload")
    public ResponseEntity<Response> uploadProfileImage(@RequestParam("file") MultipartFile file, Principal principal) {
        return uploadImageService.uploadProfileImage(file, principal);
    }

    @PostMapping("/about-icon-one-upload")
    public ResponseEntity<Response> uploadIconOneAbout(@RequestParam("file") MultipartFile file, Principal principal) {
        return uploadImageService.uploadIconOneAbout(file, principal);
    }
    @PostMapping("/about-icon-two-upload")
    public ResponseEntity<Response> uploadIconTwoAbout(@RequestParam("file") MultipartFile file, Principal principal) {
        return uploadImageService.uploadIconTwoAbout(file, principal);
    }
    @PostMapping("/about-icon-three-upload")
    public ResponseEntity<Response> uploadIconThreeAbout(@RequestParam("file") MultipartFile file, Principal principal) {
        return uploadImageService.uploadIconThreeAbout(file, principal);
    }
    @PostMapping("/about-image-one-upload")
    public ResponseEntity<Response> uploadImageOneAbout(@RequestParam("file") MultipartFile file, Principal principal) {
        return uploadImageService.uploadImageOneAbout(file, principal);
    }

    @PostMapping("/job-image-upload")
    public ResponseEntity<Response> uploadJobImage(@RequestParam("file") MultipartFile file, Principal principal, @RequestParam("id") long id) {
        return uploadImageService.uploadJobImage(file, principal, id);
    }
}
