package br.com.mkdata.teste.repository;

import br.com.mkdata.teste.modelo.Cliente;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface ClienteRepository extends JpaRepository<Cliente, Long> {
    Page<Cliente> findByNome(String nome, Pageable paginacao);

    Page<Cliente> findByNomeIgnoreCaseContaining(String nome, Pageable paginacao);

    Page<Cliente> findByAtivoAndNomeIgnoreCaseContaining(Boolean ativo, String nome, Pageable paginacao);

    Page<Cliente> findByAtivo(Boolean ativo, Pageable paginacao);

    Cliente findByCpfCnpj(String cpfCnpj);

}
