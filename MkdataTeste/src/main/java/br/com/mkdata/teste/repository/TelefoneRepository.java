package br.com.mkdata.teste.repository;

import br.com.mkdata.teste.modelo.Cliente;
import br.com.mkdata.teste.modelo.Telefone;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TelefoneRepository extends JpaRepository<Telefone, Long> {
}
