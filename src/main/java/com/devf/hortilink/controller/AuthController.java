package com.devf.hortilink.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.devf.hortilink.entity.Usuario;
import com.devf.hortilink.service.UsuarioService;
import com.devf.hortilink.util.JwtUtil;

@RestController
@RequestMapping("/auth")
public class AuthController {

	@Autowired
	private AuthenticationManager authenticationManager;
	@Autowired
    private JwtUtil jwtUtil;
	@Autowired
    private UsuarioService usuarioService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AuthRequest request) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(request.getEmail(), request.getSenha())
            );

            String token = jwtUtil.generateToken(request.getEmail());
            Usuario usuarioLogado = usuarioService.buscarPorEmail(request.getEmail());
            return ResponseEntity.ok(new AuthResponse(token, usuarioLogado));

        } catch (BadCredentialsException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Usuário ou senha inválidos");
        }
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody Usuario usuario) {
        usuarioService.salvar(usuario); // implemente para salvar com senha criptografada
        return ResponseEntity.ok("Usuário registrado com sucesso!");
    }
}

class AuthRequest {
    private String email;
    private String senha;
    public String getEmail(){return email;}
    public void setEmail(String email){this.email = email;}
    public String getSenha(){return senha;}
    public void setSenha(String senha){this.senha = senha;}
}

class AuthResponse {
    private String token;
    private Usuario usuario;
    public AuthResponse(String token, Usuario usuario){this.token = token;this.usuario = usuario;}
    public String getToken(){return token;}
    public Usuario getUsuario() {return usuario;}
}
