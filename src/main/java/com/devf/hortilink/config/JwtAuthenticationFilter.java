package com.devf.hortilink.config; // Ou o pacote de segurança

import com.devf.hortilink.service.impl.AuthService;
import com.devf.hortilink.util.JwtUtil;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.NonNull;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component // 1. MUITO IMPORTANTE: Torna o filtro um Bean do Spring
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    @Autowired
    private JwtUtil jwtUtil; // O seu utilitário que lê tokens

    @Autowired
    private AuthService authService; // O seu serviço que busca usuários

    @Override
    protected void doFilterInternal(
        @NonNull HttpServletRequest request,
        @NonNull HttpServletResponse response,
        @NonNull FilterChain filterChain
    ) throws ServletException, IOException {

        // 1. Pega o cabeçalho "Authorization"
        final String authHeader = request.getHeader("Authorization");

        // 2. Se não houver token ou não for "Bearer", continua sem autenticar
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            filterChain.doFilter(request, response);
            return;
        }

        // 3. Extrai o token (remove o "Bearer ")
        final String jwt = authHeader.substring(7);

        // 4. Extrai o username (email) do token
        final String username = jwtUtil.extractUsername(jwt);

        // 5. Se temos um username E o usuário ainda não foi autenticado nesta requisição
        if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            
            // 6. Busca o usuário no banco de dados (usando seu AuthService)
            UserDetails userDetails = this.authService.loadUserByUsername(username);

            // 7. Se o token for válido...
            if (jwtUtil.validateToken(jwt, userDetails.getUsername())) {
                
                // 8. Cria a autenticação para o Spring
                UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                    userDetails,
                    null, // Senha (não necessária, estamos usando token)
                    userDetails.getAuthorities()
                );
                
                authToken.setDetails(
                    new WebAuthenticationDetailsSource().buildDetails(request)
                );

                // 9. Coloca o usuário no Contexto de Segurança do Spring
                SecurityContextHolder.getContext().setAuthentication(authToken);
            }
        }
        
        // 10. Passa a requisição para o próximo filtro
        filterChain.doFilter(request, response);
    }
}