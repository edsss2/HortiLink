package com.devf.hortilink.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.UUID;

@Service
public class StorageService {

    // "./uploads"
    @Value("${storage.location}")
    private String storageLocation;

    /**
     * Salva o arquivo no servidor em uma pasta organizada.
     *
     * @param file O arquivo enviado
     * @param entityType O tipo de entidade (ex: "produto", "usuario")
     * @param entityId O ID da entidade (ex: 123)
     * @return O caminho relativo do arquivo (ex: "produto/123/uuid.jpg")
     * @throws IOException
     */
    public String salvarArquivo(MultipartFile file, String entityType, Long entityId) throws IOException {
        
        // 1. Gerar nome de arquivo único
        String originalFilename = file.getOriginalFilename();
        String extensao = "";
        if (originalFilename != null && originalFilename.contains(".")) {
            extensao = originalFilename.substring(originalFilename.lastIndexOf("."));
        }
        String nomeUnico = UUID.randomUUID().toString() + extensao;

        // 2. Criar o caminho RELATIVO (Este é o que vai para o banco)
        // Ex: "produto/123"
        Path caminhoRelativoDir = Paths.get(entityType, String.valueOf(entityId));
        
        // Ex: "produto/123/uuid.jpg"
        Path caminhoRelativoArquivo = caminhoRelativoDir.resolve(nomeUnico);

        // 3. Criar o caminho ABSOLUTO (Onde o arquivo vai no disco)
        // Ex: "./uploads/produto/123"
        Path localDeArmazenamentoAbsoluto = Paths.get(storageLocation)
                                                .resolve(caminhoRelativoDir)
                                                .toAbsolutePath();

        // 4. Garantir que os diretórios (pastas) existam
        if (!Files.exists(localDeArmazenamentoAbsoluto)) {
            Files.createDirectories(localDeArmazenamentoAbsoluto);
        }

        // 5. Salvar o arquivo no caminho absoluto
        Path caminhoDestinoAbsoluto = localDeArmazenamentoAbsoluto.resolve(nomeUnico);
        try (InputStream inputStream = file.getInputStream()) {
            Files.copy(inputStream, caminhoDestinoAbsoluto, StandardCopyOption.REPLACE_EXISTING);
        }

        // 6. Retornar o CAMINHO RELATIVO para salvar no banco
        // (O .toString() pode usar \ no Windows, trocamos por /)
        return caminhoRelativoArquivo.toString().replace("\\", "/");
    }
}