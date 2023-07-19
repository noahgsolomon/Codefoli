package com.codefolio.backend.user.sections.type.value;

import com.codefolio.backend.user.Users;
import com.codefolio.backend.user.pages.aboutpage.values.Values;
import com.codefolio.backend.user.pages.aboutpage.values.ValuesRepository;
import com.codefolio.backend.user.pages.aboutpage.values.ValuesType;
import com.codefolio.backend.util.Response;
import com.codefolio.backend.util.StatusType;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.security.Principal;
import java.util.Optional;

import static com.codefolio.backend.user.UserService.getAuthenticatedUser;

@Service
@AllArgsConstructor
public class ValueSectionService {

    private final ValueSectionRepository valueSectionRepository;
    private final ValuesRepository valuesRepository;

    public ResponseEntity<Response> updateHeaderOne(Principal principal, String headerOne) {
        try {
            Users user = getAuthenticatedUser(principal);
            Optional<ValueSection> optionalValueData = valueSectionRepository.findByUsers(user);
            if (optionalValueData.isPresent()) {
                ValueSection valueData = optionalValueData.get();
                valueData.setHeaderOne(headerOne);
                valueSectionRepository.save(valueData);
                return ResponseEntity.ok(new Response(StatusType.OK, "Header one updated successfully", valueData.getHeaderOne()));
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new Response(StatusType.NOT_FOUND, "No value section data found", null));
            }
        } catch (Exception e) {
            e.printStackTrace();
            System.err.print(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new Response(StatusType.ERROR, "Internal server error", null));
        }
    }

    public ResponseEntity<Response> updateDescriptionOne(Principal principal, String descriptionOne) {
        try{
            Users user = getAuthenticatedUser(principal);
            Optional<ValueSection> optionalValueData = valueSectionRepository.findByUsers(user);
            if (optionalValueData.isPresent()) {
                ValueSection valueData = optionalValueData.get();
                valueData.setDescriptionOne(descriptionOne);
                valueSectionRepository.save(valueData);
                return ResponseEntity.ok(new Response(StatusType.OK, "Description one updated successfully", valueData.getDescriptionOne()));
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new Response(StatusType.NOT_FOUND, "No value section data found", null));
            }
        } catch (Exception e) {
            e.printStackTrace();
            System.err.print(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new Response(StatusType.ERROR, "Internal server error", null));
        }
    }

    public ResponseEntity<Response> updateValue(Principal principal, UpdateValueRequestModel updateValueRequestModel) {
        try {
            Users user = getAuthenticatedUser(principal);
            ValuesType afterValue;
            ValuesType beforeValue;
            try {
                afterValue = ValuesType.valueOf(updateValueRequestModel.after());
                beforeValue = ValuesType.valueOf(updateValueRequestModel.before());
            } catch (IllegalArgumentException e) {
                return ResponseEntity.badRequest().body(new Response(StatusType.NOT_FOUND, "Value not found", null));
            }
            Optional<Values> value = valuesRepository.findByUsersAndValue(user, beforeValue);
            if (value.isEmpty()){
                return ResponseEntity.badRequest().body(new Response(StatusType.NOT_FOUND, "Service not found", null));
            }
            value.get().setValue(afterValue);
            valuesRepository.save(value.get());
            return ResponseEntity.ok(new Response(StatusType.OK, "Value updated successfully", value.get().getValue()));
        } catch (Exception e) {
            e.printStackTrace();
            System.err.print(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new Response(StatusType.ERROR, "Internal server error", null));
        }
    }

    public ResponseEntity<Response> removeValue(Principal principal, String valueString) {
        try {
            Users user = getAuthenticatedUser(principal);
            ValuesType valueType;
            try {
                valueType = ValuesType.valueOf(valueString);
            } catch (IllegalArgumentException e) {
                return ResponseEntity.badRequest().body(new Response(StatusType.NOT_FOUND, "Value not found", null));
            }
            Optional<Values> value = valuesRepository.findByUsersAndValue(user, valueType);
            if (value.isEmpty()){
                return ResponseEntity.badRequest().body(new Response(StatusType.NOT_FOUND, "Value not found", null));
            }
            valuesRepository.delete(value.get());
            return ResponseEntity.ok(new Response(StatusType.OK, "Value removed successfully", value.get().getValue()));
        } catch (Exception e) {
            e.printStackTrace();
            System.err.print(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new Response(StatusType.ERROR, "Internal server error", null));
        }
    }

    public ResponseEntity<Response> addValue(Principal principal, String valueString) {

        try {
            Users user = getAuthenticatedUser(principal);
            ValuesType valueType;
            try {
                valueType = ValuesType.valueOf(valueString);
            } catch (IllegalArgumentException e) {
                return ResponseEntity.badRequest().body(new Response(StatusType.NOT_FOUND, "Value not found", null));
            }
            Optional<Values> service = valuesRepository.findByUsersAndValue(user, valueType);
            if (service.isPresent()){
                return ResponseEntity.badRequest().body(new Response(StatusType.NOT_FOUND, "Value already present", null));
            }
            Values values = new Values(user, valueType);
            valuesRepository.save(values);
            return ResponseEntity.ok(new Response(StatusType.OK, "Value added successfully", values.getValue()));
        } catch (Exception e) {
            e.printStackTrace();
            System.err.print(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new Response(StatusType.ERROR, "Internal server error", null));
        }

    }
}
