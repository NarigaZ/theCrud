package br.com.mkdata.teste.controller.dto;

import br.com.mkdata.teste.modelo.Cliente;
import br.com.mkdata.teste.modelo.Telefone;
import br.com.mkdata.teste.modelo.TipoPessoa;
import org.springframework.data.domain.Page;

import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.ManyToMany;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

public class ClienteDto {

    private final Long id;
    private final String nome;
    private final TipoPessoa tipoPessoa;
    private final String cpfCnpj;
    private final String rgIe;
    private final LocalDateTime dataCadastro;
    private final Boolean ativo;
    private final List<TelefoneDto> telefones = new ArrayList<>();

    public ClienteDto(Cliente cliente) {
        this.id = cliente.getId();
        this.nome = cliente.getNome();
        this.tipoPessoa = cliente.getTipoPessoa();
        this.cpfCnpj = cliente.getCpfCnpj();
        this.rgIe = cliente.getRgIe();
        this.dataCadastro = cliente.getDataCadastro();
        this.ativo = cliente.getAtivo();
        for (Telefone telefone : cliente.getTelefones()){
            this.telefones.add(new TelefoneDto(telefone));
        }
    }

    public Long getId() {
        return id;
    }

    public String getNome() {
        return nome;
    }

    public TipoPessoa getTipoPessoa() {
        return tipoPessoa;
    }

    public String getCpfCnpj() {
        return cpfCnpj;
    }

    public String getRgIe() {
        return rgIe;
    }

    public LocalDateTime getDataCadastro() {
        return dataCadastro;
    }

    public Boolean getAtivo() {
        return ativo;
    }

    public List<TelefoneDto> getTelefones() {
        return telefones;
    }

    public static Page<ClienteDto> converter(Page<Cliente> clientes) {
        return clientes.map(ClienteDto::new);
    }
}
