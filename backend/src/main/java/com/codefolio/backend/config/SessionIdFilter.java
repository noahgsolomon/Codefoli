package com.codefolio.backend.config;

import com.codefolio.backend.user.UserSession;
import com.codefolio.backend.user.UserSessionRepository;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;
import org.springframework.web.util.WebUtils;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Optional;

public class SessionIdFilter extends OncePerRequestFilter {

    private final UserSessionRepository userSessionRepository;

    public SessionIdFilter(UserSessionRepository userSessionRepository) {
        this.userSessionRepository = userSessionRepository;
    }

    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) {
        return request.getServletPath().equals("/login") || request.getServletPath().equals("/register");
    }
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {

        Cookie sessionCookie = (WebUtils.getCookie(request, "SESSION_ID"));
        if (sessionCookie != null) {
            String cookie = sessionCookie.getValue();
            System.out.println(cookie);
            Optional<UserSession> userSessionOpt = userSessionRepository.findBySessionId(cookie);
            if (userSessionOpt.isPresent()) {
                UserSession userSession = userSessionOpt.get();
                Authentication authentication = new UsernamePasswordAuthenticationToken(userSession.getUsers(), null, new ArrayList<>());
                SecurityContextHolder.getContext().setAuthentication(authentication);
            } else {
                SecurityContextHolder.clearContext();
            }
        } else {
            SecurityContextHolder.clearContext();
        }

        filterChain.doFilter(request, response);
    }
}